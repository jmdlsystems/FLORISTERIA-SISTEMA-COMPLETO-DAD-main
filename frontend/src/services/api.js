import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const errorData = error.response.data;
      
      // Si es un usuario inactivo, mostrar mensaje específico
      if (errorData?.code === 'USER_INACTIVE') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Tu cuenta ha sido desactivada. Has sido desconectado del sistema.');
        window.location.href = '/login';
        return Promise.reject(error);
      }
      
      // Para otros errores 401, limpiar datos y redirigir
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 