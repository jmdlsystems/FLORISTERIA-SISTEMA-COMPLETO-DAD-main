import api from './api';

export const inventarioService = {
  // Obtener todos los registros de inventario
  async getAll() {
    try {
      const res = await api.get('/inventarios');
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener inventario' };
    }
  },

  // Obtener un registro de inventario por ID
  async getById(id) {
    try {
      const res = await api.get(`/inventarios/${id}`);
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener el inventario' };
    }
  },

  // Obtener inventario por producto
  async getByProducto(producto_id) {
    try {
      const res = await api.get(`/inventarios/producto/${producto_id}`);
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener inventario del producto' };
    }
  },

  // Crear un nuevo registro de inventario (Entidad principal)
  async create(data) {
    try {
      const res = await api.post('/inventarios', data);
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al crear el inventario' };
    }
  },

  // Actualizar un registro de inventario (Entidad principal)
  async update(id, data) {
    try {
      const res = await api.put(`/inventarios/${id}`, data);
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al actualizar el inventario' };
    }
  },

  // Eliminar un registro de inventario (Entidad principal)
  async delete(id) {
    try {
      await api.delete(`/inventarios/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al eliminar el inventario' };
    }
  }
}; 