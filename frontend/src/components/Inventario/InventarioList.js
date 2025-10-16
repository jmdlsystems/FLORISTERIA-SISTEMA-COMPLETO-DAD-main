import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { inventarioService } from '../../services/inventarioService';

const InventarioList = () => {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [inventarioPerPage] = useState(10);
  const location = useLocation();

  useEffect(() => {
    loadInventario();
  }, []);

  // Recargar inventario cuando se regrese de editar
  useEffect(() => {
    if (location.pathname === '/sistemafloreria/inventario') {
      loadInventario();
    }
  }, [location.pathname]);

  const loadInventario = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await inventarioService.getAll();
      if (res.success) {
        setInventario(res.data || []);
      } else {
        setInventario([]);
        setError(res.error);
      }
    } catch (err) {
      setInventario([]);
      setError('Error al cargar el inventario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para determinar el estado del inventario (misma lógica que en los formularios)
  const getEstadoInventario = (cantidadActual, cantidadMinima) => {
    if (cantidadActual <= 0) {
      return { estado: 'Sin Stock', bgColor: 'bg-red-100', textColor: 'text-red-800' };
    } else if (cantidadActual <= cantidadMinima * 0.5) {
      return { estado: 'Crítico', bgColor: 'bg-red-100', textColor: 'text-red-800' };
    } else if (cantidadActual <= cantidadMinima) {
      return { estado: 'Bajo Stock', bgColor: 'bg-orange-100', textColor: 'text-orange-800' };
    } else if (cantidadActual <= cantidadMinima * 1.5) {
      return { estado: 'Stock Moderado', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
    } else {
      return { estado: 'Disponible', bgColor: 'bg-green-100', textColor: 'text-green-800' };
    }
  };

  const filteredInventario = inventario.filter(item =>
    item.producto?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ubicacion?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cantidad_actual?.toString().includes(searchTerm)
  );

  const indexOfLastItem = currentPage * inventarioPerPage;
  const indexOfFirstItem = indexOfLastItem - inventarioPerPage;
  const currentItems = filteredInventario.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInventario.length / inventarioPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
      {/* Información del Sistema de Auditoría */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Sistema de Auditoría Automática
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p className="mb-2">
                <strong>📊 Inventario:</strong> Entidad principal - Guarda productos y cantidades
              </p>
              <p className="mb-2">
                <strong>➕ Ajustes de Inventario:</strong> Solo lectura - Se registran automáticamente para auditoría
              </p>
              <p>
                <strong>📝 Movimientos:</strong> Solo lectura - Se registran automáticamente para auditoría
              </p>
            </div>
            <div className="mt-3">
              <Link
                to="/sistemafloreria/inventario/crear"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Crear Registro de Inventario
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión del Inventario</h1>
        <div className="flex space-x-2">
          <Link
            to="/sistemafloreria/inventario/crear"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nuevo Registro
          </Link>
          <Link
            to="/sistemafloreria/ajustes-inventario"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Ver Ajustes
          </Link>
          <Link
            to="/sistemafloreria/movimientos"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Ver Movimientos
          </Link>
        </div>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar en inventario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad Actual
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad Mínima
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.producto?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.ubicacion?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="font-semibold">{item.cantidad_actual || 0}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="font-semibold">{item.cantidad_minima || 0}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {(() => {
                    const estado = getEstadoInventario(item.cantidad_actual || 0, item.cantidad_minima || 0);
                    const cantidadActual = item.cantidad_actual || 0;
                    const cantidadMinima = item.cantidad_minima || 0;
                    
                    let tooltipText = '';
                    if (cantidadActual <= 0) {
                      tooltipText = 'Sin stock disponible';
                    } else if (cantidadActual <= cantidadMinima * 0.5) {
                      tooltipText = `Crítico: ${cantidadActual} ≤ ${cantidadMinima * 0.5}`;
                    } else if (cantidadActual <= cantidadMinima) {
                      tooltipText = `Bajo stock: ${cantidadMinima * 0.5} < ${cantidadActual} ≤ ${cantidadMinima}`;
                    } else if (cantidadActual <= cantidadMinima * 1.5) {
                      tooltipText = `Stock moderado: ${cantidadMinima} < ${cantidadActual} ≤ ${cantidadMinima * 1.5}`;
                    } else {
                      tooltipText = `Stock suficiente: ${cantidadActual} > ${cantidadMinima * 1.5}`;
                    }
                    
                    return (
                      <span 
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${estado.bgColor} ${estado.textColor} cursor-help`}
                        title={tooltipText}
                      >
                        {estado.estado}
                      </span>
                    );
                  })()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      to={`/sistemafloreria/inventario/${item.id}/actualizar`}
                      className="text-indigo-600 hover:text-indigo-900 transition duration-200"
                      title="Editar registro de inventario"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </Link>
                    <Link
                      to={`/sistemafloreria/ajustes-inventario?producto_id=${item.producto_id}`}
                      className="text-blue-600 hover:text-blue-900 transition duration-200"
                      title="Ver ajustes de este producto"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </Link>
                    <Link
                      to={`/sistemafloreria/movimientos?producto_id=${item.producto_id}`}
                      className="text-purple-600 hover:text-purple-900 transition duration-200"
                      title="Ver historial de movimientos"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPage === number
                    ? 'bg-green-600 text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </nav>
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>El inventario es la entidad principal que guarda productos y cantidades</p>
        <p>Los ajustes y movimientos se registran automáticamente para auditoría</p>
      </div>
    </div>
  );
};

export default InventarioList; 