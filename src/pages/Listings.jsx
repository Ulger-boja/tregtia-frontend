import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react';
import { MOCK_LISTINGS, CATEGORIES, CITIES } from '../data/mockData';
import ListingCard from '../components/ListingCard';

const SORT_OPTIONS = ['newest', 'cheapest', 'expensive'];

export default function Listings() {
  const { category: catSlug } = useParams();
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [city, setCity] = useState('');
  const [sort, setSort] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [subcat, setSubcat] = useState('');

  const activeCat = CATEGORIES.find(c => c.slug === catSlug);

  const filtered = useMemo(() => {
    let items = [...MOCK_LISTINGS];
    if (catSlug) items = items.filter(l => l.category?.slug === catSlug);
    if (subcat) items = items.filter(l => l.subcategory === subcat);
    if (city) items = items.filter(l => l.city === city);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(l => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q));
    }
    if (minPrice) items = items.filter(l => l.price >= Number(minPrice));
    if (maxPrice) items = items.filter(l => l.price <= Number(maxPrice));
    if (sort === 'cheapest') items.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === 'expensive') items.sort((a, b) => (b.price || 0) - (a.price || 0));
    else items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return items;
  }, [catSlug, subcat, city, search, minPrice, maxPrice, sort]);

  const activeFilters = [city, subcat, minPrice, maxPrice].filter(Boolean).length;
  const pageTitle = activeCat ? (isEn ? activeCat.name_en : activeCat.name_sq) : (isEn ? 'All Listings' : 'Të gjitha njoftimet');

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Subcategory */}
      {activeCat?.children?.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">{isEn ? 'Subcategory' : 'Nënkategoria'}</label>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSubcat('')} className={`px-3 py-1.5 rounded-lg text-sm ${!subcat ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t('common.all')}
            </button>
            {activeCat.children.map(sc => (
              <button key={sc.slug} onClick={() => setSubcat(sc.slug)} className={`px-3 py-1.5 rounded-lg text-sm ${subcat === sc.slug ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {isEn ? sc.name_en : sc.name_sq}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* City */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">{isEn ? 'City' : 'Qyteti'}</label>
        <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500">
          <option value="">{t('common.all')}</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">{isEn ? 'Price Range' : 'Çmimi'}</label>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-1/2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
          <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-1/2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
        </div>
      </div>

      {/* Clear */}
      {activeFilters > 0 && (
        <button onClick={() => { setCity(''); setSubcat(''); setMinPrice(''); setMaxPrice(''); }} className="text-sm text-red-500 hover:text-red-600">
          {isEn ? 'Clear filters' : 'Pastro filtrat'}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('nav.search')}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500"
            />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600">
            <SlidersHorizontal size={16} />
            {activeFilters > 0 && <span className="bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">{activeFilters}</span>}
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none">
            {SORT_OPTIONS.map(s => <option key={s} value={s}>{t(`common.${s}`)}</option>)}
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-sm text-gray-400">{filtered.length} {t('common.results')}</p>
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-36">
              <h3 className="font-semibold text-gray-800 mb-4">{t('common.filters')}</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">{t('common.noResults')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(l => <ListingCard key={l.id} listing={l} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">{t('common.filters')}</h3>
              <button onClick={() => setShowFilters(false)}><X size={20} /></button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </div>
  );
}
