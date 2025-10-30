import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { pedidosService } from '../../services/pedidosService';

const Carrito = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    cliente_telefono: '',
    cliente_direccion: '',
    cliente_email: '',
    fecha_entrega: '',
    notas: '',
    metodo_pago: 'efectivo'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { carrito, actualizarCantidad, quitarDelCarrito, calcularTotal, limpiarCarrito } = useCart();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (carrito.length === 0) {
      setError('El carrito está vacío');
      setLoading(false);
      return;
    }

    if (!formData.cliente_nombre || !formData.cliente_telefono || !formData.cliente_direccion) {
      setError('Por favor completa todos los campos obligatorios');
      setLoading(false);
      return;
    }

    try {
      // Preparar datos del pedido para el backend
      const pedidoData = {
        cliente_nombre: formData.cliente_nombre,
        cliente_telefono: formData.cliente_telefono,
        cliente_direccion: formData.cliente_direccion,
        cliente_email: formData.cliente_email,
        fecha_entrega: formData.fecha_entrega || null,
        metodo_pago: formData.metodo_pago,
        notas: formData.notas,
        items: carrito.map(item => ({
          producto_id: item.producto_id,
          cantidad: item.cantidad
        }))
      };

      const response = await pedidosService.create(pedidoData);
      
      if (response.success) {
        // Limpiar carrito
        limpiarCarrito();
        
        alert('¡Pedido enviado exitosamente! El florista recibirá tu orden.');
        navigate('/sistema/compras');
      } else {
        setError('Error al enviar el pedido: ' + response.error);
      }
    } catch (err) {
      setError('Error al enviar el pedido: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Tu carrito está vacío</h3>
          <p className="mt-1 text-sm text-gray-500">
            Agrega algunos productos para continuar.
          </p>
          <div className="mt-6">
            <Link
              to="/sistema/compras"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
              </svg>
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🛒 Tu Carrito</h1>
        <Link
          to="/sistema/compras"
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Continuar Comprando
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Productos en el Carrito</h2>
            <div className="space-y-4">
              {carrito.map(item => (
                <div key={item.producto_id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  {/* Imagen */}
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                    {item.imagen ? (
                      <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <svg className="h-8 w-8 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                      </svg>
                    )}
                  </div>
                  
                  {/* Información */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.nombre}</h3>
                    <p className="text-gray-600">S/.{parseFloat(item.precio || 0).toFixed(2)} cada uno</p>
                  </div>
                  
                  {/* Cantidad */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => actualizarCantidad(item.producto_id, item.cantidad - 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <span className="w-12 text-center font-semibold">{item.cantidad}</span>
                    <button
                      onClick={() => actualizarCantidad(item.producto_id, item.cantidad + 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Precio total */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">S/.{(parseFloat(item.precio || 0) * item.cantidad).toFixed(2)}</p>
                  </div>
                  
                  {/* Eliminar */}
                  <button
                    onClick={() => quitarDelCarrito(item.producto_id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Formulario de pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">📝 Información de Entrega</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="cliente_nombre"
                  value={formData.cliente_nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="cliente_telefono"
                  value={formData.cliente_telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="cliente_email"
                  value={formData.cliente_email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección de entrega *
                </label>
                <textarea
                  name="cliente_direccion"
                  value={formData.cliente_direccion}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Fecha de entrega */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de entrega
                </label>
                <input
                  type="datetime-local"
                  name="fecha_entrega"
                  value={formData.fecha_entrega}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Método de pago */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método de pago
                </label>
                <select
                  name="metodo_pago"
                  value={formData.metodo_pago}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
                </select>
              </div>

              {/* Notas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas adicionales
                </label>
                <textarea
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Instrucciones especiales, dedicatorias, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Resumen del pedido */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Resumen del Pedido</h3>
                                 <div className="space-y-2 text-sm">
                   <div className="flex justify-between font-semibold text-lg">
                     <span>Total:</span>
                     <span className="text-pink-600">S/.{calcularTotal().toFixed(2)}</span>
                   </div>
                 </div>
              </div>

              {/* Botón de confirmar */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? 'Enviando Pedido...' : '🎯 Confirmar Pedido'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito; 