const { Usuario, Rol } = require('../models').sequelize.models;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = process.env.JWT_SECRET || 'secreto';

exports.register = async (req, res) => {
  const { correo, contraseña, nombre, rol_id } = req.body;
  
  // Validaciones
  if (!correo || !contraseña || !nombre) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos: correo, contraseña, nombre' 
    });
  }

  try {
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) return res.status(400).json({ error: 'El correo ya está registrado' });
    
    const hash = await bcrypt.hash(contraseña, 12);
    const nuevo = await Usuario.create({ 
      correo, 
      contraseña: hash, 
      nombre,
      rol_id: rol_id || 1 
    });
    

    const { contraseña: _, ...usuarioSinPassword } = nuevo.toJSON();
    res.status(201).json(usuarioSinPassword);
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;
  
  // Validaciones
  if (!correo || !contraseña) {
    return res.status(400).json({ 
      error: 'Correo y contraseña son requeridos' 
    });
  }

  try {
    const user = await Usuario.findOne({ 
      where: { correo },
      include: [
        { model: Rol, as: 'rol', attributes: ['id', 'nombre'] }
      ]
    });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Verificar si el usuario está activo
    if (user.activo === false) {
      return res.status(401).json({ 
        error: 'Tu cuenta está desactivada. Contacta al administrador para reactivar tu acceso.',
        code: 'USER_INACTIVE'
      });
    }
    
    const passwordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign({ 
      id: user.id, 
      correo: user.correo,
      nombre: user.nombre,
      rol_id: user.rol_id,
      rol_nombre: user.rol?.nombre
    }, SECRET, { expiresIn: '24h' });
    
    // No devolver la contraseña en la respuesta
    const { contraseña: _, ...usuarioSinPassword } = user.toJSON();
    res.json({ 
      token,
      usuario: usuarioSinPassword
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  
  jwt.verify(token, SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    
    // Verificar que el usuario siga activo en la base de datos
    try {
      const currentUser = await Usuario.findByPk(user.id);
      if (!currentUser) {
        return res.status(401).json({ 
          error: 'Usuario no encontrado',
          code: 'USER_NOT_FOUND'
        });
      }
      
      if (currentUser.activo === false) {
        return res.status(401).json({ 
          error: 'Tu cuenta ha sido desactivada. Contacta al administrador.',
          code: 'USER_INACTIVE'
        });
      }
      
      // Actualizar la información del usuario en el token si es necesario
      req.user = {
        ...user,
        activo: currentUser.activo
      };
    } catch (error) {
      console.error('Error verificando estado del usuario:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    
    next();
  });
};

exports.restore = async (req, res) => {
  const { correo, nueva_contraseña } = req.body;
  if (!correo || !nueva_contraseña) {
    return res.status(400).json({ error: 'Correo y nueva contraseña son requeridos' });
  }
  try {
    const user = await Usuario.findOne({ where: { correo } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const hash = await bcrypt.hash(nueva_contraseña, 12);
    await user.update({ contraseña: hash });
    res.json({ success: true, message: 'Contraseña restaurada correctamente' });
  } catch (err) {
    console.error('Error en restauración de contraseña:', err);
    res.status(500).json({ error: err.message });
  }
}; 