import api from './api';

export const categoriasService = {
  async getAll() {
    try {
      const res = await api.get('/categorias');
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener categorías' };
    }
  },
  async getById(id) {
    try {
      const res = await api.get(`/categorias/${id}`);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener la categoría' };
    }
  },
  async create(data) {
    try {
      const res = await api.post('/categorias', data);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al crear la categoría' };
    }
  },
  async update(id, data) {
    try {
      const res = await api.put(`/categorias/${id}`, data);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al actualizar la categoría' };
    }
  },
  async delete(id) {
    try {
      await api.delete(`/categorias/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al eliminar la categoría' };
    }
  }
}; 