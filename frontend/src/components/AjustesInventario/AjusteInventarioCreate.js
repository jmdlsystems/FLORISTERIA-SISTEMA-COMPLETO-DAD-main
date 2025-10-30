import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ajusteInventarioService } from '../../services/ajusteInventarioService';
import { productosService } from '../../services/productosService';
import { useAuth } from '../../contexts/AuthContext';

const AjusteInventarioCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    producto_id: '',
    cantidad_ajustada: '',
    motivo: '',
    fecha: new Date().toISOString().split('T')[0]
  });
  const [tipo, setTipo] = useState('Incremento');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProductos();
    // Si hay un producto_id en la URL, preseleccionarlo
    const urlParams = new URLSearchParams(location.search);
    const productoId = urlParams.get('producto_id');
    if (productoId) {
      setFormData(prev => ({ ...prev, producto_id: productoId }));
    }
  }, [location.search]);

  const loadProductos = async () => {
    try {
      const data = await productosService.getAll();
      setProductos(data.data || []);
    } catch (err) {
      setError('Error al cargar los productos: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validaciones
    if (!formData.producto_id) {
      setError('Debe seleccionar un producto');
      setLoading(false);
      return;
    }
    
    if (!formData.cantidad_ajustada || Number(formData.cantidad_ajustada) <= 0) {
      setError('La cantidad debe ser mayor a 0');
      setLoading(false);
      return;
    }

    let cantidad = Number(formData.cantidad_ajustada);
    if (tipo === 'Decremento') cantidad = -Math.abs(cantidad);
    else cantidad = Math.abs(cantidad);
    
    const payload = {
      ...formData,
      cantidad_ajustada: cantidad,
      usuario_id: user?.id
    };
    
    try {
      const res = await ajusteInventarioService.create(payload);
      if (res.success) {
        alert('✅ Ajuste de inventario creado exitosamente\n\n📊 El inventario se ha actualizado automáticamente\n📝 Se ha registrado el movimiento para auditoría');
        navigate('/sistema/ajustes-inventario');
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError('Error al crear el ajuste: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/sistema/ajustes-inventario');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
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
                Sistema de Auditoría en Tiempo Real
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p className="mb-1">✅ Al crear este ajuste se actualizará automáticamente el inventario</p>
                <p className="mb-1">✅ Se registrará un movimiento para auditoría completa</p>
                <p>✅ El ajuste no se podrá editar ni eliminar para mantener la integridad</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Crear Ajuste de Inventario</h1>
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-800 transition duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="producto_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Producto *
                </label>
                <select
                  id="producto_id"
                  name="producto_id"
                  value={formData.producto_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Seleccionar producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Ajuste *
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={tipo}
                  onChange={handleTipoChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Incremento">➕ Incremento</option>
                  <option value="Decremento">➖ Decremento</option>
                </select>
              </div>
              <div>
                <label htmlFor="cantidad_ajustada" className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad *
                </label>
                <input
                  type="number"
                  id="cantidad_ajustada"
                  name="cantidad_ajustada"
                  value={formData.cantidad_ajustada}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="motivo" className="block text-sm font-medium text-gray-700 mb-2">
                Motivo *
              </label>
              <textarea
                id="motivo"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                rows="3"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describa el motivo del ajuste (ej: pérdida por deterioro, corrección de inventario, etc.)"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  'Crear Ajuste'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjusteInventarioCreate; 