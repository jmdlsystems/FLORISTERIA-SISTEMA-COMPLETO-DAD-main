const { Movimiento } = require('../models').sequelize.models;

exports.getAll = async (req, res) => {
  try {
    const items = await Movimiento.findAll({
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
    const item = await Movimiento.findByPk(req.params.id, {
      include: [
        { model: require('../models').sequelize.models.Producto, as: 'producto' },
        { model: require('../models').sequelize.models.Usuario, as: 'usuario' }
      ]
    });
    if (!item) return res.status(404).json({ success: false, error: 'Movimiento no encontrado' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    res.status(403).json({ 
      success: false, 
      error: 'No se puede crear movimientos directamente. Los movimientos se registran automáticamente a través de ajustes de inventario.' 
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    res.status(403).json({ 
      success: false, 
      error: 'No se puede editar movimientos directamente. Los movimientos son registros de auditoría que no deben modificarse.' 
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.patch = async (req, res) => {
  try {
    res.status(403).json({ 
      success: false, 
      error: 'No se puede editar movimientos directamente. Los movimientos son registros de auditoría que no deben modificarse.' 
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    res.status(403).json({ 
      success: false, 
      error: 'No se puede eliminar movimientos directamente. Los movimientos son registros de auditoría que no deben eliminarse.' 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Endpoint para obtener movimientos por producto
exports.getByProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;
    const items = await Movimiento.findAll({
      where: { producto_id },
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

// Endpoint para obtener movimientos por tipo
exports.getByTipo = async (req, res) => {
  try {
    const { tipo } = req.params;
    const items = await Movimiento.findAll({
      where: { tipo },
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