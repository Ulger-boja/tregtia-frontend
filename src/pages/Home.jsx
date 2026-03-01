import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Car, Home as HomeIcon, Smartphone, Sofa, Shirt, Briefcase, Wrench, PawPrint, Dumbbell, MoreHorizontal, ArrowRight, MapPin, Camera, MessageCircle, Handshake, Shield, Zap, Heart, ChevronRight } from 'lucide-react';
import { getListings, getCategories } from '../api';
import { CITIES } from '../data/mockData';
import ListingCard from '../components/ListingCard';

const CAT_ICONS = { vehicles: Car, properties: HomeIcon, electronics: Smartphone, furniture: Sofa, fashion: Shirt, jobs: Briefcase, services: Wrench, pets: PawPrint, sports: Dumbbell, other: MoreHorizontal };
const CAT_COLORS = { vehicles: 'bg-blue-50 text-blue-600', properties: 'bg-amber-50 text-amber-600', electronics: 'bg-violet-50 text-violet-600', furniture: 'bg-emerald-50 text-emerald-600', fashion: 'bg-pink-50 text-pink-600', jobs: 'bg-cyan-50 text-cyan-600', services: 'bg-orange-50 text-orange-600', pets: 'bg-lime-50 text-lime-600', sports: 'bg-rose-50 text-rose-600', other: 'bg-gray-100 text-gray-600' };

const POPULAR_SEARCHES = ['iPhone', 'Mercedes', 'Apartament', 'PS5', 'Punë', 'Biçikletë'];

// Top categories to show "Popular in X" sections
const FEATURED_CATS = ['vehicles', 'properties', 'electronics'];

