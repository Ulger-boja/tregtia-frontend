import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Eye, Heart, Share2, Phone, MessageSquare, ChevronLeft, ChevronRight, X, Flag, Calendar, RefreshCw, User, AlertTriangle, Trash2 } from 'lucide-react';
import { getListing, getListings, toggleFavoriteApi, reportListing, deleteListing } from '../api';
import { formatPrice, timeAgo, formatDate } from '../utils/formatters';
import ListingCard from '../components/ListingCard';
import Avatar from '../components/Avatar';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const REPORT_REASONS = [
  { value: 'spam', label_en: 'Spam or misleading', label_sq: 'Spam ose mashtruese' },
  { value: 'fake', label_en: 'Fake listing', label_sq: 'Njoftim i rremë' },
  { value: 'offensive', label_en: 'Offensive content', label_sq: 'Përmbajtje ofenduese' },
  { value: 'scam', label_en: 'Scam or fraud', label_sq: 'Mashtrim ose fiktiv' },
  { value: 'duplicate', label_en: 'Duplicate listing', label_sq: 'Njoftim i dyfishuar' },
  { value: 'other', label_en: 'Other', label_sq: 'Tjetër' },
];

function extractPhone(listing) {
  // Try attributes.phone first
  if (listing.attributes?.phone) return listing.attributes.phone;
  // Try user phone
  if (listing.user?.phone) return listing.user.phone;
  // Extract from description
  const match = listing.description?.match(/(?:📞\s*Kontakt:\s*)([\d+, ]+)/);
  if (match) return match[1].split(',')[0].trim();
  // Fallback: find any Albanian phone number in description
  const phoneMatch = listing.description?.match(/(\+355\d{8,9}|06[789]\d{7})/);
  return phoneMatch?.[1] || null;
}

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { isAuthenticated, user, isFavorite, toggleFavorite } = useAuthStore();
  const [listing, setListing] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [showPhone, setShowPhone] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  const isAdmin = user?.userType === 'ADMIN';

  useEffect(() => {
    setLoading(true);
    setShowPhone(false);
    getListing(id).then(l => {
      setListing(l);
      if (l.category?.slug) {
        getListings({ category: l.category.slug, limit: 4 }).then(d => {
          setSimilar(d.listings.filter(x => x.id !== id).slice(0, 4));
        }).catch(() => {});
      }
    }).catch(() => setListing(null)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary-200 border-t-primary-700 rounded-full animate-spin" /></div>;
  if (!listing) return <div className="text-center py-20 text-gray-400">{isEn ? 'Listing not found' : 'Njoftimi nuk u gjet'}</div>;

  const isFav = isFavorite(listing.id);
  const price = formatPrice(listing.price, listing.currency);
  const phone = extractPhone(listing);

  const handleFav = async () => {
    if (!isAuthenticated) return;
    toggleFavorite(listing.id);
    try { await toggleFavoriteApi(listing.id); } catch { toggleFavorite(listing.id); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(isEn ? 'Link copied!' : 'Linku u kopjua!');
  };

  const handleReport = async () => {
    if (!reportReason) return toast.error(isEn ? 'Select a reason' : 'Zgjidh një arsye');
    setSubmittingReport(true);
    try {
      await reportListing({ listingId: listing.id, reason: reportReason, details: reportDetails });
      toast.success(isEn ? 'Report submitted. Thank you!' : 'Raporti u dërgua. Faleminderit!');
      setShowReport(false);
      setReportReason('');
      setReportDetails('');
    } catch {
      toast.error(isEn ? 'Failed to submit report' : 'Dështoi dërgimi i raportit');
    } finally {
      setSubmittingReport(false);
    }
  };

  const handleAdminDelete = async () => {
    if (!confirm(isEn ? 'Delete this listing permanently?' : 'Fshi këtë njoftim përgjithmonë?')) return;
    try {
      await deleteListing(listing.id);
      toast.success(isEn ? 'Listing deleted' : 'Njoftimi u fshi');
      navigate('/listings');
    } catch {
      toast.error(isEn ? 'Failed to delete' : 'Dështoi fshirja');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-primary-600">{t('nav.home')}</Link><span>/</span>
          <Link to={`/listings/${listing.category?.slug}`} className="hover:text-primary-600">{isEn ? listing.category?.name_en : listing.category?.name_sq}</Link><span>/</span>
          <span className="text-gray-600 truncate max-w-[200px]">{listing.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="relative aspect-[16/10] bg-gray-100 cursor-pointer" onClick={() => listing.images?.length > 0 && setLightbox(0)}>
                {listing.images?.[0] ? <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300">No image</div>}
              </div>
              {listing.images?.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {listing.images.map((img, i) => (
                    <button key={i} onClick={() => setLightbox(i)} className="w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 border-transparent hover:border-primary-500 transition">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{listing.title}</h1>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={handleFav} className={`p-2 rounded-full ${isFav ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-red-500'}`}>
                    <Heart size={20} className={isFav ? 'fill-current' : ''} />
                  </button>
                  <button onClick={handleShare} className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-primary-600"><Share2 size={20} /></button>
                </div>
              </div>
              {price && <p className="text-2xl font-bold text-primary-700 mb-3">{price}</p>}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-5">
                <span className="flex items-center gap-1"><MapPin size={14} />{listing.city}</span>
                <span className="flex items-center gap-1"><Calendar size={14} />{formatDate(listing.createdAt)}</span>
                <span className="flex items-center gap-1"><Eye size={14} />{listing.views} {isEn ? 'views' : 'shikime'}</span>
              </div>
              <div className="flex gap-2 mb-5">
                {listing.negotiable && <span className="bg-accent-500/10 text-accent-600 text-xs font-medium px-3 py-1.5 rounded-lg">{isEn ? 'Negotiable' : 'I diskutueshëm'}</span>}
                {listing.exchange && <span className="bg-primary-50 text-primary-600 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1"><RefreshCw size={12} />{isEn ? 'Exchange' : 'Shkëmbim'}</span>}
              </div>
              <div className="border-t border-gray-100 pt-4">
                <h2 className="font-semibold text-gray-800 mb-2">{isEn ? 'Description' : 'Përshkrimi'}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{listing.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-4">
                <Avatar src={listing.user?.avatar} name={listing.user?.name} size="md" />
                <div>
                  <p className="font-semibold text-gray-900">{listing.user?.name}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1"><User size={11} />{isEn ? 'Member since' : 'Anëtar që nga'} {new Date(listing.user?.createdAt).getFullYear()}</p>
                </div>
              </div>

              {/* Phone button */}
              {phone ? (
                showPhone ? (
                  <a href={`tel:${phone}`} className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition mb-2">
                    <Phone size={18} />{phone}
                  </a>
                ) : (
                  <button onClick={() => setShowPhone(true)} className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition mb-2">
                    <Phone size={18} />{isEn ? 'Show Phone' : 'Shfaq numrin'}
                  </button>
                )
              ) : (
                <div className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-400 py-3 rounded-xl text-sm mb-2">
                  <Phone size={18} />{isEn ? 'No phone available' : 'Nuk ka numër'}
                </div>
              )}

              <button onClick={() => toast.success(isEn ? 'Coming soon!' : 'Së shpejti!')} className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition">
                <MessageSquare size={18} />{isEn ? 'Send Message' : 'Dërgo mesazh'}
              </button>
            </div>

            {/* Admin delete */}
            {isAdmin && (
              <button onClick={handleAdminDelete} className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition">
                <Trash2 size={18} />{isEn ? 'Delete Listing (Admin)' : 'Fshi Njoftimin (Admin)'}
              </button>
            )}

            {/* Report */}
            <button onClick={() => {
              if (!isAuthenticated) return toast.error(isEn ? 'Login to report' : 'Hyr për të raportuar');
              setShowReport(true);
            }} className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-red-500 py-2 transition">
              <Flag size={14} />{isEn ? 'Report this ad' : 'Raporto njoftimin'}
            </button>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5">{isEn ? 'Similar listings' : 'Njoftime të ngjashme'}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{similar.map(l => <ListingCard key={l.id} listing={l} />)}</div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white" onClick={() => setLightbox(null)}><X size={28} /></button>
          {listing.images.length > 1 && (
            <>
              <button className="absolute left-4 text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + listing.images.length) % listing.images.length); }}><ChevronLeft size={32} /></button>
              <button className="absolute right-4 text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % listing.images.length); }}><ChevronRight size={32} /></button>
            </>
          )}
          <img src={listing.images[lightbox]} alt="" className="max-w-[90vw] max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowReport(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-500" />
                <h3 className="text-lg font-bold text-gray-900">{isEn ? 'Report Listing' : 'Raporto Njoftimin'}</h3>
              </div>
              <button onClick={() => setShowReport(false)} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <p className="text-sm text-gray-500 mb-4">{isEn ? 'Why are you reporting this listing?' : 'Pse po e raportoni këtë njoftim?'}</p>

            <div className="space-y-2 mb-4">
              {REPORT_REASONS.map(r => (
                <label key={r.value} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition ${reportReason === r.value ? 'border-primary-500 bg-primary-50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="reason" value={r.value} checked={reportReason === r.value} onChange={() => setReportReason(r.value)} className="accent-primary-600" />
                  <span className="text-sm text-gray-700">{isEn ? r.label_en : r.label_sq}</span>
                </label>
              ))}
            </div>

            <textarea
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              placeholder={isEn ? 'Additional details (optional)' : 'Detaje shtesë (opsionale)'}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-400 resize-none h-20 mb-4"
            />

            <div className="flex gap-3">
              <button onClick={() => setShowReport(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                {isEn ? 'Cancel' : 'Anulo'}
              </button>
              <button onClick={handleReport} disabled={submittingReport} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50">
                {submittingReport ? '...' : (isEn ? 'Submit Report' : 'Dërgo Raportin')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
