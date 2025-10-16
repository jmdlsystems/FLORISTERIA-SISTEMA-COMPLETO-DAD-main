const { Inventario, Movimiento, Producto, Ubicacion, Usuario } = require('../models').sequelize.models;
const { Op } = require('sequelize');

class AuditoriaService {
  /**
   * Procesa un ajuste de inventario y actualiza automáticamente el inventario y registra el movimiento
   * @param {Object} ajusteData - Datos del ajuste de inventario
   * @param {number} ajusteData.producto_id - ID del producto
   * @param {number} ajusteData.cantidad_ajustada - Cantidad ajustada (positiva o negativa)
   * @param {string} ajusteData.motivo - Motivo del ajuste
   * @param {number} ajusteData.usuario_id - ID del usuario que hace el ajuste
   * @param {Date} ajusteData.fecha - Fecha del ajuste
   * @returns {Object} - Resultado de la operación
   */
  static async procesarAjusteInventario(ajusteData) {
    const transaction = await Inventario.sequelize.transaction();
    
    try {
      const { producto_id, cantidad_ajustada, motivo, usuario_id, fecha } = ajusteData;
      
      // 1. Buscar o crear el registro de inventario para el producto
      let inventario = await Inventario.findOne({
        where: { producto_id },
        include: [
          { model: Producto, as: 'producto' },
          { model: Ubicacion, as: 'ubicacion' }
        ],
        transaction
      });

      if (!inventario) {
        // Si no existe inventario para este producto, crear uno con cantidad 0
        inventario = await Inventario.create({
          producto_id,
          cantidad_actual: 0,
          ubicacion_id: 1 // Ubicación por defecto
        }, { transaction });
      }

      // 2. Calcular la nueva cantidad
      const cantidadAnterior = inventario.cantidad_actual;
      const nuevaCantidad = cantidadAnterior + cantidad_ajustada;
      
      // 3. Validar que la cantidad no sea negativa
      if (nuevaCantidad < 0) {
        await transaction.rollback();
        return {
          success: false,
          error: `No se puede realizar el ajuste. La cantidad resultante sería negativa (${nuevaCantidad})`
        };
      }

      // 4. Actualizar el inventario
      await inventario.update({
        cantidad_actual: nuevaCantidad
      }, { transaction });

      // 5. Registrar el movimiento
      const tipoMovimiento = cantidad_ajustada > 0 ? 'Incremento' : 'Decremento';
      await Movimiento.create({
        tipo: tipoMovimiento,
        producto_id,
        cantidad: Math.abs(cantidad_ajustada),
        fecha: fecha || new Date(),
        usuario_id,
        descripcion: `Ajuste de inventario: ${motivo || 'Sin motivo especificado'}`
      }, { transaction });

      await transaction.commit();

      return {
        success: true,
        data: {
          inventario: {
            id: inventario.id,
            producto_id: inventario.producto_id,
            cantidad_anterior: cantidadAnterior,
            cantidad_nueva: nuevaCantidad,
            cantidad_ajustada: cantidad_ajustada
          },
          movimiento: {
            tipo: tipoMovimiento,
            cantidad: Math.abs(cantidad_ajustada),
            motivo: motivo
          }
        }
      };

    } catch (error) {
      await transaction.rollback();
      console.error('Error en procesarAjusteInventario:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Obtiene el historial de movimientos para un producto
   * @param {number} producto_id - ID del producto
   * @returns {Array} - Lista de movimientos
   */
  static async obtenerHistorialMovimientos(producto_id) {
    try {
      const movimientos = await Movimiento.findAll({
        where: { producto_id },
        include: [
          { model: Producto, as: 'producto' },
          { model: Usuario, as: 'usuario' }
        ],
        order: [['fecha', 'DESC']]
      });
      
      return {
        success: true,
        data: movimientos
      };
    } catch (error) {
      console.error('Error al obtener historial de movimientos:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Obtiene el estado actual del inventario con información detallada
   * @param {number} producto_id - ID del producto (opcional)
   * @returns {Object} - Estado del inventario
   */
  static async obtenerEstadoInventario(producto_id = null) {
    try {
      const whereClause = producto_id ? { producto_id } : {};
      
      const inventarios = await Inventario.findAll({
        where: whereClause,
        include: [
          { model: Producto, as: 'producto' },
          { model: Ubicacion, as: 'ubicacion' }
        ],
        order: [['producto_id', 'ASC']]
      });

      return {
        success: true,
        data: inventarios
      };
    } catch (error) {
      console.error('Error al obtener estado del inventario:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = AuditoriaService; 