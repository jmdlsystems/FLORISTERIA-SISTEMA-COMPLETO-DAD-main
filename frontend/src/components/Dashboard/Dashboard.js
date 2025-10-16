import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { usuariosService } from '../../services/usuariosService';
import { productosService } from '../../services/productosService';
import { rolesService } from '../../services/rolesService';
import { inventarioService } from '../../services/inventarioService';
import { ajusteInventarioService } from '../../services/ajusteInventarioService';
import { movimientosService } from '../../services/movimientosService';
import { pedidosService } from '../../services/pedidosService';

const Dashboard = () => {
  const { user } = useAuth();
  const { carrito, obtenerCantidadTotal } = useCart();
  const [stats, setStats] = useState({
    usuarios: 0,
    productos: 0,
    roles: 0,
    inventario: 0,
    ajustes: 0,
    movimientos: 0
  });
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener el rol del usuario
  const userRole = user?.rol?.nombre || user?.rol_nombre;

  useEffect(() => {
    loadStats();
    loadPedidos();
  }, []);

  const loadStats = async () => {
    try {
      // Solo cargar estadísticas si es administrador
      if (userRole === 'ADMINISTRADOR') {
        const [usuariosRes, productosRes, rolesRes, inventarioRes, ajustesRes, movimientosRes] = await Promise.all([
          usuariosService.getAll(),
          productosService.getAll(),
          rolesService.getAll(),
          inventarioService.getAll(),
          ajusteInventarioService.getAll(),
          movimientosService.getAll()
        ]);

        setStats({
          usuarios: usuariosRes.success ? usuariosRes.data.length : 0,
          productos: productosRes.success ? productosRes.data.length : 0,
          roles: rolesRes.success ? rolesRes.data.length : 0,
          inventario: inventarioRes.success ? inventarioRes.data.length : 0,
          ajustes: ajustesRes.success ? ajustesRes.data.length : 0,
          movimientos: movimientosRes.success ? movimientosRes.data.length : 0
        });
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPedidos = async () => {
    try {
      // Cargar pedidos reales del backend
      const response = await pedidosService.getAll();
      if (response.success) {
        setPedidos(response.data || []);
      } else {
        console.error('Error cargando pedidos:', response.error);
        setPedidos([]);
      }
    } catch (err) {
      console.error('Error cargando pedidos:', err);
      setPedidos([]);
    }
  };

  // Renderizar dashboard según el rol
  const renderDashboardByRole = () => {
    switch (userRole) {
      case 'ADMINISTRADOR':
        return renderAdminDashboard();
      case 'REPARTIDOR':
        return renderRepartidorDashboard();
      case 'FLORISTA':
        return renderFloristaDashboard();
      case 'USUARIO':
        return renderUserDashboard();
      default:
        return renderUserDashboard();
    }
  };

  const renderAdminDashboard = () => (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600">Bienvenido al Sistema de Gestión de Florería</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Usuarios Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
              <p className="text-2xl font-semibold text-gray-900">
                {loading ? '...' : stats.usuarios}
              </p>
            </div>
          </div>
        </div>

        {/* Productos Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Productos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {loading ? '...' : stats.productos}
              </p>
            </div>
          </div>
        </div>

        {/* Roles Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Roles</p>
              <p className="text-2xl font-semibold text-gray-900">
                {loading ? '...' : stats.roles}
              </p>
            </div>
          </div>
        </div>

        {/* Inventario Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Entidad Principal</p>
              <p className="text-2xl font-semibold text-gray-900">
                {loading ? '...' : stats.inventario}
              </p>
            </div>
          </div>
        </div>

        {/* Ajustes Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-400">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50">
              <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ajustes Registrados</p>
              <p className="text-2xl font-semibold text-gray-900">
                {loading ? '...' : stats.ajustes}
              </p>
            </div>
          </div>
        </div>

        {/* Movimientos Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-400">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-50">
              <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Movimientos Auditados</p>
              <p className="text-2xl font-semibold text-gray-900">
                {loading ? '...' : stats.movimientos}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Actions Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <Link 
              to="/sistemafloreria/pedidos"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="h-5 w-5 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span className="text-gray-700">📋 Gestión de Pedidos</span>
            </Link>
            <Link 
              to="/sistemafloreria/inventario"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="h-5 w-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              <span className="text-gray-700">📊 Gestionar Inventario</span>
            </Link>
          </div>
        </div>

        {/* System Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistema de Auditoría</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className="text-green-600 font-medium">Activo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Auditoría:</span>
              <span className="text-purple-600 font-medium">Tiempo Real</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Entidad Principal:</span>
              <span className="text-blue-600 font-medium">Inventario</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Registros Auditados:</span>
              <span className="text-green-600 font-medium">Ajustes + Movimientos</span>
            </div>
          </div>
                </div>
      </div>
    </div>
  );

  const renderRepartidorDashboard = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Dashboard de Repartidor</h1>
        <p className="text-blue-600">Gestión de Entregas y Distribución</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">Listos para Recoger</h3>
          <p className="text-3xl font-bold text-yellow-600">{pedidos.filter(p => p.estado === 'listo').length}</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">En Ruta</h3>
          <p className="text-3xl font-bold text-blue-600">{pedidos.filter(p => p.estado === 'en_camino').length}</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Entregados Hoy</h3>
          <p className="text-3xl font-bold text-green-600">{pedidos.filter(p => p.estado === 'entregado').length}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Próximas Entregas</h2>
        <div className="bg-white rounded-lg shadow">
          {pedidos.filter(p => p.estado === 'listo' || p.estado === 'en_camino').slice(0, 5).map((pedido, index) => (
            <div key={pedido.id || index} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Pedido #{pedido.id}</p>
                  <p className="text-sm text-gray-600">{pedido.cliente_nombre}</p>
                  <p className="text-xs text-gray-500">{pedido.cliente_direccion}</p>
                  {pedido.fecha_entrega && (
                    <p className="text-xs text-blue-600">
                      Entrega: {new Date(pedido.fecha_entrega).toLocaleDateString('es-ES')}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pedido.estado === 'listo' ? 'bg-yellow-100 text-yellow-800' :
                    pedido.estado === 'en_camino' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {pedido.estado === 'listo' ? 'Listo para Recoger' :
                     pedido.estado === 'en_camino' ? 'En Ruta' : pedido.estado}
                  </span>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    ${parseFloat(pedido.total || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/sistemafloreria/pedidos" 
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors"
          >
            <h3 className="font-semibold">📋 Ver Todos los Pedidos</h3>
            <p className="text-sm opacity-90">Gestionar estados de entrega</p>
          </Link>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="font-semibold text-gray-700">🚚 Estado de Entregas</h3>
            <p className="text-sm text-gray-600">
              {pedidos.filter(p => p.estado === 'en_camino').length} pedidos en ruta
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFloristaDashboard = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pink-900">Dashboard de Florista</h1>
        <p className="text-pink-600">Gestión de Arreglos Florales</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-pink-900 mb-2">Arreglos Pendientes</h3>
          <p className="text-3xl font-bold text-pink-600">{pedidos.filter(p => p.estado === 'pendiente').length}</p>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-2">En Preparación</h3>
          <p className="text-3xl font-bold text-orange-600">{pedidos.filter(p => p.estado === 'en_preparacion').length}</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Listos para Entrega</h3>
          <p className="text-3xl font-bold text-green-600">{pedidos.filter(p => p.estado === 'listo').length}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-pink-900 mb-4">Arreglos Recientes</h2>
        <div className="bg-white rounded-lg shadow">
          {pedidos.slice(0, 5).map((pedido, index) => (
            <div key={pedido.id || index} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Arreglo #{pedido.id}</p>
                  <p className="text-sm text-gray-600">{pedido.cliente_nombre}</p>
                  <p className="text-xs text-gray-500">{pedido.detalles_pedidos?.length || 0} productos</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  pedido.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  pedido.estado === 'en_preparacion' ? 'bg-orange-100 text-orange-800' :
                  pedido.estado === 'listo' ? 'bg-green-100 text-green-800' :
                  pedido.estado === 'en_camino' ? 'bg-blue-100 text-blue-800' :
                  pedido.estado === 'entregado' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {pedido.estado === 'pendiente' ? 'Pendiente' :
                   pedido.estado === 'en_preparacion' ? 'En Preparación' :
                   pedido.estado === 'listo' ? 'Listo' :
                   pedido.estado === 'en_camino' ? 'En Camino' :
                   pedido.estado === 'entregado' ? 'Entregado' :
                   pedido.estado === 'cancelado' ? 'Cancelado' : pedido.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-pink-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/sistemafloreria/pedidos" 
            className="bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-lg text-center transition-colors"
          >
            <h3 className="font-semibold">🌸 Gestionar Pedidos</h3>
            <p className="text-sm opacity-90">Preparar arreglos florales</p>
          </Link>
          <Link 
            to="/sistemafloreria/inventario" 
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center transition-colors"
          >
            <h3 className="font-semibold">📊 Ver Inventario</h3>
            <p className="text-sm opacity-90">Controlar stock de flores</p>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderUserDashboard = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-900">Mi Cuenta</h1>
        <p className="text-purple-600">Bienvenido a nuestra Florería</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Mi Carrito</h3>
          <p className="text-3xl font-bold text-purple-600">{obtenerCantidadTotal()}</p>
          <p className="text-sm text-purple-600">productos</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Mis Pedidos</h3>
          <p className="text-3xl font-bold text-blue-600">{pedidos.filter(p => p.cliente_nombre === user?.nombre).length}</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Productos Disponibles</h3>
          <p className="text-3xl font-bold text-green-600">{stats.productos}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-purple-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/sistemafloreria/compras" className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-colors">
            <h3 className="font-semibold">Ver Catálogo</h3>
            <p className="text-sm opacity-90">Explorar flores y arreglos</p>
          </Link>
          <Link to="/sistemafloreria/carrito" className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors">
            <h3 className="font-semibold">Mi Carrito</h3>
            <p className="text-sm opacity-90">Ver productos seleccionados</p>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="pb-24">
            {renderDashboardByRole()}
          </div>
          
          {/* Información del Autor - Fixed at bottom */}
          <div className="fixed bottom-0 left-64 right-0 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-200 z-0">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  👨‍💻 Desarrollado por
                </h3>
                <p className="text-xl font-bold text-blue-800 mb-1">
                  Ing. Rodrigo Guerrero Jordy
                </p>
                <div className="mt-3 flex justify-center space-x-4 text-xs text-blue-400 mb-3">
                  <span>🌸 Sistema de Gestión de Florería</span>
                  <span>•</span>
                  <span>📊 Inventario Inteligente</span>
                  <span>•</span>
                  <span>🔒 Auditoría Automática</span>
                </div>
                
                {/* Enlaces de Contacto */}
                <div className="flex justify-center space-x-6 text-sm">
                  <a 
                    href="https://wa.me/51973571955" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>

                  <a 
                    href="https://github.com/RODRIGO-GUERRERO" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@joordyrodrigo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-black hover:text-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                    <span>TikTok</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/jordyrodrigoguerrero" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a 
                    href="https://www.facebook.com/jordy.rodrigoguerrero.1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 