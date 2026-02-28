export function formatPrice(price, currency = 'ALL') {
  if (!price && price !== 0) return null;
  if (currency === 'EUR') return `€${Number(price).toLocaleString('de-DE')}`;
  return `${Number(price).toLocaleString('de-DE')} Lekë`;
}

export function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return 'tani';
  if (diff < 3600) return `${Math.floor(diff / 60)} min më parë`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} orë më parë`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ditë më parë`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)} javë më parë`;
  return date.toLocaleDateString('sq-AL');
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('sq-AL', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}
