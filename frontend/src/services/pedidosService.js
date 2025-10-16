import api from './api';

export const pedidosService = {
  // Obtener todos los pedidos
  async getAll() {
    try {
      const res = await api.get('/pedidos');
      return { success: true, data: res.data.data || res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener pedidos' };
    }
  },

  // Obtener un pedido por ID
  async getById(id) {
    try {
      const res = await api.get(`/pedidos/${id}`);
      return { success: true, data: res.data.data || res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener el pedido' };
    }
  },

  // Crear un nuevo pedido
  async create(pedidoData) {
    try {
      const res = await api.post('/pedidos', pedidoData);
      return { success: true, data: res.data.data || res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al crear el pedido' };
    }
  },

  // Actualizar un pedido
  async update(id, pedidoData) {
    try {
      const res = await api.put(`/pedidos/${id}`, pedidoData);
      return { success: true, data: res.data.data || res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al actualizar el pedido' };
    }
  },

  // Actualizar estado de un pedido
  async updateEstado(id, estado) {
    try {
      const res = await api.patch(`/pedidos/${id}/estado`, { estado });
      return { success: true, data: res.data.data || res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al actualizar el estado' };
    }
  },

  // Eliminar un pedido
  async delete(id) {
    try {
      await api.delete(`/pedidos/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al eliminar el pedido' };
    }
  },

  // Obtener pedidos por estado
  async getByEstado(estado) {
    try {
      const res = await api.get(`/pedidos/estado/${estado}`);
      return { success: true, data: res.data.data || res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener pedidos por estado' };
    }
  },

  // Obtener estadísticas de pedidos
  async getStats() {
    try {
      const res = await api.get('/pedidos/stats');
      return { success: true, data: res.data.data || res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener estadísticas' };
    }
  }
}; 