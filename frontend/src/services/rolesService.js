import api from './api';

export const rolesService = {
  // Obtener todos los roles
  async getAll() {
    try {
      const response = await api.get('/roles');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al obtener roles' 
      };
    }
  },

  // Obtener rol por ID
  async getById(id) {
    try {
      const response = await api.get(`/roles/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al obtener rol' 
      };
    }
  },

  // Crear rol
  async create(rolData) {
    try {
      const response = await api.post('/roles', rolData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al crear rol' 
      };
    }
  },

  // Actualizar rol
  async update(id, rolData) {
    try {
      const response = await api.put(`/roles/${id}`, rolData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al actualizar rol' 
      };
    }
  },

  // Actualizar parcialmente rol
  async patch(id, rolData) {
    try {
      const response = await api.patch(`/roles/${id}`, rolData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al actualizar rol' 
      };
    }
  },

  // Eliminar rol
  async delete(id) {
    try {
      const response = await api.delete(`/roles/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al eliminar rol' 
      };
    }
  }
}; 