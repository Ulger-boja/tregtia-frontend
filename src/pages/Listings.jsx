import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { getListings, getCategories } from '../api';
import { CITIES } from '../data/mockData';
import ListingCard from '../components/ListingCard';

const SORT_OPTIONS = ['newest', 'cheapest', 'expensive'];

export default function Listings() {
  const { category: catSlug } = useParams();
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [sort, setSort] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [listings, setListings] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    if (categories.length > 0 && catSlug) {
      setActiveCat(categories.find(c => c.slug === catSlug) || null);
    } else {
      setActiveCat(null);
    }
  }, [catSlug, categories]);

  useEffect(() => {
    setLoading(true);
    const params = { sort, limit: 40 };
    if (catSlug) params.category = catSlug;
    if (city) params.city = city;
    if (search) params.search = search;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    getListings(params).then(data => {
      setListings(data.listings);
      setTotal(data.pagination?.total || 0);
    }).catch(() => {
      setListings([]);
      setTotal(0);
    }).finally(() => setLoading(false));
  }, [catSlug, city, sort, minPrice, maxPrice]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      const params = { sort, limit: 40 };
      if (catSlug) params.category = catSlug;
      if (city) params.city = city;
      if (search) params.search = search;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      getListings(params).then(data => {
        setListings(data.listings);
        setTotal(data.pagination?.total || 0);
      }).catch(() => {}).finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const activeFilters = [city, minPrice, maxPrice].filter(Boolean).length;
  const pageTitle = activeCat ? (isEn ? activeCat.name_en : activeCat.name_sq) : (isEn ? 'All Listings' : 'Të gjitha njoftimet');

  const FilterContent = () => (
    <div className="space-y-5">
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
      {activeFilters > 0 && (
        <button onClick={() => { setCity(''); setMinPrice(''); setMaxPrice(''); }} className="text-sm text-red-500 hover:text-red-600">
          {isEn ? 'Clear filters' : 'Pastro filtrat'}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 sticky top-14 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('nav.search')} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
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
          <p className="text-sm text-gray-400">{total} {t('common.results')}</p>
        </div>
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-36">
              <h3 className="font-semibold text-gray-800 mb-4">{t('common.filters')}</h3>
              <FilterContent />
            </div>
          </aside>
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
                    <div className="p-3 space-y-2"><div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" /><div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" /></div>
                  </div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">{t('common.noResults')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {listings.map(l => <ListingCard key={l.id} listing={l} />)}
              </div>
            )}
          </div>
        </div>
      </div>

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
