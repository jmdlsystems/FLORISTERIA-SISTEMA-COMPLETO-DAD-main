import api from './api';

export const movimientosService = {
  // Obtener todos los movimientos (Solo lectura)
  async getAll() {
    try {
      const res = await api.get('/movimientos');
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener movimientos' };
    }
  },

  // Obtener un movimiento por ID (Solo lectura)
  async getById(id) {
    try {
      const res = await api.get(`/movimientos/${id}`);
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener el movimiento' };
    }
  },

  // Obtener movimientos por producto (Solo lectura)
  async getByProducto(producto_id) {
    try {
      const res = await api.get(`/movimientos/producto/${producto_id}`);
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener movimientos del producto' };
    }
  },

  // Obtener movimientos por tipo (Solo lectura)
  async getByTipo(tipo) {
    try {
      const res = await api.get(`/movimientos/tipo/${tipo}`);
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener movimientos por tipo' };
    }
  },

  // NOTA: Los métodos create, update y delete están deshabilitados
  // Los movimientos se registran automáticamente a través de ajustes de inventario
  // para mantener la integridad de la auditoría en tiempo real
  
  async create(data) {
    return { 
      success: false, 
      error: 'Los movimientos no se pueden crear directamente. Se registran automáticamente.' 
    };
  },

  async update(id, data) {
    return { 
      success: false, 
      error: 'Los movimientos no se pueden modificar directamente. Son registros de auditoría.' 
    };
  },

  async delete(id) {
    return { 
      success: false, 
      error: 'Los movimientos no se pueden eliminar directamente. Son registros de auditoría.' 
    };
  }
}; 