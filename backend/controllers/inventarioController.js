const { Inventario } = require('../models').sequelize.models;
const { Ajuste_Inventario } = require('../models').sequelize.models;
const { Movimiento } = require('../models').sequelize.models;

exports.getAll = async (req, res) => {
  try {
    const items = await Inventario.findAll({
      include: [
        { model: require('../models').sequelize.models.Producto, as: 'producto' },
        { model: require('../models').sequelize.models.Ubicacion, as: 'ubicacion' }
      ],
      order: [['producto_id', 'ASC']]
    });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Inventario.findByPk(req.params.id, {
      include: [
        { model: require('../models').sequelize.models.Producto, as: 'producto' },
        { model: require('../models').sequelize.models.Ubicacion, as: 'ubicacion' }
      ]
    });
    if (!item) return res.status(404).json({ success: false, error: 'Inventario no encontrado' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { producto_id, ubicacion_id, cantidad_actual, cantidad_minima } = req.body;
    if (!producto_id || !ubicacion_id || cantidad_actual == null || cantidad_minima == null) {
      return res.status(400).json({ success: false, error: 'Faltan campos requeridos.' });
    }
    // Verificar si ya existe inventario para ese producto y ubicación
    const existente = await Inventario.findOne({ where: { producto_id, ubicacion_id } });
    if (existente) {
      return res.status(400).json({ success: false, error: 'Ya existe inventario para ese producto y ubicación.' });
    }
    const nuevo = await Inventario.create({ producto_id, ubicacion_id, cantidad_actual, cantidad_minima });

    // Registrar ajuste de inventario y movimiento
    const usuario_id = req.user?.id || null;
    if (usuario_id) {
      await Ajuste_Inventario.create({
        producto_id,
        cantidad_ajustada: cantidad_actual,
        motivo: 'Creación directa de inventario',
        fecha: new Date(),
        usuario_id
      });
      await Movimiento.create({
        tipo: 'Incremento',
        producto_id,
        cantidad: cantidad_actual,
        fecha: new Date(),
        usuario_id,
        descripcion: 'Creación directa de inventario'
      });
    }

    res.status(201).json({ success: true, data: nuevo });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Inventario.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Inventario no encontrado.' });
    }
    const { cantidad_actual, cantidad_minima } = req.body;
    if (cantidad_actual == null && cantidad_minima == null) {
      return res.status(400).json({ success: false, error: 'No hay campos para actualizar.' });
    }
    let cantidad_ajustada = null;
    if (cantidad_actual != null) {
      cantidad_ajustada = cantidad_actual - item.cantidad_actual;
      item.cantidad_actual = cantidad_actual;
    }
    if (cantidad_minima != null) item.cantidad_minima = cantidad_minima;
    await item.save();

    // Registrar ajuste de inventario y movimiento solo si cambió la cantidad_actual
    const usuario_id = req.user?.id || null;
    if (usuario_id && cantidad_ajustada !== null && cantidad_ajustada !== 0) {
      await Ajuste_Inventario.create({
        producto_id: item.producto_id,
        cantidad_ajustada,
        motivo: 'Edición directa de inventario',
        fecha: new Date(),
        usuario_id
      });
      await Movimiento.create({
        tipo: cantidad_ajustada > 0 ? 'Incremento' : 'Decremento',
        producto_id: item.producto_id,
        cantidad: Math.abs(cantidad_ajustada),
        fecha: new Date(),
        usuario_id,
        descripcion: 'Edición directa de inventario'
      });
    }

    res.json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.patch = exports.update;

exports.delete = async (req, res) => {
  try {
    res.status(403).json({ 
      success: false, 
      error: 'No se puede eliminar inventario directamente. Use ajustes de inventario para modificar las cantidades.' 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Endpoint para obtener inventario por producto
exports.getByProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;
    const item = await Inventario.findOne({
      where: { producto_id },
      include: [
        { model: require('../models').sequelize.models.Producto, as: 'producto' },
        { model: require('../models').sequelize.models.Ubicacion, as: 'ubicacion' }
      ]
    });
    
    if (!item) {
      return res.json({ 
        success: true, 
        data: {
          producto_id: parseInt(producto_id),
          cantidad_actual: 0,
          producto: null,
          ubicacion: null
        }
      });
    }
    
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}; 