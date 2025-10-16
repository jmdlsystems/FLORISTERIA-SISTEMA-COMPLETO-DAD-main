import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { inventarioService } from '../../services/inventarioService';
import { productosService } from '../../services/productosService';
import { ubicacionesService } from '../../services/ubicacionesService';

const InventarioEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    producto_id: '',
    ubicacion_id: '',
    cantidad_actual: 0,
    cantidad_minima: 0
  });
  const [productos, setProductos] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  // Efecto para actualizar el estado cuando cambien las cantidades
  useEffect(() => {
    // El estado se actualiza automáticamente cuando cambian formData.cantidad_actual o formData.cantidad_minima
  }, [formData.cantidad_actual, formData.cantidad_minima]);

  const loadData = async () => {
    try {
      const [inventarioRes, productosRes, ubicacionesRes] = await Promise.all([
        inventarioService.getById(id),
        productosService.getAll(),
        ubicacionesService.getAll()
      ]);

      if (inventarioRes.success && inventarioRes.data) {
        setFormData({
          producto_id: inventarioRes.data.producto_id || '',
          ubicacion_id: inventarioRes.data.ubicacion_id || '',
          cantidad_actual: inventarioRes.data.cantidad_actual || 0,
          cantidad_minima: inventarioRes.data.cantidad_minima || 0
        });
      }

      if (productosRes.success) {
        setProductos(productosRes.data || []);
      }
      if (ubicacionesRes.success) {
        setUbicaciones(ubicacionesRes.data || []);
      }
    } catch (err) {
      setError('Error al cargar los datos: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para determinar el estado del inventario
  const getEstadoInventario = (cantidadActual, cantidadMinima) => {
    if (cantidadActual <= 0) {
      return { estado: 'Sin Stock', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' };
    } else if (cantidadActual <= cantidadMinima * 0.5) {
      return { estado: 'Crítico', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' };
    } else if (cantidadActual <= cantidadMinima) {
      return { estado: 'Bajo Stock', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800' };
    } else if (cantidadActual <= cantidadMinima * 1.5) {
      return { estado: 'Stock Moderado', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
    } else {
      return { estado: 'Disponible', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' };
    }
  };

  const estadoActual = getEstadoInventario(formData.cantidad_actual, formData.cantidad_minima);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await inventarioService.update(id, formData);
      if (res.success) {
        alert('Registro de inventario actualizado exitosamente');
        navigate('/sistemafloreria/inventario');
      } else {
        setError(res.error || 'Error al actualizar el registro de inventario');
      }
    } catch (err) {
      setError('Error al actualizar el registro de inventario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Información del Sistema */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Entidad Principal del Sistema
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p className="mb-2">
                <strong>📊 Inventario:</strong> Entidad principal - Guarda productos y cantidades
              </p>
              <p className="mb-2">
                <strong>➕ Ajustes de Inventario:</strong> Se registran automáticamente para auditoría
              </p>
              <p>
                <strong>📝 Movimientos:</strong> Se registran automáticamente para auditoría
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Actualizar Registro de Inventario</h1>
        <button
          onClick={() => navigate('/sistemafloreria/inventario')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Volver
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          {/* Sección de Rangos de Cantidades */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Guía de Rangos de Cantidades
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Sin Stock:</span>
                  <span className="text-sm text-gray-600 ml-2">Cantidad = 0</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Crítico:</span>
                  <span className="text-sm text-gray-600 ml-2">Cantidad &le; (Mínima &times; 0.5)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Bajo Stock:</span>
                  <span className="text-sm text-gray-600 ml-2">(Mínima &times; 0.5) &lt; Cantidad &le; Mínima</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Stock Moderado:</span>
                  <span className="text-sm text-gray-600 ml-2">Mínima &lt; Cantidad &le; (Mínima &times; 1.5)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Disponible:</span>
                  <span className="text-sm text-gray-600 ml-2">Cantidad &gt; (Mínima &times; 1.5)</span>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Estado Actual:</h4>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${estadoActual.bgColor} ${estadoActual.textColor}`}>
                  <div className={`w-2 h-2 bg-${estadoActual.color}-500 rounded-full mr-2`}></div>
                  {estadoActual.estado}
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <p>Cantidad Actual: <strong>{formData.cantidad_actual}</strong></p>
                  <p>Cantidad Mínima: <strong>{formData.cantidad_minima}</strong></p>
                  {formData.cantidad_minima > 0 && (
                    <p>Límite Moderado: <strong>{formData.cantidad_minima * 1.5}</strong></p>
                  )}
                </div>
                {/* Recomendaciones */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <h5 className="text-xs font-semibold text-gray-700 mb-1">Recomendación:</h5>
                  <p className="text-xs text-gray-600">
                    {estadoActual.estado === 'Sin Stock' && '⚠️ Necesitas reabastecer inmediatamente'}
                    {estadoActual.estado === 'Crítico' && '⚠️ Stock crítico, necesita reabastecimiento urgente'}
                    {estadoActual.estado === 'Bajo Stock' && '⚠️ Considera hacer un pedido pronto'}
                    {estadoActual.estado === 'Stock Moderado' && '📊 Stock en nivel aceptable'}
                    {estadoActual.estado === 'Disponible' && '✅ Stock suficiente para operaciones normales'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Producto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Producto *
              </label>
              <select
                name="producto_id"
                value={formData.producto_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar producto</option>
                {productos.map(producto => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación *
              </label>
              <select
                name="ubicacion_id"
                value={formData.ubicacion_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar ubicación</option>
                {ubicaciones.map(ubicacion => (
                  <option key={ubicacion.id} value={ubicacion.id}>
                    {ubicacion.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Cantidad Actual */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad Actual *
              </label>
              <input
                type="number"
                name="cantidad_actual"
                value={formData.cantidad_actual}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Cantidad Mínima */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad Mínima
              </label>
              <input
                type="number"
                name="cantidad_minima"
                value={formData.cantidad_minima}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/sistemafloreria/inventario')}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition duration-200"
            >
              {loading ? 'Actualizando...' : 'Actualizar Registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventarioEdit; 