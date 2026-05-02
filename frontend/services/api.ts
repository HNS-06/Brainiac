import axios from 'axios';
import { auth } from './firebase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add interceptor to inject Firebase ID Token into every request
 */
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const documentApi = {
  upload: (formData: FormData) => api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  list: () => api.get('/documents'),
  delete: (id: string) => api.delete(`/documents/${id}`),
};

export const ragApi = {
  // Legacy chat (non-streaming)
  chat: (message: string) => api.post('/rag/chat', { message }),
  // Search
  search: (query: string) => api.post('/rag/search', { query }),
};

export const agentApi = {
  getStatus: () => api.get('/agents/status'),
  runAgent: (agentType: string, query: string) => api.post('/agents/run', { agentType, query }),
};

export const insightApi = {
  getLatest: () => api.get('/insights'),
};

export default api;
