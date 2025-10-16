const { Categoria, Producto } = require('../models').sequelize.models;

exports.getAll = async (req, res) => {
  try {
    const items = await Categoria.findAll({
      include: [
        { model: Producto, as: 'productos', attributes: ['id', 'nombre'] }
      ]
    });
    res.json(items);
  } catch (err) {
    console.error('Error obteniendo categorías:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id, {
      include: [
        { model: Producto, as: 'productos', attributes: ['id', 'nombre', 'descripcion'] }
      ]
    });
    if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(item);
  } catch (err) {
    console.error('Error obteniendo categoría:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { nombre, descripcion, imagen } = req.body;
  
  // Validaciones
  if (!nombre) {
    return res.status(400).json({ 
      error: 'El nombre de la categoría es requerido' 
    });
  }

  try {

    const existe = await Categoria.findOne({ where: { nombre } });
    if (existe) {
      return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
    }

    const nuevo = await Categoria.create({
      nombre,
      descripcion,
      imagen
    });
    
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error creando categoría:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
    const { nombre, descripcion, imagen } = req.body;    
    if (nombre && nombre !== item.nombre) {
      const existe = await Categoria.findOne({ where: { nombre } });
      if (existe) {
        return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
      }
    }
    
    item.nombre = nombre;
    item.descripcion = descripcion;
    item.imagen = imagen;
    await item.save();
    
    res.json(item);
  } catch (err) {
    console.error('Error actualizando categoría:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.patch = async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
    const updateData = { ...req.body };
    if (updateData.nombre && updateData.nombre !== item.nombre) {
      const existe = await Categoria.findOne({ where: { nombre: updateData.nombre } });
      if (existe) {
        return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
      }
    }
    
    item.nombre = updateData.nombre;
    item.descripcion = updateData.descripcion;
    item.imagen = updateData.imagen;
    await item.save();
    
    res.json(item);
  } catch (err) {
    console.error('Error actualizando categoría:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
    const productosAsociados = await Producto.count({ where: { categoria_id: req.params.id } });
    if (productosAsociados > 0) {
      return res.status(400).json({ 
        error: 'No se puede eliminar la categoría',
        message: `Hay ${productosAsociados} producto(s) asociado(s) a esta categoría`
      });
    }
    
    await item.destroy();
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (err) {
    console.error('Error eliminando categoría:', err);
    res.status(500).json({ error: err.message });
  }
}; 