import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="hidden md:block bg-white border-t border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="font-bold text-gray-900">Tregtia</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/about" className="hover:text-primary-600">{t('footer.about')}</Link>
            <Link to="/contact" className="hover:text-primary-600">{t('footer.contact')}</Link>
            <Link to="/terms" className="hover:text-primary-600">{t('footer.terms')}</Link>
            <Link to="/privacy" className="hover:text-primary-600">{t('footer.privacy')}</Link>
          </div>
          <p className="text-xs text-gray-400">© 2026 Tregtia</p>
        </div>
      </div>
    </footer>
  );
}
