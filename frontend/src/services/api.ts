import axios from 'axios';

// Hardcoding the full URL to bypass Vercel proxying/routing conflicts
const baseURL = 'https://lifeos-q9bi.onrender.com/api/v1';
console.log('API URL:', baseURL);

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
