import React, { useState, useMemo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener el rol del usuario
  const userRole = user?.rol?.nombre || user?.rol_nombre;

  const menuItems = useMemo(() => {
    const baseItems = [
      { 
        label: 'Dashboard', 
        icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z', 
        route: '/sistema/dashboard',
        roles: ['ADMINISTRADOR', 'REPARTIDOR', 'FLORISTA', 'USUARIO']
      }
    ];

    // Items solo para ADMINISTRADOR
    const adminItems = [
      { 
        label: 'Usuarios', 
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z', 
        route: '/sistema/usuarios',
        roles: ['ADMINISTRADOR']
      },
      { 
        label: 'Roles', 
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', 
        route: '/sistema/roles',
        roles: ['ADMINISTRADOR']
      },
      { 
        label: 'Productos', 
        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', 
        route: '/sistema/productos',
        roles: ['ADMINISTRADOR']
      },
      { 
        label: 'Categorías', 
        icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', 
        route: '/sistema/categorias',
        roles: ['ADMINISTRADOR']
      },
      { 
        label: 'Proveedores', 
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', 
        route: '/sistema/proveedores',
        roles: ['ADMINISTRADOR']
      },
      { 
        label: 'Ubicaciones', 
        icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', 
        route: '/sistema/ubicaciones',
        roles: ['ADMINISTRADOR']
      },
      { 
        label: 'Órdenes de Compra', 
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', 
        route: '/sistema/ordenes-compra',
        roles: ['ADMINISTRADOR']
      }
    ];

    // Items para ADMINISTRADOR y FLORISTA
    const inventoryItems = [
      { 
        label: '📊 Inventario', 
        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', 
        route: '/sistema/inventario',
        isMain: true,
        roles: ['ADMINISTRADOR', 'FLORISTA']
      },
      { 
        label: '➕ Ajustes Inventario', 
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', 
        route: '/sistema/ajustes-inventario',
        isAudit: true,
        roles: ['ADMINISTRADOR', 'FLORISTA']
      },
      { 
        label: '📝 Movimientos', 
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', 
        route: '/sistema/movimientos',
        isAudit: true,
        roles: ['ADMINISTRADOR', 'FLORISTA']
      }
    ];

    // Items para ADMINISTRADOR, REPARTIDOR y FLORISTA
    const orderItems = [
      { 
        label: '📋 Gestión de Pedidos', 
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', 
        route: '/sistema/pedidos',
        isOrders: true,
        roles: ['ADMINISTRADOR', 'REPARTIDOR', 'FLORISTA']
      }
    ];

    // Items solo para USUARIO
    const userItems = [
      { 
        label: '🛍️ Catálogo', 
        icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', 
        route: '/sistema/compras',
        isShopping: true,
        roles: ['USUARIO']
      },
      { 
        label: '🛒 Mi Carrito', 
        icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01', 
        route: '/sistema/carrito',
        isShopping: true,
        roles: ['USUARIO']
      }
    ];

    // Combinar todos los items y filtrar por rol
    const allItems = [...baseItems, ...adminItems, ...inventoryItems, ...orderItems, ...userItems];
    return allItems.filter(item => item.roles.includes(userRole));
  }, [userRole]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const isActive = useCallback((route) => {
    return location.pathname.startsWith(route);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span className="ml-2 text-lg font-semibold text-gray-800">Corporación Agricola Camsa</span>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* User Info */}
        {user && !isCollapsed && (
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user.nombre.charAt(0)}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.nombre}</p>
                <p className="text-xs text-gray-500">{user.correo}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation - Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-4">
            <div className="px-2 space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.route}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.route)
                      ? item.isMain 
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                        : item.isAudit 
                        ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500'
                        : item.isShopping
                        ? 'bg-pink-100 text-pink-700 border-l-4 border-pink-500'
                        : item.isOrders
                        ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500'
                        : 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <svg className={`h-5 w-5 ${isCollapsed ? 'mr-0' : 'mr-3'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                  </svg>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </div>
          </nav>

        </div>



        {/* Logout - Fixed at bottom */}
        <div className="p-4 border-t bg-white">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <svg className={`h-5 w-5 ${isCollapsed ? 'mr-0' : 'mr-3'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            {!isCollapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Sidebar; 