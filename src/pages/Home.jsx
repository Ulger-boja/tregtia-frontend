import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, Car, Home as HomeIcon, Smartphone, Sofa, Shirt, Briefcase, Wrench, PawPrint, Dumbbell, MoreHorizontal, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { key: 'vehicles', icon: Car, color: 'bg-blue-50 text-blue-600', slug: 'vehicles' },
  { key: 'properties', icon: HomeIcon, color: 'bg-amber-50 text-amber-600', slug: 'properties' },
  { key: 'electronics', icon: Smartphone, color: 'bg-violet-50 text-violet-600', slug: 'electronics' },
  { key: 'furniture', icon: Sofa, color: 'bg-emerald-50 text-emerald-600', slug: 'furniture' },
  { key: 'fashion', icon: Shirt, color: 'bg-pink-50 text-pink-600', slug: 'fashion' },
  { key: 'jobs', icon: Briefcase, color: 'bg-cyan-50 text-cyan-600', slug: 'jobs' },
  { key: 'services', icon: Wrench, color: 'bg-orange-50 text-orange-600', slug: 'services' },
  { key: 'pets', icon: PawPrint, color: 'bg-lime-50 text-lime-600', slug: 'pets' },
  { key: 'sports', icon: Dumbbell, color: 'bg-rose-50 text-rose-600', slug: 'sports' },
  { key: 'other', icon: MoreHorizontal, color: 'bg-gray-50 text-gray-600', slug: 'other' },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            {t('home.hero')}
          </h1>
          <p className="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {t('home.heroSub')}
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('nav.search')}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 bg-white shadow-xl text-base focus:outline-none focus:ring-4 focus:ring-primary-300/30"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('nav.categories')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map(({ key, icon: Icon, color, slug }) => (
            <Link
              key={key}
              to={`/listings/${slug}`}
              className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                {t(`categories.${key}`)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Listings placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('home.recent')}</h2>
          <Link to="/listings" className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            {t('home.viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="h-40 bg-gray-100 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                <div className="h-5 bg-gray-100 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
