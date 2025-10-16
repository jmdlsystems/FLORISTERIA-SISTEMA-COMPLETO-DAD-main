import api from './api';

const AJUSTE_INVENTARIO_URL = '/ajustes_inventario';

export const ajusteInventarioService = {
  // Obtener todos los ajustes de inventario (Solo lectura)
  async getAll() {
    try {
      const res = await api.get(AJUSTE_INVENTARIO_URL);
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener ajustes de inventario' };
    }
  },

  // Obtener un ajuste de inventario por ID (Solo lectura)
  async getById(id) {
    try {
      const res = await api.get(`${AJUSTE_INVENTARIO_URL}/${id}`);
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener el ajuste de inventario' };
    }
  },

  // Obtener historial de movimientos por producto (Solo lectura)
  async getHistorialMovimientos(producto_id) {
    try {
      const res = await api.get(`${AJUSTE_INVENTARIO_URL}/historial-movimientos/${producto_id}`);
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener historial de movimientos' };
    }
  },

  // Obtener estado del inventario (Solo lectura)
  async getEstadoInventario(producto_id = null) {
    try {
      const params = producto_id ? { producto_id } : {};
      const res = await api.get(`${AJUSTE_INVENTARIO_URL}/estado-inventario`, { params });
      return res.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al obtener estado del inventario' };
    }
  },

  // NOTA: Los métodos create, update y delete están deshabilitados
  // Los ajustes de inventario se registran automáticamente cuando se modifica el inventario
  // para mantener la integridad de la auditoría en tiempo real
  
  async create(ajusteData) {
    return { 
      success: false, 
      error: 'Los ajustes de inventario no se pueden crear directamente. Se registran automáticamente.' 
    };
  },

  async update(id, ajusteData) {
    return { 
      success: false, 
      error: 'Los ajustes de inventario no se pueden modificar directamente. Son registros de auditoría.' 
    };
  },

  async delete(id) {
    return { 
      success: false, 
      error: 'Los ajustes de inventario no se pueden eliminar directamente. Son registros de auditoría.' 
    };
  }
};

export default ajusteInventarioService; 