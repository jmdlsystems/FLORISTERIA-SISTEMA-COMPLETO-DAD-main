import api from './api';

export const proveedoresService = {
  async getAll() {
    try {
      const res = await api.get('/proveedores');
      if (Array.isArray(res.data)) return res.data;
      if (Array.isArray(res.data.data)) return res.data.data;
      return [];
    } catch (error) {
      return [];
    }
  },
  async getById(id) {
    try {
      const res = await api.get(`/proveedores/${id}`);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener el proveedor' };
    }
  },
  async create(data) {
    try {
      const res = await api.post('/proveedores', data);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al crear el proveedor' };
    }
  },
  async update(id, data) {
    try {
      const res = await api.put(`/proveedores/${id}`, data);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al actualizar el proveedor' };
    }
  },
  async delete(id) {
    try {
      await api.delete(`/proveedores/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al eliminar el proveedor' };
    }
  }
}; 