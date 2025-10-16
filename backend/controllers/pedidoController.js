const { Pedido, Detalle_Pedido, Producto, Usuario } = require('../models').sequelize.models;
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: Detalle_Pedido,
          as: 'detalles_pedidos',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen']
            }
          ]
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre']
        }
      ],
      order: [['fecha_pedido', 'DESC']]
    });
    res.json({ success: true, data: pedidos });
  } catch (err) {
    console.error('Error obteniendo pedidos:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id, {
      include: [
        {
          model: Detalle_Pedido,
          as: 'detalles_pedidos',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen', 'descripcion']
            }
          ]
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre']
        }
      ]
    });
    
    if (!pedido) {
      return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
    }
    
    res.json({ success: true, data: pedido });
  } catch (err) {
    console.error('Error obteniendo pedido:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { 
      cliente_nombre, 
      cliente_telefono, 
      cliente_direccion, 
      cliente_email,
      fecha_entrega,
      metodo_pago,
      notas,
      items,
      usuario_id 
    } = req.body;

    // Validaciones
    if (!cliente_nombre || !cliente_telefono || !cliente_direccion) {
      return res.status(400).json({ 
        success: false, 
        error: 'Nombre, teléfono y dirección del cliente son requeridos' 
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'El pedido debe contener al menos un producto' 
      });
    }

    // Calcular total
    let total = 0;
    for (const item of items) {
      const producto = await Producto.findByPk(item.producto_id);
      if (!producto) {
        return res.status(400).json({ 
          success: false, 
          error: `Producto con ID ${item.producto_id} no encontrado` 
        });
      }
      const precio = producto.precio || 0;
      total += precio * item.cantidad;
    }

    // Crear pedido
    const pedido = await Pedido.create({
      cliente_nombre,
      cliente_telefono,
      cliente_direccion,
      cliente_email,
      fecha_entrega: fecha_entrega ? new Date(fecha_entrega) : null,
      metodo_pago: metodo_pago || 'efectivo',
      notas,
      total,
      usuario_id
    });

    // Crear detalles del pedido
    const detalles = [];
    for (const item of items) {
      const producto = await Producto.findByPk(item.producto_id);
      const precio = producto.precio || 0;
      const subtotal = precio * item.cantidad;
      
      const detalle = await Detalle_Pedido.create({
        pedido_id: pedido.id,
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario: precio,
        subtotal
      });
      detalles.push(detalle);
    }

    // Obtener pedido completo con detalles
    const pedidoCompleto = await Pedido.findByPk(pedido.id, {
      include: [
        {
          model: Detalle_Pedido,
          as: 'detalles_pedidos',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen']
            }
          ]
        }
      ]
    });

    res.status(201).json({ success: true, data: pedidoCompleto });
  } catch (err) {
    console.error('Error creando pedido:', err);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) {
      return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
    }

    await pedido.update(req.body);
    
    const pedidoActualizado = await Pedido.findByPk(pedido.id, {
      include: [
        {
          model: Detalle_Pedido,
          as: 'detalles_pedidos',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen']
            }
          ]
        }
      ]
    });

    res.json({ success: true, data: pedidoActualizado });
  } catch (err) {
    console.error('Error actualizando pedido:', err);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const pedido = await Pedido.findByPk(req.params.id);
    
    if (!pedido) {
      return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
    }

    const estadosValidos = ['pendiente', 'en_preparacion', 'listo', 'en_camino', 'entregado', 'cancelado'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Estado inválido. Estados válidos: ' + estadosValidos.join(', ') 
      });
    }

    await pedido.update({ estado });
    
    const pedidoActualizado = await Pedido.findByPk(pedido.id, {
      include: [
        {
          model: Detalle_Pedido,
          as: 'detalles_pedidos',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen']
            }
          ]
        }
      ]
    });

    res.json({ success: true, data: pedidoActualizado });
  } catch (err) {
    console.error('Error actualizando estado del pedido:', err);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) {
      return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
    }

    await pedido.destroy();
    res.json({ success: true, message: 'Pedido eliminado exitosamente' });
  } catch (err) {
    console.error('Error eliminando pedido:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Métodos específicos para el dashboard del florista
exports.getByEstado = async (req, res) => {
  try {
    const { estado } = req.params;
    const pedidos = await Pedido.findAll({
      where: { estado },
      include: [
        {
          model: Detalle_Pedido,
          as: 'detalles_pedidos',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'imagen']
            }
          ]
        }
      ],
      order: [['fecha_pedido', 'ASC']]
    });
    
    res.json({ success: true, data: pedidos });
  } catch (err) {
    console.error('Error obteniendo pedidos por estado:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Pedido.findAll({
      attributes: [
        'estado',
        [Pedido.sequelize.fn('COUNT', Pedido.sequelize.col('id')), 'count']
      ],
      group: ['estado']
    });

    const totalPedidos = await Pedido.count();
    const pedidosHoy = await Pedido.count({
      where: {
        fecha_pedido: {
          [Op.gte]: new Date().setHours(0, 0, 0, 0)
        }
      }
    });

    res.json({ 
      success: true, 
      data: {
        stats,
        total: totalPedidos,
        hoy: pedidosHoy
      }
    });
  } catch (err) {
    console.error('Error obteniendo estadísticas de pedidos:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}; 