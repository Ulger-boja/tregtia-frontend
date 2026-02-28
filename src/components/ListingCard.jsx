import { Link } from 'react-router-dom';
import { Heart, MapPin, Eye, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { formatPrice, timeAgo } from '../utils/formatters';
import useAuthStore from '../store/authStore';

export default function ListingCard({ listing }) {
  const { isAuthenticated, isFavorite, toggleFavorite } = useAuthStore();
  const [imgLoaded, setImgLoaded] = useState(false);
  const isFav = isFavorite(listing.id);

  const handleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) toggleFavorite(listing.id);
  };

  const catName = listing.category?.name_sq || '';
  const price = formatPrice(listing.price, listing.currency);

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group block"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <img
          src={listing.images?.[0]}
          alt={listing.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${imgLoaded ? '' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />

        {/* Category badge */}
        <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-lg text-gray-700">
          {catName}
        </span>

        {/* Favorite */}
        <button
          onClick={handleFav}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition"
        >
          <Heart size={16} className={isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>

        {/* Price */}
        {price && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
            <p className="text-white font-bold text-lg">{price}</p>
          </div>
        )}

        {/* Badges */}
        <div className="absolute bottom-2.5 right-2.5 flex gap-1.5">
          {listing.negotiable && (
            <span className="bg-accent-500/90 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
              I diskutueshëm
            </span>
          )}
          {listing.exchange && (
            <span className="bg-primary-600/90 text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <RefreshCw size={10} /> Shkëmbim
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-snug mb-1.5 group-hover:text-primary-700 transition-colors">
          {listing.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {listing.city}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {listing.views}
          </span>
        </div>
        <p className="text-[11px] text-gray-300 mt-1">{timeAgo(listing.createdAt)}</p>
      </div>
    </Link>
  );
}
