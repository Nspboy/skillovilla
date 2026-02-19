import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler for 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.patch(`/auth/reset-password/${token}`, { password }),
  changePassword: (data) => api.patch('/auth/change-password', data),
};

// Courses API
export const coursesAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  enroll: (id, data) => api.post(`/courses/${id}/enroll`, data),
  updateProgress: (id, data) => api.patch(`/courses/${id}/progress`, data),
};

// Mentors API
export const mentorsAPI = {
  getAll: (params) => api.get('/mentors', { params }),
  getById: (id) => api.get(`/mentors/${id}`),
  bookSession: (id, data) => api.post(`/mentors/${id}/book`, data),
};

// Placements API
export const placementsAPI = {
  getAll: (params) => api.get('/placements', { params }),
  getCompanies: () => api.get('/placements/companies'),
  getJobs: (params) => api.get('/placements/jobs', { params }),
  applyToJob: (id, data) => api.post(`/placements/jobs/${id}/apply`, data),
  getMyApplications: () => api.get('/placements/my-applications'),
};

// Blogs API
export const blogsAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  like: (id) => api.post(`/blogs/${id}/like`),
  comment: (id, text) => api.post(`/blogs/${id}/comment`, { text }),
};

// Sessions API
export const sessionsAPI = {
  getLiveClasses: (params) => api.get('/sessions/live', { params }),
  getLiveClassById: (id) => api.get(`/sessions/live/${id}`),
  attendLiveClass: (id) => api.post(`/sessions/live/${id}/attend`),
  getDashboard: () => api.get('/sessions/dashboard'),
};

export default api;
