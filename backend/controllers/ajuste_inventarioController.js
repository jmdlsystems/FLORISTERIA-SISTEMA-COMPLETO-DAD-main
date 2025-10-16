const { Ajuste_Inventario } = require('../models').sequelize.models;
const AuditoriaService = require('../services/auditoriaService');

exports.getAll = async (req, res) => {
  try {
    const items = await Ajuste_Inventario.findAll({
      include: [
        { model: require('../models').sequelize.models.Producto, as: 'producto' },
        { model: require('../models').sequelize.models.Usuario, as: 'usuario' }
      ],
      order: [['fecha', 'DESC']]
    });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Ajuste_Inventario.findByPk(req.params.id, {
      include: [
        { model: require('../models').sequelize.models.Producto, as: 'producto' },
        { model: require('../models').sequelize.models.Usuario, as: 'usuario' }
      ]
    });
    if (!item) return res.status(404).json({ success: false, error: 'Ajuste de inventario no encontrado' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    // Validar datos requeridos
    const { producto_id, cantidad_ajustada, usuario_id } = req.body;
    if (!producto_id || cantidad_ajustada === undefined || !usuario_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'producto_id, cantidad_ajustada y usuario_id son requeridos' 
      });
    }

    // Procesar el ajuste usando el servicio de auditoría
    const resultado = await AuditoriaService.procesarAjusteInventario(req.body);
    
    if (!resultado.success) {
      return res.status(400).json({ success: false, error: resultado.error });
    }

    // Crear el registro de ajuste de inventario
    const nuevoAjuste = await Ajuste_Inventario.create(req.body);
    
    res.status(201).json({ 
      success: true, 
      data: nuevoAjuste,
      auditoria: resultado.data
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Ajuste_Inventario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Ajuste de inventario no encontrado' });
    
    // No permitir edición de ajustes ya procesados para mantener la integridad
    res.status(400).json({ 
      success: false, 
      error: 'No se pueden editar ajustes de inventario ya procesados. Cree un nuevo ajuste para corregir.' 
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.patch = async (req, res) => {
  try {
    const item = await Ajuste_Inventario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Ajuste de inventario no encontrado' });
    
    // No permitir edición de ajustes ya procesados
    res.status(400).json({ 
      success: false, 
      error: 'No se pueden editar ajustes de inventario ya procesados. Cree un nuevo ajuste para corregir.' 
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Ajuste_Inventario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Ajuste de inventario no encontrado' });
    
    // No permitir eliminación de ajustes ya procesados
    res.status(400).json({ 
      success: false, 
      error: 'No se pueden eliminar ajustes de inventario ya procesados para mantener la integridad de la auditoría.' 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Nuevos endpoints para auditoría
exports.getHistorialMovimientos = async (req, res) => {
  try {
    const { producto_id } = req.params;
    const resultado = await AuditoriaService.obtenerHistorialMovimientos(producto_id);
    
    if (!resultado.success) {
      return res.status(400).json({ success: false, error: resultado.error });
    }
    
    res.json({ success: true, data: resultado.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getEstadoInventario = async (req, res) => {
  try {
    const { producto_id } = req.query;
    const resultado = await AuditoriaService.obtenerEstadoInventario(producto_id);
    
    if (!resultado.success) {
      return res.status(400).json({ success: false, error: resultado.error });
    }
    
    res.json({ success: true, data: resultado.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}; 