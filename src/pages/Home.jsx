import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Car, Home as HomeIcon, Smartphone, Sofa, Shirt, Briefcase, Wrench, PawPrint, Dumbbell, MoreHorizontal, ArrowRight, TrendingUp, MapPin } from 'lucide-react';
import { MOCK_LISTINGS, CATEGORIES, CITIES } from '../data/mockData';
import ListingCard from '../components/ListingCard';
import { useState } from 'react';

const CAT_ICONS = { vehicles: Car, properties: HomeIcon, electronics: Smartphone, furniture: Sofa, fashion: Shirt, jobs: Briefcase, services: Wrench, pets: PawPrint, sports: Dumbbell, other: MoreHorizontal };
const CAT_COLORS = { vehicles: 'bg-blue-50 text-blue-600', properties: 'bg-amber-50 text-amber-600', electronics: 'bg-violet-50 text-violet-600', furniture: 'bg-emerald-50 text-emerald-600', fashion: 'bg-pink-50 text-pink-600', jobs: 'bg-cyan-50 text-cyan-600', services: 'bg-orange-50 text-orange-600', pets: 'bg-lime-50 text-lime-600', sports: 'bg-rose-50 text-rose-600', other: 'bg-gray-100 text-gray-600' };

const POPULAR_SEARCHES = ['iPhone', 'Mercedes', 'Apartament Tiranë', 'PS5', 'Punë', 'Biçikletë'];

export default function Home() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const recent = MOCK_LISTINGS.slice(0, 8);
  const featured = MOCK_LISTINGS.filter(l => l.views > 200).slice(0, 4);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (city) params.set('city', city);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero with background image */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555861496-0666c8981751?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/85 via-primary-800/80 to-primary-900/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">
            {t('home.hero')}
          </h1>
          <p className="text-primary-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {t('home.heroSub')}
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={isEn ? 'What are you looking for?' : 'Çfarë po kërkoni?'}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-gray-900 bg-gray-50 text-sm focus:outline-none focus:bg-gray-100 transition"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full sm:w-44 pl-9 pr-3 py-3.5 rounded-xl text-sm text-gray-600 bg-gray-50 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">{isEn ? 'All Albania' : 'Gjithë Shqipërinë'}</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-primary-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-primary-700 transition text-sm shrink-0"
              >
                {isEn ? 'Search' : 'Kërko'}
              </button>
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-primary-200/60 text-xs">{isEn ? 'Popular:' : 'Popullore:'}</span>
              {POPULAR_SEARCHES.map(s => (
                <button
                  key={s}
                  onClick={() => { setSearch(s); navigate(`/listings?search=${s}`); }}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition backdrop-blur-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-around text-center">
          <div><p className="text-2xl font-bold text-primary-700">{MOCK_LISTINGS.length}+</p><p className="text-xs text-gray-400">{isEn ? 'Listings' : 'Njoftime'}</p></div>
          <div className="w-px h-8 bg-gray-200" />
          <div><p className="text-2xl font-bold text-primary-700">9</p><p className="text-xs text-gray-400">{isEn ? 'Cities' : 'Qytete'}</p></div>
          <div className="w-px h-8 bg-gray-200" />
          <div><p className="text-2xl font-bold text-primary-700">10</p><p className="text-xs text-gray-400">{isEn ? 'Categories' : 'Kategori'}</p></div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('nav.categories')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CATEGORIES.map(({ slug, name_sq, name_en }) => {
            const Icon = CAT_ICONS[slug] || MoreHorizontal;
            const color = CAT_COLORS[slug] || CAT_COLORS.other;
            const count = MOCK_LISTINGS.filter(l => l.category?.slug === slug).length;
            return (
              <Link key={slug} to={`/listings/${slug}`} className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">{isEn ? name_en : name_sq}</span>
                <span className="text-[11px] text-gray-400">{count} {isEn ? 'ads' : 'njoftime'}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trending */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={20} className="text-accent-500" />
            <h2 className="text-xl font-bold text-gray-900">{t('home.trending')}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>
      )}

      {/* Recent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">{t('home.recent')}</h2>
          <Link to="/listings" className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            {t('home.viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recent.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>
    </div>
  );
}
