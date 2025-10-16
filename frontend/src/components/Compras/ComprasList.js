import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productosService } from '../../services/productosService';
import { categoriasService } from '../../services/categoriasService';
import { useCart } from '../../contexts/CartContext';

const ComprasList = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { carrito, agregarAlCarrito, calcularTotal, obtenerCantidadTotal } = useCart();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productosRes, categoriasRes] = await Promise.all([
        productosService.getAll(),
        categoriasService.getAll()
      ]);

      if (productosRes.success) {
        setProductos(productosRes.data || []);
      }
      if (categoriasRes.success) {
        setCategorias(categoriasRes.data || []);
      }
    } catch (err) {
      setError('Error al cargar los productos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };



  const productosFiltrados = productos.filter(producto => {
    const cumpleCategoria = !categoriaFiltro || producto.categoria_id === Number(categoriaFiltro);
    const cumpleBusqueda = !searchTerm || 
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return cumpleCategoria && cumpleBusqueda;
  });

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-pink-800">
              🛒 Módulo de Compras
            </h3>
            <div className="mt-2 text-sm text-pink-700">
              <p className="mb-2">
                <strong>🌸 Selecciona:</strong> Las flores que deseas comprar
              </p>
              <p className="mb-2">
                <strong>📝 Completa:</strong> Tus datos de entrega
              </p>
              <p>
                <strong>🎯 Confirma:</strong> Tu pedido será enviado al florista
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🌸 Catálogo de Flores</h1>
                  <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Productos en carrito: <span className="font-bold text-pink-600">{obtenerCantidadTotal()}</span>
            </span>
            {carrito.length > 0 && (
              <Link
                to="/sistemafloreria/carrito"
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                </svg>
                Ver Carrito (${calcularTotal().toFixed(2)})
              </Link>
            )}
          </div>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar flores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="md:w-64">
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Imagen del producto */}
            <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
              {producto.imagen ? (
                <img 
                  src={`https://grupo01tdam.pythonanywhere.com/assets/productos/${producto.imagen}`}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="h-24 w-24 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                </svg>
              )}
            </div>
            
            {/* Información del producto */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{producto.nombre}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {producto.descripcion || 'Sin descripción disponible'}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-pink-600">
                  ${producto.precio || 0}
                </span>
                <span className="text-sm text-gray-500">
                  Stock: {producto.inventario?.cantidad_actual ?? 0}
                </span>
              </div>
              
              <button
                onClick={() => agregarAlCarrito(producto)}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron productos</h3>
          <p className="mt-1 text-sm text-gray-500">
            Intenta ajustar los filtros de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
};

export default ComprasList; 