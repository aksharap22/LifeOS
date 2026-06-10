import axios from 'axios';

// Ensure the URL is explicitly loaded from env
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';
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
