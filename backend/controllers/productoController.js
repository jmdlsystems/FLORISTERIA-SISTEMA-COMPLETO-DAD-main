const { Producto, Categoria, Proveedor } = require('../models').sequelize.models;

exports.getAll = async (req, res) => {
  try {
    const items = await Producto.findAll({
      include: [
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
        { model: Proveedor, as: 'proveedor', attributes: ['id', 'nombre'] }
      ]
    });
    res.json(items);
  } catch (err) {
    console.error('Error obteniendo productos:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Producto.findByPk(req.params.id, {
      include: [
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
        { model: Proveedor, as: 'proveedor', attributes: ['id', 'nombre'] }
      ]
    });
    if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(item);
  } catch (err) {
    console.error('Error obteniendo producto:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { nombre, descripcion, precio, categoria_id, proveedor_id, imagen } = req.body;
  
  // Validaciones
  if (!nombre) {
    return res.status(400).json({ 
      error: 'El nombre del producto es requerido' 
    });
  }

  try {
    // Verificar que la categoría existe
    if (categoria_id) {
      const categoria = await Categoria.findByPk(categoria_id);
      if (!categoria) {
        return res.status(400).json({ error: 'La categoría especificada no existe' });
      }
    }

    // Verificar que el proveedor existe
    if (proveedor_id) {
      const proveedor = await Proveedor.findByPk(proveedor_id);
      if (!proveedor) {
        return res.status(400).json({ error: 'El proveedor especificado no existe' });
      }
    }

    const producto = await Producto.create({
      nombre,
      descripcion,
      precio,
      categoria_id,
      proveedor_id,
      imagen
    });
    
    // Obtener el producto con sus relaciones
    const productoCompleto = await Producto.findByPk(producto.id, {
      include: [
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
        { model: Proveedor, as: 'proveedor', attributes: ['id', 'nombre'] }
      ]
    });
    
    res.status(201).json(productoCompleto);
  } catch (err) {
    console.error('Error creando producto:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Producto.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
    
    const { nombre, descripcion, precio, categoria_id, proveedor_id, imagen } = req.body;
    
    // Verificar que la categoría existe si se está actualizando
    if (categoria_id) {
      const categoria = await Categoria.findByPk(categoria_id);
      if (!categoria) {
        return res.status(400).json({ error: 'La categoría especificada no existe' });
      }
    }

    // Verificar que el proveedor existe si se está actualizando
    if (proveedor_id) {
      const proveedor = await Proveedor.findByPk(proveedor_id);
      if (!proveedor) {
        return res.status(400).json({ error: 'El proveedor especificado no existe' });
      }
    }
    
    item.nombre = nombre;
    item.descripcion = descripcion;
    item.precio = precio;
    item.categoria_id = categoria_id;
    item.proveedor_id = proveedor_id;
    item.imagen = imagen;
    await item.save();
    
    // Obtener el producto actualizado con sus relaciones
    const productoActualizado = await Producto.findByPk(item.id, {
      include: [
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
        { model: Proveedor, as: 'proveedor', attributes: ['id', 'nombre'] }
      ]
    });
    
    res.json(productoActualizado);
  } catch (err) {
    console.error('Error actualizando producto:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.patch = async (req, res) => {
  try {
    const item = await Producto.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
    
    const updateData = { ...req.body };
    
    // Verificar que la categoría existe si se está actualizando
    if (updateData.categoria_id) {
      const categoria = await Categoria.findByPk(updateData.categoria_id);
      if (!categoria) {
        return res.status(400).json({ error: 'La categoría especificada no existe' });
      }
    }

    // Verificar que el proveedor existe si se está actualizando
    if (updateData.proveedor_id) {
      const proveedor = await Proveedor.findByPk(updateData.proveedor_id);
      if (!proveedor) {
        return res.status(400).json({ error: 'El proveedor especificado no existe' });
      }
    }
    
    item.nombre = updateData.nombre;
    item.descripcion = updateData.descripcion;
    item.precio = updateData.precio;
    item.categoria_id = updateData.categoria_id;
    item.proveedor_id = updateData.proveedor_id;
    item.imagen = updateData.imagen;
    await item.save();
    
    // Obtener el producto actualizado con sus relaciones
    const productoActualizado = await Producto.findByPk(item.id, {
      include: [
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
        { model: Proveedor, as: 'proveedor', attributes: ['id', 'nombre'] }
      ]
    });
    
    res.json(productoActualizado);
  } catch (err) {
    console.error('Error actualizando producto:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Producto.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
    await item.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error('Error eliminando producto:', err);
    res.status(500).json({ error: err.message });
  }
}; 