import api from './api';

export const ubicacionesService = {
  async getAll() {
    try {
      const res = await api.get('/ubicaciones');
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener ubicaciones' };
    }
  },
  async getById(id) {
    try {
      const res = await api.get(`/ubicaciones/${id}`);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener la ubicación' };
    }
  },
  async create(data) {
    try {
      const res = await api.post('/ubicaciones', data);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al crear la ubicación' };
    }
  },
  async update(id, data) {
    try {
      const res = await api.put(`/ubicaciones/${id}`, data);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al actualizar la ubicación' };
    }
  },
  async delete(id) {
    try {
      await api.delete(`/ubicaciones/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al eliminar la ubicación' };
    }
  }
}; 