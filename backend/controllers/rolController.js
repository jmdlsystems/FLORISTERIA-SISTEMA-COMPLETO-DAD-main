const { Rol } = require('../models').sequelize.models;

exports.getAll = async (req, res) => {
  try {
    const items = await Rol.findAll({
      attributes: ['id', 'nombre', 'descripcion', 'activo', 'createdAt', 'updatedAt']
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Rol.findByPk(req.params.id, {
      attributes: ['id', 'nombre', 'descripcion', 'activo', 'createdAt', 'updatedAt']
    });
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const existe = await Rol.findOne({ where: { nombre } });
    if (existe) {
      return res.status(400).json({ error: 'Ya existe un rol con ese nombre' });
    }
    const nuevo = await Rol.create({ nombre, descripcion });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Rol.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    const { nombre } = req.body;
    if (nombre && nombre !== item.nombre) {
      const existe = await Rol.findOne({ where: { nombre } });
      if (existe) {
        return res.status(400).json({ error: 'Ya existe un rol con ese nombre' });
      }
    }
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.patch = async (req, res) => {
  try {
    const item = await Rol.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    const { nombre } = req.body;
    if (nombre && nombre !== item.nombre) {
      const existe = await Rol.findOne({ where: { nombre } });
      if (existe) {
        return res.status(400).json({ error: 'Ya existe un rol con ese nombre' });
      }
    }
    await item.update(req.body, { fields: Object.keys(req.body) });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Rol.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    await item.destroy();
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 