import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ajusteInventarioService } from '../../services/ajusteInventarioService';

const AjustesInventarioList = () => {
  const [ajustes, setAjustes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ajustesPerPage] = useState(10);

  useEffect(() => {
    loadAjustes();
  }, []);

  const loadAjustes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await ajusteInventarioService.getAll();
      if (res.success) {
        setAjustes(res.data || []);
      } else {
        setAjustes([]);
        setError(res.error);
      }
    } catch (err) {
      setAjustes([]);
      setError('Error al cargar los ajustes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este ajuste?')) {
      try {
        await ajusteInventarioService.delete(id);
        setAjustes(ajustes.filter(ajuste => ajuste.id !== id));
        alert('Ajuste eliminado exitosamente');
      } catch (err) {
        alert('Error al eliminar el ajuste: ' + err.message);
      }
    }
  };

  const filteredAjustes = ajustes.filter(ajuste =>
    ajuste.producto?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ajuste.tipo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ajuste.motivo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastAjuste = currentPage * ajustesPerPage;
  const indexOfFirstAjuste = indexOfLastAjuste - ajustesPerPage;
  const currentAjustes = filteredAjustes.slice(indexOfFirstAjuste, indexOfLastAjuste);
  const totalPages = Math.ceil(filteredAjustes.length / ajustesPerPage);

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
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Registro de Auditoría Automática
            </h3>
            <div className="mt-2 text-sm text-green-700">
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
                to="/sistemafloreria/inventario"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 mr-2"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                Gestionar Inventario
              </Link>
              <Link
                to="/sistemafloreria/movimientos"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                Ver Movimientos
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Registro de Ajustes de Inventario</h1>
        <div className="flex space-x-2">
          <Link
            to="/sistemafloreria/inventario"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            Gestionar Inventario
          </Link>
          <Link
            to="/sistemafloreria/movimientos"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
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
            placeholder="Buscar ajustes..."
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
                Cantidad Ajustada
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Motivo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentAjustes.map((ajuste) => (
              <tr key={ajuste.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {ajuste.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ajuste.producto?.nombre || ajuste.producto_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ajuste.cantidad_ajustada}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {ajuste.motivo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ajuste.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ajuste.usuario_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      to={`/sistemafloreria/inventario?producto_id=${ajuste.producto_id}`}
                      className="text-blue-600 hover:text-blue-900 transition duration-200"
                      title="Ver inventario del producto"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                    </Link>
                    <Link
                      to={`/sistemafloreria/movimientos?producto_id=${ajuste.producto_id}`}
                      className="text-purple-600 hover:text-purple-900 transition duration-200"
                      title="Ver movimientos del producto"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
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

      {/* Información de resultados */}
      <div className="mt-4 text-sm text-gray-600">
        Mostrando {indexOfFirstAjuste + 1} a {Math.min(indexOfLastAjuste, filteredAjustes.length)} de {filteredAjustes.length} ajustes
      </div>

      {/* Información adicional del sistema */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Los ajustes de inventario se registran automáticamente cuando se modifica el inventario</p>
        <p>Son registros de auditoría que no se pueden modificar ni eliminar</p>
      </div>
    </div>
  );
};

export default AjustesInventarioList; 