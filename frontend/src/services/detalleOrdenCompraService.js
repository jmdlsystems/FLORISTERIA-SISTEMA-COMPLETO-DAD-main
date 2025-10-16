import api from './api';

export const detalleOrdenCompraService = {
  // Obtener todos los detalles de órdenes de compra
  getAll: async () => {
    try {
      const response = await api.get('/detalle-orden-compra');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un detalle de orden de compra por ID
  getById: async (id) => {
    try {
      const response = await api.get(`${'/detalle-orden-compra'}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo detalle de orden de compra
  create: async (detalleData) => {
    try {
      const response = await api.post('/detalle-orden-compra', detalleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un detalle de orden de compra
  update: async (id, detalleData) => {
    try {
      const response = await api.put(`${'/detalle-orden-compra'}/${id}`, detalleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un detalle de orden de compra
  delete: async (id) => {
    try {
      const response = await api.delete(`${'/detalle-orden-compra'}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener detalles por orden de compra
  getByOrdenCompra: async (ordenCompraId) => {
    try {
      const response = await api.get(`${'/detalle-orden-compra'}/orden/${ordenCompraId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener detalles por producto
  getByProducto: async (productoId) => {
    try {
      const response = await api.get(`${'/detalle-orden-compra'}/producto/${productoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear múltiples detalles para una orden
  createMultiple: async (detallesData) => {
    try {
      const response = await api.post(`${'/detalle-orden-compra'}/multiple`, detallesData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar cantidad recibida
  actualizarCantidadRecibida: async (id, cantidadRecibida) => {
    try {
      const response = await api.patch(`${'/detalle-orden-compra'}/${id}/cantidad-recibida`, {
        cantidadRecibida
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Marcar como recibido
  marcarRecibido: async (id) => {
    try {
      const response = await api.patch(`${'/detalle-orden-compra'}/${id}/recibido`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default detalleOrdenCompraService; 