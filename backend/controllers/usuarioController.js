const { Usuario , Rol } = require('../models').sequelize.models;

exports.getAll = async (req, res) => {
  try {
    const items = await Usuario.findAll({
      attributes: { exclude: ['contraseña'] },
      include: [
        { model: Rol, as: 'rol', attributes: ['id', 'nombre', 'activo'] }
      ]
    });
    res.json(items);
  } catch (err) {
    console.error('Error obteniendo usuarios:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['contraseña'] },
      include: [
        { model: Rol, as: 'rol', attributes: ['id', 'nombre', 'activo'] }
      ]
    });
    if (!item) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(item);
  } catch (err) {
    console.error('Error obteniendo usuario:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { correo, contraseña, nombre, rol_id, activo } = req.body;
  
  if (!correo || !contraseña || !nombre) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos: correo, contraseña, nombre' 
    });
  }

  try {
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Verificar que el rol esté activo
    if (rol_id) {
      const rol = await Rol.findByPk(rol_id);
      if (!rol) {
        return res.status(400).json({ error: 'El rol especificado no existe' });
      }
      if (!rol.activo) {
        return res.status(400).json({ error: 'No se puede asignar un rol inactivo a un usuario' });
      }
    }

    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash(contraseña, 12);
    
    const nuevo = await Usuario.create({
      correo,
      contraseña: hash,
      nombre,
      rol_id: rol_id || 1,
      activo: activo !== undefined ? Boolean(activo) : true
    });
    
    const { contraseña: _, ...usuarioSinPassword } = nuevo.toJSON();
    res.status(201).json(usuarioSinPassword);
  } catch (err) {
    console.error('Error creando usuario:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Usuario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    const { correo, contraseña, nombre, rol_id, activo } = req.body;
    const updateData = { 
      nombre, 
      rol_id, 
      activo: activo !== undefined ? Boolean(activo) : true 
    };
    
    if (correo && correo !== item.correo) {
      const existe = await Usuario.findOne({ where: { correo } });
      if (existe) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }
      updateData.correo = correo;
    }
    
    // Verificar que el rol esté activo (solo si se está cambiando el rol)
    if (rol_id && rol_id !== item.rol_id) {
      const rol = await Rol.findByPk(rol_id);
      if (!rol) {
        return res.status(400).json({ error: 'El rol especificado no existe' });
      }
      if (!rol.activo) {
        return res.status(400).json({ error: 'No se puede asignar un rol inactivo a un usuario' });
      }
    }
    
    if (contraseña) {
      const bcrypt = require('bcryptjs');
      updateData.contraseña = await bcrypt.hash(contraseña, 12);
    }
    
    await item.update(updateData);
    
    // Recargar el usuario para verificar que se guardó correctamente
    await item.reload();
    
    const { contraseña: _, ...usuarioSinPassword } = item.toJSON();
    res.json(usuarioSinPassword);
  } catch (err) {
    console.error('Error actualizando usuario:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.patch = async (req, res) => {
  try {
    const item = await Usuario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    const updateData = { ...req.body };
    
    if (updateData.correo && updateData.correo !== item.correo) {
      const existe = await Usuario.findOne({ where: { correo: updateData.correo } });
      if (existe) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }
    }
    
    // Verificar que el rol esté activo (solo si se está cambiando el rol)
    if (updateData.rol_id && updateData.rol_id !== item.rol_id) {
      const rol = await Rol.findByPk(updateData.rol_id);
      if (!rol) {
        return res.status(400).json({ error: 'El rol especificado no existe' });
      }
      if (!rol.activo) {
        return res.status(400).json({ error: 'No se puede asignar un rol inactivo a un usuario' });
      }
    }
    
    if (updateData.contraseña) {
      const bcrypt = require('bcryptjs');
      updateData.contraseña = await bcrypt.hash(updateData.contraseña, 12);
    }
    
    await item.update(updateData, { fields: Object.keys(updateData) });
    
    const { contraseña: _, ...usuarioSinPassword } = item.toJSON();
    res.json(usuarioSinPassword);
  } catch (err) {
    console.error('Error actualizando usuario:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Usuario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Usuario no encontrado' });
    await item.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error('Error eliminando usuario:', err);
    res.status(500).json({ error: err.message });
  }
}; 