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
              to="/sistema/pedidos"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="h-5 w-5 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span className="text-gray-700">📋 Gestión de Pedidos</span>
            </Link>
            <Link 
              to="/sistema/inventario"
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
                    S/.{parseFloat(pedido.total || 0).toFixed(2)}
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
            to="/sistema/pedidos" 
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
            to="/sistema/pedidos" 
            className="bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-lg text-center transition-colors"
          >
            <h3 className="font-semibold">🌸 Gestionar Pedidos</h3>
            <p className="text-sm opacity-90">Preparar arreglos florales</p>
          </Link>
          <Link 
            to="/sistema/inventario" 
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
        <p className="text-purple-600">Bienvenido a Corporación Agricola Camsa S.A.C</p>
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
          <Link to="/sistema/compras" className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-colors">
            <h3 className="font-semibold">Ver Catálogo</h3>
            <p className="text-sm opacity-90">Explorar productos</p>
          </Link>
          <Link to="/sistema/carrito" className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors">
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

        </>
      )}
    </div>
  );
};

export default Dashboard;
 