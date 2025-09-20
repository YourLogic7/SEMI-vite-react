import axios from 'axios';

// Buat instance axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/',
});

export default api;
