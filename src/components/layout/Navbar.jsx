import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, User, Home, LayoutGrid } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const { pathname } = useLocation();

  const toggleLang = () => {
    const next = i18n.language === 'sq' ? 'en' : 'sq';
    i18n.changeLanguage(next);
    localStorage.setItem('tregtia_lang', next);
  };

  const navLink = (to, label, Icon) => {
    const active = pathname === to || (to === '/listings' && pathname.startsWith('/listings'));
    return (
      <Link to={to} className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition ${active ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
        <Icon size={16} /> {label}
      </Link>
    );
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo-handshake.jpg" alt="Tregtia" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Tregtia</span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navLink('/', i18n.language === 'en' ? 'Home' : 'Kryefaqja', Home)}
            {navLink('/listings', i18n.language === 'en' ? 'Catalog' : 'Katalogu', LayoutGrid)}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button onClick={toggleLang} className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition">
              {i18n.language === 'sq' ? '🇬🇧' : '🇦🇱'}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/post" className="hidden sm:flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition">
                  <Plus size={16} />
                  {t('nav.postAd')}
                </Link>
                <Link to="/dashboard" className="p-2 text-gray-500 hover:text-primary-600 transition">
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
