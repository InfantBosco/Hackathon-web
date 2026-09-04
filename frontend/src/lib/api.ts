import axios from 'axios';

function getApiBaseUrl(): string {
  let url = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';
  url = url.trim().replace(/\/+$/, '');
  if (!url.endsWith('/api/v1')) {
    if (url.endsWith('/api')) {
      url = `${url}/v1`;
    } else {
      url = `${url}/api/v1`;
    }
  }
  return url;
}

export const API_BASE_URL = getApiBaseUrl();

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Bearer token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('hacknex_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Parse backend API errors accurately
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message: string | undefined;

    if (error.response?.data) {
      const data = error.response.data;
      if (typeof data.error === 'object' && data.error !== null && 'message' in data.error) {
        message = data.error.message;
      } else if (typeof data.message === 'string') {
        message = data.message;
      } else if (typeof data.error === 'string') {
        message = data.error;
      }
    }

    if (!message) {
      if (error.code === 'ECONNABORTED') {
        message = 'Request timed out. Please try again.';
      } else if (error.message === 'Network Error' || !error.response) {
        message = 'Unable to connect to the backend server. Please verify that the backend API is running on http://localhost:4000.';
      } else {
        message = error.message || 'An unexpected API error occurred';
      }
    }

    return Promise.reject(new Error(message));
  }
);
