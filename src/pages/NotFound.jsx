import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-extrabold text-primary-600 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Faqja nuk u gjet</h1>
        <p className="text-gray-400 mb-6">Faqja që po kërkoni nuk ekziston ose është zhvendosur.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition">
          <Home size={18} /> Kthehu në kryefaqje
        </Link>
      </div>
    </div>
  );
}
