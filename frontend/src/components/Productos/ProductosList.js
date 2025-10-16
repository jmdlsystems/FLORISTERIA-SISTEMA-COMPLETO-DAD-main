import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productosService } from '../../services/productosService';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productosPerPage] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos();
  }, []);

  // Efecto para manejar la tecla ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && selectedImage) {
        closeImageModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const fetchProductos = async () => {
    setLoading(true);
    const res = await productosService.getAll();
    if (res.success) {
      setProductos(res.data);
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    const res = await productosService.delete(id);
    if (res.success) {
      setProductos(productos.filter(p => p.id !== id));
    } else {
      alert(res.error);
    }
  };

  const handleImageClick = (producto) => {
    if (producto.imagen) {
      const imageUrl = producto.imagen.startsWith('http')
        ? producto.imagen
        : `https://grupo01tdam.pythonanywhere.com/assets/productos/${producto.imagen}`;
      setSelectedImage({
        url: imageUrl,
        nombre: producto.nombre,
        descripcion: producto.descripcion
      });
      setImageLoaded(false);
      setZoom(1); // Reset zoom al abrir nueva imagen
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setImageLoaded(false);
    setZoom(1);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3)); // Máximo 3x zoom
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.25)); // Mínimo 0.25x zoom
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  // Filtrado por búsqueda
  const filteredProductos = productos.filter(producto =>
    producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.id?.toString().includes(searchTerm)
  );

  // Paginación
  const indexOfLastProducto = currentPage * productosPerPage;
  const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
  const currentProductos = filteredProductos.slice(indexOfFirstProducto, indexOfLastProducto);
  const totalPages = Math.ceil(filteredProductos.length / productosPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-2 py-6 sm:px-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold">Productos</h2>
        <Link to="/sistemafloreria/productos/crear" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm sm:text-base">Crear Producto</Link>
      </div>

      {/* Buscador */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg text-xs sm:text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProductos.map(producto => (
                <tr key={producto.id} className="hover:bg-gray-50">
                  <td className="px-2 py-2 whitespace-nowrap">{producto.id}</td>
                  <td className="px-2 py-2 whitespace-nowrap">{producto.nombre}</td>
                  <td className="px-2 py-2 whitespace-nowrap">${producto.precio || '0.00'}</td>
                  <td className="px-2 py-2">
                    {producto.imagen ? (
                      <img
                        src={producto.imagen.startsWith('http')
                          ? producto.imagen
                          : `https://grupo01tdam.pythonanywhere.com/assets/productos/${producto.imagen}`}
                        alt={producto.nombre}
                        className="h-10 w-10 object-cover rounded mx-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
                        style={{ maxWidth: 40, maxHeight: 40 }}
                        onClick={() => handleImageClick(producto)}
                        title="Haz clic para ver en tamaño completo"
                      />
                    ) : (
                      <span className="text-gray-400">Sin imagen</span>
                    )}
                  </td>
                  <td className="px-2 py-2 max-w-[120px] truncate" title={producto.descripcion}>{producto.descripcion}</td>
                  <td className="px-2 py-2 whitespace-nowrap">{producto.categoria?.nombre || '-'}</td>
                  <td className="px-2 py-2 whitespace-nowrap">{producto.proveedor?.nombre || '-'}</td>
                  <td className="px-2 py-2 space-x-1">
                    <button
                      onClick={() => navigate(`/sistemafloreria/productos/${producto.id}/actualizar`)}
                      className="text-indigo-600 hover:text-indigo-900 transition duration-200"
                      title="Editar"
                    >
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(producto.id)}
                      className="text-red-600 hover:text-red-900 transition duration-200"
                      title="Eliminar"
                    >
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="flex space-x-1">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-2 py-1 text-xs font-medium rounded-md ${
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
              className="px-2 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </nav>
        </div>
      )}

      {/* Información de resultados */}
      <div className="mt-2 text-xs text-gray-600">
        Mostrando {filteredProductos.length === 0 ? 0 : indexOfFirstProducto + 1} a {Math.min(indexOfLastProducto, filteredProductos.length)} de {filteredProductos.length} productos
      </div>

      {/* Modal para imagen en tamaño completo */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Botón de cerrar */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Información del producto */}
            <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white rounded-lg p-3 max-w-md">
              <h3 className="text-lg font-semibold mb-1">{selectedImage.nombre}</h3>
              {selectedImage.descripcion && (
                <p className="text-sm opacity-90">{selectedImage.descripcion}</p>
              )}
            </div>

            {/* Controles de zoom */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 text-white rounded-lg p-2 flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.25}
                className="p-1 rounded hover:bg-white hover:bg-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                title="Reducir zoom"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                </svg>
              </button>
              <span className="text-sm font-medium min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="p-1 rounded hover:bg-white hover:bg-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                title="Aumentar zoom"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 rounded hover:bg-white hover:bg-opacity-20 transition duration-200"
                title="Zoom original"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                </svg>
              </button>
            </div>

            {/* Imagen principal */}
            <div className="relative w-full h-full flex items-center justify-center">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
              <img
                src={selectedImage.url}
                alt={selectedImage.nombre}
                className={`max-w-none max-h-none object-contain transition-all duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center'
                }}
              />
            </div>

            {/* Instrucciones */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 text-white rounded-lg px-4 py-2 text-sm">
              <p>Usa los controles de zoom • ESC para cerrar</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosList; 