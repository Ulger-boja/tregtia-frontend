import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tregtia_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tregtia_token');
    }
    const enhanced = new Error(error.response?.data?.message || error.message || 'Something went wrong');
    enhanced.response = error.response;
    enhanced.status = error.response?.status;
    return Promise.reject(enhanced);
  }
);

// --- Auth ---
export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data.data;
};

export const register = async (data) => {
  const res = await api.post('/auth/register', data);
  return res.data.data;
};

export const getMe = async () => {
  const res = await api.get('/auth/me');
  const d = res.data?.data || res.data;
  return d.user || d;
};

// --- Listings ---
export const getListings = async (params = {}) => {
  const res = await api.get('/listings', { params });
  const d = res.data.data;
  return { listings: d.listings || [], pagination: d.pagination };
};

export const getListing = async (id) => {
  const res = await api.get(`/listings/${id}`);
  const d = res.data.data;
  return d.listing || d;
};

export const createListing = async (formData) => {
  const res = await api.post('/listings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.data?.listing || res.data.data;
};

export const deleteListing = async (id) => {
  await api.delete(`/listings/${id}`);
};

// --- Favorites ---
export const toggleFavorite = async (listingId) => {
  const res = await api.post(`/favorites/${listingId}`);
  return res.data.data;
};

export const getFavorites = async () => {
  const res = await api.get('/favorites');
  const d = res.data.data;
  return d.favorites || (Array.isArray(d) ? d : []);
};

// --- Categories ---
export const getCategories = async () => {
  const res = await api.get('/categories');
  return res.data.data?.categories || res.data.data || [];
};

export default api;
