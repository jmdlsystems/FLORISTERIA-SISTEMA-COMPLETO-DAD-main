const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models').sequelize.models;

const SECRET = process.env.JWT_SECRET || 'secreto';

// Middleware para verificar token JWT o Basic Auth
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Token de acceso requerido',
        message: 'Debe proporcionar un token de autenticación'
      });
    }

    // Verificar si es Basic Authentication
    if (authHeader.startsWith('Basic ')) {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [correo, contraseña] = credentials.split(':');
      
      if (!correo || !contraseña) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas',
          message: 'Formato de autenticación básica inválido'
        });
      }
      
      // Buscar usuario por correo
      const usuario = await Usuario.findOne({ 
        where: { correo },
        attributes: { exclude: ['contraseña'] }
      });
      
      if (!usuario) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas',
          message: 'Usuario no encontrado'
        });
      }
      
      // Verificar si el usuario está activo
      if (usuario.activo === false) {
        return res.status(401).json({ 
          error: 'Cuenta desactivada',
          message: 'Tu cuenta está desactivada. Contacta al administrador.'
        });
      }
      
      // Verificar contraseña
      const usuarioConPassword = await Usuario.findOne({ where: { correo } });
      const passwordValid = await bcrypt.compare(contraseña, usuarioConPassword.contraseña);
      
      if (!passwordValid) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas',
          message: 'Contraseña incorrecta'
        });
      }
      
      req.user = {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol_id: usuario.rol_id
      };
      
      return next();
    }

    // Verificar si es Bearer Token (JWT)
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ 
          error: 'Token de acceso requerido',
          message: 'Debe proporcionar un token de autenticación'
        });
      }
      
      const decoded = jwt.verify(token, SECRET);
      
      // Verificar que el usuario aún existe en la base de datos
      const usuario = await Usuario.findByPk(decoded.id, {
        attributes: { exclude: ['contraseña'] }
      });
      
      if (!usuario) {
        return res.status(401).json({ 
          error: 'Token inválido',
          message: 'El usuario asociado al token no existe'
        });
      }
      
      // Verificar si el usuario está activo
      if (usuario.activo === false) {
        return res.status(401).json({ 
          error: 'Cuenta desactivada',
          message: 'Tu cuenta ha sido desactivada. Contacta al administrador.'
        });
      }
      
      req.user = {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol_id: usuario.rol_id
      };
      
      return next();
    }

    // Si no es ni Basic ni Bearer
    return res.status(401).json({ 
      error: 'Método de autenticación no soportado',
      message: 'Use Basic Authentication o Bearer Token'
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        error: 'Token inválido',
        message: 'El token proporcionado no es válido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        error: 'Token expirado',
        message: 'El token ha expirado, debe iniciar sesión nuevamente'
      });
    }
    
    console.error('Error en verificación de token:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor',
      message: 'Error al verificar el token de autenticación'
    });
  }
};

// Middleware opcional para rutas que pueden funcionar con o sin token
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      const decoded = jwt.verify(token, SECRET);
      const usuario = await Usuario.findByPk(decoded.id, {
        attributes: { exclude: ['contraseña'] }
      });
      
      if (usuario) {
        req.user = {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol_id: usuario.rol_id
        };
      }
    }
    
    next();
  } catch (error) {
    // Si hay error en el token, simplemente continuar sin usuario autenticado
    next();
  }
};

// Middleware para verificar roles específicos
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Autenticación requerida',
        message: 'Debe iniciar sesión para acceder a este recurso'
      });
    }
    
    if (!roles.includes(req.user.rol_id)) {
      return res.status(403).json({ 
        error: 'Acceso denegado',
        message: 'No tiene permisos para acceder a este recurso'
      });
    }
    
    next();
  };
};

module.exports = {
  verifyToken,
  optionalAuth,
  requireRole
}; 