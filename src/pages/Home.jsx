import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, Car, Home as HomeIcon, Smartphone, Sofa, Shirt, Briefcase, Wrench, PawPrint, Dumbbell, MoreHorizontal, ArrowRight, TrendingUp, Users, Package } from 'lucide-react';
import { MOCK_LISTINGS, CATEGORIES } from '../data/mockData';
import ListingCard from '../components/ListingCard';
import { useState } from 'react';

const CAT_ICONS = { vehicles: Car, properties: HomeIcon, electronics: Smartphone, furniture: Sofa, fashion: Shirt, jobs: Briefcase, services: Wrench, pets: PawPrint, sports: Dumbbell, other: MoreHorizontal };
const CAT_COLORS = { vehicles: 'bg-blue-50 text-blue-600', properties: 'bg-amber-50 text-amber-600', electronics: 'bg-violet-50 text-violet-600', furniture: 'bg-emerald-50 text-emerald-600', fashion: 'bg-pink-50 text-pink-600', jobs: 'bg-cyan-50 text-cyan-600', services: 'bg-orange-50 text-orange-600', pets: 'bg-lime-50 text-lime-600', sports: 'bg-rose-50 text-rose-600', other: 'bg-gray-100 text-gray-600' };

export default function Home() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [search, setSearch] = useState('');
  const recent = MOCK_LISTINGS.slice(0, 8);
  const featured = MOCK_LISTINGS.filter(l => l.views > 200).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{t('home.hero')}</h1>
          <p className="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">{t('home.heroSub')}</p>
          <div className="max-w-xl mx-auto relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('nav.search')}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 bg-white shadow-xl text-base focus:outline-none focus:ring-4 focus:ring-primary-300/30"
              onKeyDown={(e) => e.key === 'Enter' && search && (window.location.href = `/listings?search=${search}`)}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-around text-center">
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
