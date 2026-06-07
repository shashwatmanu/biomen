// Centralized backend API url config
const API_URL = 
  typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5005/api'
    : (import.meta.env.VITE_API_URL || 'https://biolabsbackend.onrender.com/api');

export default API_URL;
