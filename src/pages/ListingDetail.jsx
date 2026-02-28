import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Eye, Heart, Share2, Phone, MessageSquare, ChevronLeft, ChevronRight, X, Flag, Calendar, RefreshCw, User } from 'lucide-react';
import { getListing, getListings, toggleFavoriteApi } from '../api';
import { formatPrice, timeAgo, formatDate } from '../utils/formatters';
import ListingCard from '../components/ListingCard';
import Avatar from '../components/Avatar';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export default function ListingDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { isAuthenticated, isFavorite, toggleFavorite } = useAuthStore();
  const [listing, setListing] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    setLoading(true);
    getListing(id).then(l => {
      setListing(l);
      // Load similar
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

  const handleFav = async () => {
    if (!isAuthenticated) return;
    toggleFavorite(listing.id);
    try { await toggleFavoriteApi(listing.id); } catch { toggleFavorite(listing.id); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(isEn ? 'Link copied!' : 'Linku u kopjua!');
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
              {showPhone && listing.user?.phone ? (
                <a href={`tel:${listing.user.phone}`} className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition mb-2"><Phone size={18} />{listing.user.phone}</a>
              ) : (
                <button onClick={() => setShowPhone(true)} className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition mb-2"><Phone size={18} />{isEn ? 'Show Phone' : 'Shfaq numrin'}</button>
              )}
              <button onClick={() => toast.success(isEn ? 'Coming soon!' : 'Së shpejti!')} className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition"><MessageSquare size={18} />{isEn ? 'Send Message' : 'Dërgo mesazh'}</button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-red-500 py-2"><Flag size={14} />{isEn ? 'Report this ad' : 'Raporto njoftimin'}</button>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5">{isEn ? 'Similar listings' : 'Njoftime të ngjashme'}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{similar.map(l => <ListingCard key={l.id} listing={l} />)}</div>
          </div>
        )}
      </div>

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
    </div>
  );
}
