import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Upload, X, ChevronRight, ChevronLeft, Check, MapPin, Tag, Camera, FileText, Eye } from 'lucide-react';
import { CITIES } from '../data/mockData';
import { formatPrice } from '../utils/formatters';
import { getCategories, createListing } from '../api';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const STEPS = ['category', 'details', 'photos', 'location', 'review'];
const STEP_ICONS = [Tag, FileText, Camera, MapPin, Eye];

export default function PostListing() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const fileRef = useRef(null);

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    categoryId: '', subcategoryId: '', title: '', description: '', price: '', currency: 'ALL',
    negotiable: false, exchange: false, city: 'Tiranë', neighborhood: '', address: '', images: [],
  });

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const activeCat = categories.find(c => c.id === form.categoryId);

  const handleFiles = (files) => {
    const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
    const remaining = 10 - form.images.length;
    const toAdd = valid.slice(0, remaining).map(file => ({ file, url: URL.createObjectURL(file), name: file.name }));
    if (toAdd.length > 0) setForm(prev => ({ ...prev, images: [...prev.images, ...toAdd] }));
  };

  const removeImage = (i) => update('images', form.images.filter((_, idx) => idx !== i));

  const handleNext = () => {
    if (step === 0 && !form.categoryId) return toast.error(isEn ? 'Select a category' : 'Zgjidhni kategorinë');
    if (step === 1) {
      if (form.title.trim().length < 5) return toast.error(isEn ? 'Title too short' : 'Titulli shumë i shkurtër');
      if (form.description.trim().length < 10) return toast.error(isEn ? 'Description too short' : 'Përshkrimi shumë i shkurtër');
    }
    if (step === 2 && form.images.length === 0) return toast.error(isEn ? 'Add at least 1 photo' : 'Shtoni të paktën 1 foto');
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('categoryId', form.subcategoryId || form.categoryId);
      fd.append('city', form.city);
      if (form.price) fd.append('price', form.price);
      fd.append('currency', form.currency);
      fd.append('negotiable', form.negotiable);
      fd.append('exchange', form.exchange);
      if (form.neighborhood) fd.append('neighborhood', form.neighborhood);
      if (form.address) fd.append('address', form.address);
      form.images.forEach(img => { if (img.file) fd.append('images', img.file); });

      const listing = await createListing(fd);
      toast.success(isEn ? 'Listing published!' : 'Njoftimi u publikua!');
      navigate(`/listing/${listing.id}`);
    } catch (err) {
      toast.error(err.message || 'Error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-2xl mx-auto px-4">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {STEPS.map((s, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div key={s} className="flex items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition ${
                  i < step ? 'bg-primary-600 text-white' : i === step ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {i < step ? <Check size={16} /> : <Icon size={16} />}
                </div>
                {i < STEPS.length - 1 && <div className={`w-8 h-0.5 mx-1 ${i < step ? 'bg-primary-600' : 'bg-gray-200'}`} />}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          {/* Step 0: Category */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{isEn ? 'Select Category' : 'Zgjidhni Kategorinë'}</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => { update('categoryId', cat.id); update('subcategoryId', ''); }}
                    className={`p-4 rounded-xl border text-left transition ${form.categoryId === cat.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <p className="font-medium text-sm">{isEn ? cat.name_en : cat.name_sq}</p>
                    {cat.children?.length > 0 && <p className="text-xs text-gray-400 mt-0.5">{cat.children.length} {isEn ? 'subcategories' : 'nënkategori'}</p>}
                  </button>
                ))}
              </div>
              {activeCat?.children?.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">{isEn ? 'Subcategory (optional)' : 'Nënkategoria (opsionale)'}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeCat.children.map(sc => (
                      <button key={sc.id} onClick={() => update('subcategoryId', sc.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${form.subcategoryId === sc.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {isEn ? sc.name_en : sc.name_sq}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">{isEn ? 'Listing Details' : 'Detajet e njoftimit'}</h2>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">{isEn ? 'Title' : 'Titulli'} *</label>
                <input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} placeholder={isEn ? 'What are you selling?' : 'Çfarë po shitni?'} maxLength={200} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">{isEn ? 'Description' : 'Përshkrimi'} *</label>
                <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={5} placeholder={isEn ? 'Describe your item in detail...' : 'Përshkruani artikullin në detaje...'} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">{isEn ? 'Price' : 'Çmimi'}</label>
                  <input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">{isEn ? 'Currency' : 'Monedha'}</label>
                  <select value={form.currency} onChange={(e) => update('currency', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500">
                    <option value="ALL">Lekë (ALL)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.negotiable} onChange={(e) => update('negotiable', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="text-sm text-gray-600">{isEn ? 'Negotiable' : 'I diskutueshëm'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.exchange} onChange={(e) => update('exchange', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="text-sm text-gray-600">{isEn ? 'Exchange possible' : 'Mundësi shkëmbimi'}</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Photos */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{isEn ? 'Photos' : 'Fotot'}</h2>
              <p className="text-sm text-gray-400 mb-4">Max 10 {isEn ? 'photos' : 'foto'} · JPG, PNG, WebP</p>
              {form.images.length < 10 && (
                <div onClick={() => fileRef.current?.click()} onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }} onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition group">
                  <Upload size={28} className="mx-auto text-gray-300 group-hover:text-primary-500 mb-2" />
                  <p className="text-sm text-gray-500">{isEn ? 'Click or drag photos here' : 'Kliko ose tërhiq fotot këtu'}</p>
                  <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                </div>
              )}
              {form.images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-red-500">
                        <X size={12} />
                      </button>
                      {i === 0 && <span className="absolute bottom-1 left-1 bg-primary-600 text-white text-[9px] px-1.5 py-0.5 rounded">Cover</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">{isEn ? 'Location' : 'Vendndodhja'}</h2>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">{isEn ? 'City' : 'Qyteti'} *</label>
                <select value={form.city} onChange={(e) => update('city', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500">
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">{isEn ? 'Neighborhood' : 'Lagjja'}</label>
                <input type="text" value={form.neighborhood} onChange={(e) => update('neighborhood', e.target.value)} placeholder={isEn ? 'e.g. Blloku' : 'p.sh. Blloku'} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">{isEn ? 'Address' : 'Adresa'}</label>
                <input type="text" value={form.address} onChange={(e) => update('address', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500" />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{isEn ? 'Review & Publish' : 'Shqyrto & Publiko'}</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-400">{isEn ? 'Category' : 'Kategoria'}</span>
                  <span className="font-medium">{isEn ? activeCat?.name_en : activeCat?.name_sq}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-400">{isEn ? 'Title' : 'Titulli'}</span>
                  <span className="font-medium max-w-[200px] truncate">{form.title}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-400">{isEn ? 'Price' : 'Çmimi'}</span>
                  <span className="font-medium">{form.price ? formatPrice(Number(form.price), form.currency) : (isEn ? 'Not set' : 'Pa çmim')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-400">{isEn ? 'City' : 'Qyteti'}</span>
                  <span className="font-medium">{form.city}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-400">{isEn ? 'Photos' : 'Foto'}</span>
                  <span className="font-medium">{form.images.length}</span>
                </div>
                {form.images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {form.images.slice(0, 5).map((img, i) => (
                      <img key={i} src={img.url} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          <button onClick={() => setStep(s => Math.max(s - 1, 0))} disabled={step === 0} className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition">
            <ChevronLeft size={16} /> {isEn ? 'Back' : 'Mbrapa'}
          </button>
          {step < STEPS.length - 1 ? (
            <button onClick={handleNext} className="flex items-center gap-1 px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition">
              {isEn ? 'Next' : 'Vazhdo'} <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="flex items-center gap-1 px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition disabled:opacity-60">
              {submitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Check size={16} />{isEn ? 'Publish' : 'Publiko'}</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
