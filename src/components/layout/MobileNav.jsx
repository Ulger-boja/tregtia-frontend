import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Search, Plus, Heart, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const NAV_ITEMS = [
  { to: '/', icon: Home, key: 'home' },
  { to: '/listings', icon: Search, key: 'categories' },
  { to: '/post', icon: Plus, key: 'postAd', accent: true },
  { to: '/favorites', icon: Heart, key: 'favorites' },
  { to: '/dashboard', icon: User, key: 'dashboard' },
];

export default function MobileNav() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-bottom">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map(({ to, icon: Icon, key, accent }) => {
          const active = pathname === to;
          if (accent) {
            return (
              <Link key={key} to={to} className="flex flex-col items-center -mt-5">
                <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon size={22} className="text-white" />
                </div>
                <span className="text-[10px] mt-0.5 text-primary-600 font-medium">{t(`nav.${key}`)}</span>
              </Link>
            );
          }
          return (
            <Link key={key} to={to} className="flex flex-col items-center gap-0.5 py-1">
              <Icon size={20} className={active ? 'text-primary-600' : 'text-gray-400'} />
              <span className={`text-[10px] ${active ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>
                {t(`nav.${key}`)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
