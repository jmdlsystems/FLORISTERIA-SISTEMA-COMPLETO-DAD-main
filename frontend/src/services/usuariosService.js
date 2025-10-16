import api from './api';

export const usuariosService = {
  // Obtener todos los usuarios
  async getAll() {
    try {
      const response = await api.get('/usuarios');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al obtener usuarios' 
      };
    }
  },

  // Obtener usuario por ID
  async getById(id) {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al obtener usuario' 
      };
    }
  },

  // Crear usuario
  async create(userData) {
    try {
      const response = await api.post('/usuarios', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al crear usuario' 
      };
    }
  },

  // Actualizar usuario
  async update(id, userData) {
    try {
      const response = await api.put(`/usuarios/${id}`, userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al actualizar usuario' 
      };
    }
  },

  // Actualizar parcialmente usuario
  async patch(id, userData) {
    try {
      const response = await api.patch(`/usuarios/${id}`, userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al actualizar usuario' 
      };
    }
  },

  // Eliminar usuario
  async delete(id) {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al eliminar usuario' 
      };
    }
  }
}; 