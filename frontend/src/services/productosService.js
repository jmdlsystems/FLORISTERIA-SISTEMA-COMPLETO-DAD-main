import api from './api';

export const productosService = {
  // Obtener todos los productos
  async getAll() {
    try {
      const response = await api.get('/productos');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al obtener productos' 
      };
    }
  },

  // Obtener producto por ID
  async getById(id) {
    try {
      const response = await api.get(`/productos/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al obtener producto' 
      };
    }
  },

  // Crear producto
  async create(productoData) {
    try {
      const response = await api.post('/productos', productoData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al crear producto' 
      };
    }
  },

  // Actualizar producto
  async update(id, productoData) {
    try {
      const response = await api.put(`/productos/${id}`, productoData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al actualizar producto' 
      };
    }
  },

  // Actualizar parcialmente producto
  async patch(id, productoData) {
    try {
      const response = await api.patch(`/productos/${id}`, productoData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al actualizar producto' 
      };
    }
  },

  // Eliminar producto
  async delete(id) {
    try {
      const response = await api.delete(`/productos/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al eliminar producto' 
      };
    }
  }
}; 