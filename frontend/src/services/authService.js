import api from './api';

export const authService = {
  // Login
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, usuario } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(usuario));
      
      return { success: true, user: usuario };
    } catch (error) {
      const errorData = error.response?.data;
      return { 
        success: false, 
        error: errorData?.error || 'Error al iniciar sesión',
        code: errorData?.code || 'UNKNOWN_ERROR'
      };
    }
  },

  // Registro
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return { success: true, user: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al registrar usuario' 
      };
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtener usuario actual
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar si está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Obtener token
  getToken() {
    return localStorage.getItem('token');
  }
}; 