export default function Home() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [categories, setCategories] = useState([]);
  const [recent, setRecent] = useState([]);
  const [totalListings, setTotalListings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [catListings, setCatListings] = useState({});

  useEffect(() => {
    Promise.all([
      getCategories().catch(() => []),
      getListings({ limit: 8, sort: 'newest' }).catch(() => ({ listings: [], pagination: { total: 0 } })),
    ]).then(([cats, data]) => {
      setCategories(cats);
      setRecent(data.listings);
      setTotalListings(data.pagination?.total || 0);
      setLoading(false);

      // Load featured category listings
      Promise.all(
        FEATURED_CATS.map(slug =>
          getListings({ category: slug, limit: 4, sort: 'newest' })
            .then(d => [slug, d.listings])
            .catch(() => [slug, []])
        )
      ).then(results => {
        const map = {};
        results.forEach(([slug, listings]) => { map[slug] = listings; });
        setCatListings(map);
      });
    });
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (city) params.set('city', city);
    navigate(`/listings?${params.toString()}`);
  };

  const howItWorks = [
    { icon: Camera, title: isEn ? 'Post Your Ad' : 'Posto Njoftimin', desc: isEn ? 'Take a photo, set your price, and publish in under 60 seconds.' : 'Bëj një foto, vendos çmimin dhe publiko brenda 60 sekondave.', color: 'bg-blue-100 text-blue-600' },
    { icon: MessageCircle, title: isEn ? 'Get Contacted' : 'Merr Mesazhe', desc: isEn ? 'Interested buyers reach out to you directly via phone or messages.' : 'Blerësit e interesuar të kontaktojnë direkt me telefon ose mesazh.', color: 'bg-emerald-100 text-emerald-600' },
    { icon: Handshake, title: isEn ? 'Make the Deal' : 'Mbyll Marrëveshjen', desc: isEn ? 'Meet up, agree on terms, and close the deal. Simple as that.' : 'Takoheni, bini dakord, dhe mbyllni marrëveshjen. Kaq thjeshtë.', color: 'bg-amber-100 text-amber-600' },
  ];

  const trustPoints = [
    { icon: Shield, text: isEn ? 'Verified Sellers' : 'Shitës të Verifikuar' },
    { icon: Zap, text: isEn ? 'Free to Post' : 'Falas për të Postuar' },
    { icon: Heart, text: isEn ? 'Save Favorites' : 'Ruaj Favoritët' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=1920&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/85 via-primary-800/80 to-primary-900/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">{t('home.hero')}</h1>
          <p className="text-primary-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">{t('home.heroSub')}</p>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={isEn ? 'What are you looking for?' : 'Çfarë po kërkoni?'}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-gray-900 bg-gray-50 text-sm focus:outline-none focus:bg-gray-100 transition"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
              </div>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full sm:w-44 pl-9 pr-3 py-3.5 rounded-xl text-sm text-gray-600 bg-gray-50 focus:outline-none appearance-none cursor-pointer">
                  <option value="">{isEn ? 'All Albania' : 'Gjithë Shqipërinë'}</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={handleSearch} className="bg-primary-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-primary-700 transition text-sm shrink-0">
                {isEn ? 'Search' : 'Kërko'}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-primary-200/60 text-xs">{isEn ? 'Popular:' : 'Popullore:'}</span>
              {POPULAR_SEARCHES.map(s => (
                <button key={s} onClick={() => navigate(`/listings?search=${s}`)} className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition backdrop-blur-sm">{s}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-around text-center">
          <div><p className="text-2xl font-bold text-primary-700">{totalListings}</p><p className="text-xs text-gray-400">{isEn ? 'Listings' : 'Njoftime'}</p></div>
          <div className="w-px h-8 bg-gray-200" />
          <div><p className="text-2xl font-bold text-primary-700">{CITIES.length}</p><p className="text-xs text-gray-400">{isEn ? 'Cities' : 'Qytete'}</p></div>
          <div className="w-px h-8 bg-gray-200" />
          <div><p className="text-2xl font-bold text-primary-700">{categories.length}</p><p className="text-xs text-gray-400">{isEn ? 'Categories' : 'Kategori'}</p></div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('nav.categories')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const Icon = CAT_ICONS[cat.slug] || MoreHorizontal;
            const color = CAT_COLORS[cat.slug] || CAT_COLORS.other;
            return (
              <Link key={cat.id} to={`/listings/${cat.slug}`} className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">{isEn ? cat.name_en : cat.name_sq}</span>
                <span className="text-[11px] text-gray-400">{cat._count?.listings || 0} {isEn ? 'ads' : 'njoftime'}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">{isEn ? 'How It Works' : 'Si Funksionon'}</h2>
            <p className="text-gray-500 text-sm mt-2">{isEn ? 'Selling and buying has never been easier' : 'Shitja dhe blerja nuk ka qenë kurrë më e lehtë'}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shadow-md">{i + 1}</div>
                <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mx-auto mt-2 mb-4`}>
                  <step.icon size={26} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular per Category */}
      {FEATURED_CATS.map(slug => {
        const cat = categories.find(c => c.slug === slug);
        const listings = catListings[slug] || [];
        if (!cat || listings.length === 0) return null;
        const Icon = CAT_ICONS[slug] || MoreHorizontal;
        const color = CAT_COLORS[slug] || CAT_COLORS.other;
        return (
          <section key={slug} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{isEn ? `Popular in ${cat.name_en}` : `Popullore në ${cat.name_sq}`}</h2>
                  <p className="text-xs text-gray-400">{cat._count?.listings || 0} {isEn ? 'ads' : 'njoftime'}</p>
                </div>
              </div>
              <Link to={`/listings/${slug}`} className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                {isEn ? 'View all' : 'Shiko të gjitha'} <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {listings.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          </section>
        );
      })}

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {isEn ? 'Got something to sell?' : 'Ke diçka për të shitur?'}
              </h2>
              <p className="text-primary-100/80 text-sm md:text-base max-w-lg">
                {isEn ? 'Post your ad for free and reach thousands of buyers across Albania. It takes less than 60 seconds.' : 'Posto njoftimin falas dhe arrij mijëra blerës në Shqipëri. Duhen më pak se 60 sekonda.'}
              </p>
            </div>
            <Link to="/post" className="shrink-0 bg-white text-primary-700 px-8 py-3.5 rounded-2xl font-semibold hover:bg-primary-50 transition shadow-lg text-sm md:text-base">
              {isEn ? 'Post Free Ad' : 'Posto Njoftim Falas'}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {trustPoints.map((tp, i) => (
            <div key={i} className="flex items-center gap-2.5 text-gray-600">
              <tp.icon size={20} className="text-primary-600" />
              <span className="text-sm font-medium">{tp.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">{t('home.recent')}</h2>
          <Link to="/listings" className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            {t('home.viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
                <div className="p-3 space-y-2"><div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" /><div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" /></div>
              </div>
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400">{isEn ? 'No listings yet. Be the first to post!' : 'Nuk ka njoftime akoma. Bëhu i pari që poston!'}</p>
            <Link to="/post" className="inline-block mt-4 bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition">
              {t('nav.postAd')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {recent.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </section>
    </div>
  );
}
