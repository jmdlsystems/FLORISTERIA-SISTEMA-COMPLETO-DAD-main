import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ubicacionesService } from '../../services/ubicacionesService';

const UbicacionesList = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ubicacionesPerPage] = useState(10);

  useEffect(() => {
    loadUbicaciones();
  }, []);

  const loadUbicaciones = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await ubicacionesService.getAll();
      if (res.success) {
        setUbicaciones(res.data || []);
      } else {
        setUbicaciones([]);
        setError(res.error);
      }
    } catch (err) {
      setUbicaciones([]);
      setError('Error al cargar las ubicaciones: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta ubicación?')) {
      try {
        await ubicacionesService.delete(id);
        setUbicaciones(ubicaciones.filter(ubicacion => ubicacion.id !== id));
        alert('Ubicación eliminada exitosamente');
      } catch (err) {
        alert('Error al eliminar la ubicación: ' + err.message);
      }
    }
  };

  const filteredUbicaciones = ubicaciones.filter(ubicacion =>
    ubicacion.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ubicacion.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUbicacion = currentPage * ubicacionesPerPage;
  const indexOfFirstUbicacion = indexOfLastUbicacion - ubicacionesPerPage;
  const currentUbicaciones = filteredUbicaciones.slice(indexOfFirstUbicacion, indexOfLastUbicacion);
  const totalPages = Math.ceil(filteredUbicaciones.length / ubicacionesPerPage);

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
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Ubicaciones</h1>
        <Link
          to="/sistema/ubicaciones/crear"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Nueva Ubicación
        </Link>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar ubicaciones..."
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
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUbicaciones.map((ubicacion) => (
              <tr key={ubicacion.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {ubicacion.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ubicacion.nombre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {ubicacion.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      to={`/sistema/ubicaciones/${ubicacion.id}/actualizar`}
                      className="text-indigo-600 hover:text-indigo-900 transition duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(ubicacion.id)}
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
        Mostrando {indexOfFirstUbicacion + 1} a {Math.min(indexOfLastUbicacion, filteredUbicaciones.length)} de {filteredUbicaciones.length} ubicaciones
      </div>
    </div>
  );
};

export default UbicacionesList; 