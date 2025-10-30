import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordenCompraService } from '../../services/ordenCompraService';

const OrdenesCompraList = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordenesPerPage] = useState(10);

  useEffect(() => {
    loadOrdenes();
  }, []);

  const loadOrdenes = async () => {
    try {
      setLoading(true);
      const response = await ordenCompraService.getAll();
      if (response.success) {
        setOrdenes(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } else {
        setOrdenes([]);
        setError(response.error || 'Error al cargar las órdenes de compra');
      }
    } catch (err) {
      setOrdenes([]);
      setError('Error al cargar las órdenes de compra: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta orden de compra?')) {
      try {
        await ordenCompraService.delete(id);
        setOrdenes(ordenes.filter(orden => orden.id !== id));
        alert('Orden de compra eliminada exitosamente');
      } catch (err) {
        alert('Error al eliminar la orden: ' + err.message);
      }
    }
  };

  const filteredOrdenes = ordenes.filter(orden =>
    orden.numero?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orden.proveedor?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orden.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrden = currentPage * ordenesPerPage;
  const indexOfFirstOrden = indexOfLastOrden - ordenesPerPage;
  const currentOrdenes = filteredOrdenes.slice(indexOfFirstOrden, indexOfLastOrden);
  const totalPages = Math.ceil(filteredOrdenes.length / ordenesPerPage);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Órdenes de Compra</h1>
        <Link
          to="/sistema/ordenes-compra/crear"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Nueva Orden
        </Link>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar órdenes..."
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
                Número
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Proveedor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
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
            {currentOrdenes.map((orden) => (
              <tr key={orden.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {orden.numero || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {orden.proveedor?.nombre || orden.proveedorId || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {orden.proveedor?.contacto || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {orden.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  S/.{orden.total !== undefined && orden.total !== null ? orden.total : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    orden.estado === 'Aprobada' 
                      ? 'bg-green-100 text-green-800' 
                      : orden.estado === 'Pendiente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {orden.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      to={`/sistema/ordenes-compra/${orden.id}/actualizar`}
                      className="text-indigo-600 hover:text-indigo-900 transition duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(orden.id)}
                      className="text-red-600 hover:text-red-900 transition duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
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
        Mostrando {indexOfFirstOrden + 1} a {Math.min(indexOfLastOrden, filteredOrdenes.length)} de {filteredOrdenes.length} órdenes
      </div>
    </div>
  );
};

export default OrdenesCompraList; 