import api from './api';

export const ordenCompraService = {
  // Obtener todas las órdenes de compra
  async getAll() {
    try {
      const res = await api.get('/ordenes_compra');
      return { success: true, data: res.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener órdenes de compra' };
    }
  },

  // Obtener una orden de compra por ID
  async getById(id) {
    try {
      const res = await api.get(`/ordenes_compra/${id}`);
      return res.data.data || res.data;
    } catch (error) {
      return {};
    }
  },

  // Crear una nueva orden de compra
  async create(ordenData) {
    try {
      const res = await api.post('/ordenes_compra', ordenData);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al crear la orden de compra' };
    }
  },

  // Actualizar una orden de compra
  async update(id, ordenData) {
    try {
      const res = await api.put(`/ordenes_compra/${id}`, ordenData);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al actualizar la orden de compra' };
    }
  },

  // Eliminar una orden de compra
  async delete(id) {
    try {
      const res = await api.delete(`/ordenes_compra/${id}`);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al eliminar la orden de compra' };
    }
  },

  // Obtener órdenes por proveedor
  getByProveedor: async (proveedorId) => {
    try {
      const response = await api.get(`/ordenes_compra/proveedor/${proveedorId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener órdenes por estado
  getByEstado: async (estado) => {
    try {
      const response = await api.get(`/ordenes_compra/estado/${estado}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener órdenes por fecha
  getByFecha: async (fechaInicio, fechaFin) => {
    try {
      const response = await api.get(`/ordenes_compra/fecha`, {
        params: { fechaInicio, fechaFin }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cambiar estado de la orden
  cambiarEstado: async (id, nuevoEstado) => {
    try {
      const response = await api.patch(`/ordenes_compra/${id}/estado`, { estado: nuevoEstado });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Aprobar orden de compra
  aprobar: async (id) => {
    try {
      const response = await api.patch(`/ordenes_compra/${id}/aprobar`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Rechazar orden de compra
  rechazar: async (id, motivo) => {
    try {
      const response = await api.patch(`/ordenes_compra/${id}/rechazar`, { motivo });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default ordenCompraService; 