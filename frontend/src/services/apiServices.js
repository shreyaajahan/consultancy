import api from './api';

// Auth Services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getAdmin: () => {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  }
};

// Service Services
export const serviceService = {
  getAll: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  getAllAdmin: async () => {
    const response = await api.get('/services/admin/all');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/services', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/services/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  }
};

// Project Services
export const projectService = {
  getAll: async (status, page = 1, limit = 6) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    const query = params.toString();
    const response = await api.get(`/projects${query ? `?${query}` : ''}`);
    return response.data;
  },

  getAllAdmin: async (page = 1, limit = 6) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    const query = params.toString();
    const response = await api.get(`/projects/admin/all${query ? `?${query}` : ''}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  }
};

// Enquiry Services
export const enquiryService = {
  getAll: async (status) => {
    const params = status ? `?status=${status}` : '';
    const response = await api.get(`/enquiries${params}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/enquiries/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/enquiries', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/enquiries/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/enquiries/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/enquiries/stats');
    return response.data;
  }
};
