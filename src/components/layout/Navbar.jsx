import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Plus, User, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLang = () => {
    const next = i18n.language === 'sq' ? 'en' : 'sq';
    i18n.changeLanguage(next);
    localStorage.setItem('tregtia_lang', next);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Tregtia</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('nav.search')}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button onClick={toggleLang} className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition">
              {i18n.language === 'sq' ? '🇬🇧' : '🇦🇱'}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/post" className="hidden sm:flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition">
                  <Plus size={16} />
                  {t('nav.postAd')}
                </Link>
                <Link to="/dashboard" className="p-2 text-gray-500 hover:text-primary-600">
                  <User size={20} />
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="hidden sm:block bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition">
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
