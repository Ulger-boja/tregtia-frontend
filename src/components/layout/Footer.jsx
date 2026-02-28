import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Car, Home, Smartphone, Briefcase, Sofa, Shirt } from 'lucide-react';

export default function Footer() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <footer className="hidden md:block bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-white">Tregtia</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isEn
                ? 'The modern marketplace for everything in Albania. Buy, sell, and discover.'
                : 'Tregu modern për gjithçka në Shqipëri. Bli, shit dhe zbulo.'}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{isEn ? 'Categories' : 'Kategoritë'}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/listings/vehicles" className="hover:text-white transition flex items-center gap-1.5"><Car size={13} />{isEn ? 'Vehicles' : 'Automjete'}</Link></li>
              <li><Link to="/listings/properties" className="hover:text-white transition flex items-center gap-1.5"><Home size={13} />{isEn ? 'Properties' : 'Prona'}</Link></li>
              <li><Link to="/listings/electronics" className="hover:text-white transition flex items-center gap-1.5"><Smartphone size={13} />{isEn ? 'Electronics' : 'Elektronikë'}</Link></li>
              <li><Link to="/listings/jobs" className="hover:text-white transition flex items-center gap-1.5"><Briefcase size={13} />{isEn ? 'Jobs' : 'Punë'}</Link></li>
              <li><Link to="/listings/furniture" className="hover:text-white transition flex items-center gap-1.5"><Sofa size={13} />{isEn ? 'Furniture' : 'Mobilje'}</Link></li>
              <li><Link to="/listings/fashion" className="hover:text-white transition flex items-center gap-1.5"><Shirt size={13} />{isEn ? 'Fashion' : 'Modë'}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{isEn ? 'Company' : 'Kompania'}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition">{isEn ? 'About Us' : 'Rreth nesh'}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">{isEn ? 'Contact' : 'Kontakti'}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">{isEn ? 'Terms of Service' : 'Kushtet e përdorimit'}</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">{isEn ? 'Privacy Policy' : 'Politika e privatësisë'}</Link></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{isEn ? 'Cities' : 'Qytetet'}</h4>
            <ul className="space-y-2 text-sm">
              {['Tiranë', 'Durrës', 'Vlorë', 'Shkodër', 'Elbasan', 'Korçë'].map(c => (
                <li key={c}><Link to={`/listings?city=${c}`} className="hover:text-white transition">{c}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 Tregtia. {isEn ? 'All rights reserved.' : 'Të gjitha të drejtat e rezervuara.'}</p>
          <p className="text-xs text-gray-500">Made in Albania 🇦🇱</p>
        </div>
      </div>
    </footer>
  );
}
