import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Package, Heart, MessageSquare, User, Plus, Trash2, Edit, Eye, Camera, LogOut } from 'lucide-react';
import { MOCK_LISTINGS, MOCK_MESSAGES } from '../data/mockData';
import useAuthStore from '../store/authStore';
import Avatar from '../components/Avatar';
import { formatPrice, timeAgo } from '../utils/formatters';
import ListingCard from '../components/ListingCard';
import toast from 'react-hot-toast';

const TABS = [
  { key: 'listings', icon: Package },
  { key: 'favorites', icon: Heart },
  { key: 'messages', icon: MessageSquare },
  { key: 'profile', icon: User },
];

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateUser, favorites } = useAuthStore();
  const [tab, setTab] = useState('listings');

  if (!isAuthenticated) { navigate('/login'); return null; }

  const tabLabels = { listings: isEn ? 'My Listings' : 'Njoftimet e mia', favorites: isEn ? 'Favorites' : 'Të preferuarat', messages: isEn ? 'Messages' : 'Mesazhet', profile: isEn ? 'Profile' : 'Profili' };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar src={user?.avatar} name={user?.name} size="md" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
          <Link to="/post" className="hidden sm:flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition">
            <Plus size={16} /> {isEn ? 'New Listing' : 'Njoftim i ri'}
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl border border-gray-100 p-1.5 mb-6 overflow-x-auto">
          {TABS.map(({ key, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${tab === key ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              <Icon size={16} /> {tabLabels[key]}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'listings' && <MyListingsTab isEn={isEn} />}
        {tab === 'favorites' && <FavoritesTab isEn={isEn} favorites={favorites} />}
        {tab === 'messages' && <MessagesTab isEn={isEn} />}
        {tab === 'profile' && <ProfileTab isEn={isEn} user={user} updateUser={updateUser} logout={logout} navigate={navigate} />}
      </div>
    </div>
  );
}

function MyListingsTab({ isEn }) {
  const myListings = MOCK_LISTINGS.slice(0, 5); // mock

  return (
    <div className="space-y-3">
      {myListings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Package size={40} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-400">{isEn ? 'No listings yet' : 'Nuk keni njoftime akoma'}</p>
          <Link to="/post" className="inline-flex items-center gap-1.5 mt-4 bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700">
            <Plus size={16} /> {isEn ? 'Post your first ad' : 'Posto njoftimin e parë'}
          </Link>
        </div>
      ) : (
        myListings.map(l => (
          <div key={l.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center">
            <img src={l.images?.[0]} alt="" className="w-20 h-20 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <Link to={`/listing/${l.id}`} className="font-medium text-gray-900 hover:text-primary-600 line-clamp-1">{l.title}</Link>
              <p className="text-sm text-primary-600 font-semibold mt-0.5">{formatPrice(l.price, l.currency)}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Eye size={12} />{l.views}</span>
                <span>{timeAgo(l.createdAt)}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-primary-600"><Edit size={16} /></button>
              <button onClick={() => toast.success(isEn ? 'Deleted' : 'U fshi')} className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function FavoritesTab({ isEn, favorites }) {
  const favListings = MOCK_LISTINGS.filter(l => favorites.includes(l.id));

  return favListings.length === 0 ? (
    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
      <Heart size={40} className="mx-auto text-gray-200 mb-3" />
      <p className="text-gray-400">{isEn ? 'No favorites yet' : 'Nuk keni të preferuara'}</p>
    </div>
  ) : (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {favListings.map(l => <ListingCard key={l.id} listing={l} />)}
    </div>
  );
}

function MessagesTab({ isEn }) {
  const [active, setActive] = useState(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden min-h-[400px]">
      {MOCK_MESSAGES.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare size={40} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-400">{isEn ? 'No messages' : 'Nuk keni mesazhe'}</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {MOCK_MESSAGES.map(m => (
            <div key={m.id} className="p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition">
              <img src={m.from.avatar} alt="" className="w-11 h-11 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-gray-900">{m.from.name}</p>
                  <span className="text-xs text-gray-400">{timeAgo(m.time)}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{m.lastMessage}</p>
                <p className="text-xs text-gray-300 mt-0.5">{m.listing.title}</p>
              </div>
              {m.unread > 0 && <span className="bg-primary-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{m.unread}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileTab({ isEn, user, updateUser, logout, navigate }) {
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const avatarRef = useRef(null);

  const handleSave = () => {
    updateUser(form);
    toast.success(isEn ? 'Profile updated' : 'Profili u përditësua');
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateUser({ avatar: url });
      toast.success(isEn ? 'Avatar updated' : 'Foto u ndryshua');
    }
  };

  return (
    <div className="max-w-lg">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar src={user?.avatar} name={user?.name} size="lg" />
            <button onClick={() => avatarRef.current?.click()} className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition">
              <Camera size={14} />
            </button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">{isEn ? 'Full Name' : 'Emri i plotë'}</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">{isEn ? 'Phone' : 'Telefoni'}</label>
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
        </div>
        <button onClick={handleSave} className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition">
          {isEn ? 'Save Changes' : 'Ruaj ndryshimet'}
        </button>
      </div>

      <button onClick={() => { logout(); navigate('/'); toast.success('Mirupafshim!'); }} className="flex items-center gap-2 mt-4 text-sm text-red-500 hover:text-red-600">
        <LogOut size={16} /> {isEn ? 'Logout' : 'Dil'}
      </button>
    </div>
  );
}
