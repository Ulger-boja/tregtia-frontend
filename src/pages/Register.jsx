import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, UserPlus, User, Phone } from 'lucide-react';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', userType: 'INDIVIDUAL' });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm({ ...form, [k]: v });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error('Plotëso fushat e detyrueshme');
    if (form.password.length < 6) return toast.error('Fjalëkalimi duhet të ketë 6+ karaktere');
    setLoading(true);
    setTimeout(() => {
      const user = { id: 'new-user', name: form.name, email: form.email, phone: form.phone, userType: form.userType, avatar: `https://i.pravatar.cc/150?u=${form.email}`, createdAt: new Date().toISOString() };
      login(user, 'mock-jwt-token-tregtia');
      toast.success('Regjistrimi u krye me sukses!');
      navigate('/dashboard');
      setLoading(false);
    }, 800);
  };

  const inputCls = 'w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100';

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t('nav.register')}</h1>
          <p className="text-gray-400 mt-1">Krijo llogarinë e re</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Emri i plotë *</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Emri Mbiemri" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email *</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="email@shembull.com" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Fjalëkalimi *</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Min 6 karaktere" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Telefoni</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+355 69 ..." className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Lloji i llogarisë</label>
            <div className="flex gap-3">
              {['INDIVIDUAL', 'BUSINESS'].map(type => (
                <button key={type} type="button" onClick={() => update('userType', type)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${form.userType === type ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}>
                  {type === 'INDIVIDUAL' ? 'Individual' : 'Biznes'}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><UserPlus size={18} />{t('nav.register')}</>}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Ke llogari? <Link to="/login" className="text-primary-600 font-medium hover:underline">{t('nav.login')}</Link>
        </p>
      </div>
    </div>
  );
}
