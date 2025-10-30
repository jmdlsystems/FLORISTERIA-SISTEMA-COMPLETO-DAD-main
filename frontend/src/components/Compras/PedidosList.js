import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pedidosService } from '../../services/pedidosService';

const PedidosList = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('');

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    try {
      setLoading(true);
      const response = await pedidosService.getAll();
      if (response.success) {
        setPedidos(response.data || []);
        setError(null);
      } else {
        setPedidos([]);
        setError(response.error || 'Error al cargar los pedidos');
      }
    } catch (err) {
      setPedidos([]);
      setError('Error al cargar los pedidos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstado = async (pedidoId, nuevoEstado) => {
    try {
      const response = await pedidosService.updateEstado(pedidoId, nuevoEstado);
      if (response.success) {
        // Recargar pedidos para obtener datos actualizados
        await loadPedidos();
      } else {
        alert('Error al actualizar el estado: ' + response.error);
      }
    } catch (err) {
      alert('Error al actualizar el estado: ' + err.message);
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_preparacion':
        return 'bg-orange-100 text-orange-800';
      case 'listo':
        return 'bg-green-100 text-green-800';
      case 'en_camino':
        return 'bg-blue-100 text-blue-800';
      case 'entregado':
        return 'bg-purple-100 text-purple-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'en_preparacion':
        return 'En Preparación';
      case 'listo':
        return 'Listo';
      case 'en_camino':
        return 'En Camino';
      case 'entregado':
        return 'Entregado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return estado;
    }
  };

  const pedidosFiltrados = pedidos.filter(pedido => 
    !filtroEstado || pedido.estado === filtroEstado
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-pink-800">
              📋 Panel de Pedidos
            </h3>
            <div className="mt-2 text-sm text-pink-700">
              <p className="mb-2">
                <strong>👥 Clientes:</strong> Los usuarios han enviado sus pedidos
              </p>
              <p className="mb-2">
                <strong>🌸 Florista:</strong> Gestiona y prepara los arreglos
              </p>
              <p>
                <strong>🚚 Entrega:</strong> Actualiza el estado de cada pedido
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📋 Pedidos de Clientes</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Total: <span className="font-bold text-pink-600">{pedidos.length}</span> pedidos
          </span>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendientes</option>
            <option value="en_preparacion">En Preparación</option>
            <option value="listo">Listos</option>
            <option value="en_camino">En Camino</option>
            <option value="entregado">Entregados</option>
            <option value="cancelado">Cancelados</option>
          </select>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="space-y-6">
        {pedidosFiltrados.map(pedido => (
          <div key={pedido.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Pedido #{pedido.id} - {pedido.cliente_nombre}
                </h3>
                <p className="text-gray-600">
                  Fecha de pedido: {new Date(pedido.fecha_pedido).toLocaleString('es-ES')}
                </p>
                {pedido.fecha_entrega && (
                  <p className="text-gray-600">
                    Entrega: {new Date(pedido.fecha_entrega).toLocaleString('es-ES')}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(pedido.estado)}`}>
                  {getEstadoTexto(pedido.estado)}
                </span>
                <span className="text-2xl font-bold text-pink-600">
                  ${parseFloat(pedido.total || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Información del cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">📞 Información del Cliente</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Nombre:</strong> {pedido.cliente_nombre}</p>
                  <p><strong>Teléfono:</strong> {pedido.cliente_telefono}</p>
                  <p><strong>Email:</strong> {pedido.cliente_email || 'No proporcionado'}</p>
                  <p><strong>Dirección:</strong> {pedido.cliente_direccion}</p>
                  <p><strong>Método de pago:</strong> {pedido.metodo_pago}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">📝 Detalles del Pedido</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Notas:</strong> {pedido.notas || 'Sin notas adicionales'}</p>
                  <p><strong>Total de items:</strong> {pedido.detalles_pedidos?.length || 0}</p>
                </div>
              </div>
            </div>

            {/* Items del pedido */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">🌸 Productos Solicitados</h4>
              <div className="space-y-2">
                {pedido.detalles_pedidos?.map((detalle, index) => (
                  <div key={detalle.id || index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">{detalle.producto?.nombre || 'Producto no disponible'}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600">Cantidad: {detalle.cantidad}</span>
                      <span className="text-gray-600">${parseFloat(detalle.precio_unitario || 0).toFixed(2)} c/u</span>
                      <span className="font-semibold">${parseFloat(detalle.subtotal || 0).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex space-x-2">
                {pedido.estado === 'pendiente' && (
                  <>
                    <button
                      onClick={() => actualizarEstado(pedido.id, 'en_preparacion')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                    >
                      Iniciar Preparación
                    </button>
                    <button
                      onClick={() => actualizarEstado(pedido.id, 'cancelado')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                    >
                      Cancelar
                    </button>
                  </>
                )}
                {pedido.estado === 'en_preparacion' && (
                  <button
                    onClick={() => actualizarEstado(pedido.id, 'listo')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                  >
                    Marcar como Listo
                  </button>
                )}
                {pedido.estado === 'listo' && (
                  <button
                    onClick={() => actualizarEstado(pedido.id, 'en_camino')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                  >
                    Enviar a Entrega
                  </button>
                )}
                {pedido.estado === 'en_camino' && (
                  <button
                    onClick={() => actualizarEstado(pedido.id, 'entregado')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                  >
                    Marcar como Entregado
                  </button>
                )}
              </div>
              <Link
                to={`/sistema/pedidos/${pedido.id}`}
                className="text-pink-600 hover:text-pink-800 font-medium text-sm"
              >
                Ver Detalles →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {pedidosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay pedidos</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filtroEstado ? 'No hay pedidos con el estado seleccionado.' : 'Aún no se han recibido pedidos de clientes.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PedidosList; 