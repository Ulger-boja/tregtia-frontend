import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { getFavorites } from '../api';
import ListingCard from '../components/ListingCard';
import useAuthStore from '../store/authStore';

export default function Favorites() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { isAuthenticated } = useAuthStore();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { setLoading(false); return; }
    getFavorites()
      .then(setFavorites)
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Heart size={48} className="text-gray-200 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">{isEn ? 'Save your favorites' : 'Ruaj favoritët e tu'}</h2>
        <p className="text-gray-400 text-sm mb-6">{isEn ? 'Login to start saving listings you love' : 'Hyr për të ruajtur njoftimet që të pëlqejnë'}</p>
        <Link to="/login" className="bg-primary-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition">
          {isEn ? 'Login' : 'Hyr'}
        </Link>
      </div>
    );
  }

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary-200 border-t-primary-700 rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEn ? 'My Favorites' : 'Të preferuarat'}</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Heart size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">{isEn ? 'No favorites yet' : 'Nuk ke favorita akoma'}</p>
          <Link to="/listings" className="text-primary-600 text-sm font-medium hover:underline">{isEn ? 'Browse listings' : 'Shfleto njoftimet'}</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  );
}
