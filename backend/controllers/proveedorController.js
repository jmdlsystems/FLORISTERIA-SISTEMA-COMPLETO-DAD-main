const { Proveedor, Producto, Orden_Compra } = require('../models').sequelize.models;

exports.getAll = async (req, res) => {
  try {
    const items = await Proveedor.findAll({
      include: [
        { model: Producto, as: 'productos', attributes: ['id', 'nombre'] },
        { model: Orden_Compra, as: 'ordenes_compras', attributes: ['id', 'fecha'] }
      ]
    });
    res.json(items);
  } catch (err) {
    console.error('Error obteniendo proveedores:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Proveedor.findByPk(req.params.id, {
      include: [
        { model: Producto, as: 'productos', attributes: ['id', 'nombre', 'descripcion'] },
        { model: Orden_Compra, as: 'ordenes_compras', attributes: ['id', 'fecha'] }
      ]
    });
    if (!item) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json(item);
  } catch (err) {
    console.error('Error obteniendo proveedor:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { nombre, contacto, direccion, telefono } = req.body;
  
  // Validaciones
  if (!nombre) {
    return res.status(400).json({ 
      error: 'El nombre del proveedor es requerido' 
    });
  }

  try {
    // Verificar que no existe un proveedor con el mismo nombre
    const existe = await Proveedor.findOne({ where: { nombre } });
    if (existe) {
      return res.status(400).json({ error: 'Ya existe un proveedor con ese nombre' });
    }

    const nuevo = await Proveedor.create({
      nombre,
      contacto,
      direccion,
      telefono
    });
    
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error creando proveedor:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Proveedor.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Proveedor no encontrado' });
    
    const { nombre, contacto, direccion, telefono } = req.body;
    
    // Verificar que no existe otro proveedor con el mismo nombre
    if (nombre && nombre !== item.nombre) {
      const existe = await Proveedor.findOne({ where: { nombre } });
      if (existe) {
        return res.status(400).json({ error: 'Ya existe un proveedor con ese nombre' });
      }
    }
    
    await item.update({
      nombre,
      contacto,
      direccion,
      telefono
    });
    
    res.json(item);
  } catch (err) {
    console.error('Error actualizando proveedor:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.patch = async (req, res) => {
  try {
    const item = await Proveedor.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Proveedor no encontrado' });
    
    const updateData = { ...req.body };
    
    // Verificar que no existe otro proveedor con el mismo nombre
    if (updateData.nombre && updateData.nombre !== item.nombre) {
      const existe = await Proveedor.findOne({ where: { nombre: updateData.nombre } });
      if (existe) {
        return res.status(400).json({ error: 'Ya existe un proveedor con ese nombre' });
      }
    }
    
    await item.update(updateData, { fields: Object.keys(updateData) });
    
    res.json(item);
  } catch (err) {
    console.error('Error actualizando proveedor:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Proveedor.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Proveedor no encontrado' });
    
    // Verificar si hay productos asociados a este proveedor
    const productosAsociados = await Producto.count({ where: { proveedor_id: req.params.id } });
    if (productosAsociados > 0) {
      return res.status(400).json({ 
        error: 'No se puede eliminar el proveedor',
        message: `Hay ${productosAsociados} producto(s) asociado(s) a este proveedor`
      });
    }
    
    // Verificar si hay órdenes de compra asociadas a este proveedor
    const ordenesAsociadas = await Orden_Compra.count({ where: { proveedor_id: req.params.id } });
    if (ordenesAsociadas > 0) {
      return res.status(400).json({ 
        error: 'No se puede eliminar el proveedor',
        message: `Hay ${ordenesAsociadas} orden(es) de compra asociada(s) a este proveedor`
      });
    }
    
    await item.destroy();
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (err) {
    console.error('Error eliminando proveedor:', err);
    res.status(500).json({ error: err.message });
  }
}; 