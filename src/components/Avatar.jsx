export default function Avatar({ src, name, size = 'md', className = '' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-16 h-16 text-lg' };
  const sizeClass = sizes[size] || sizes.md;
  const initials = (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  if (src) {
    return <img src={src} alt={name || ''} className={`${sizeClass} rounded-full object-cover ${className}`} />;
  }

  return (
    <div className={`${sizeClass} rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center ${className}`}>
      {initials}
    </div>
  );
}
