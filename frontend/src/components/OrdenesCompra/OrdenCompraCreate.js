import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordenCompraService } from '../../services/ordenCompraService';
import { proveedoresService } from '../../services/proveedoresService';

const OrdenCompraCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numero: '',
    proveedorId: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente',
    total: '',
    observaciones: ''
  });
  const [proveedores, setProveedores] = useState([]);
  const [telefonoProveedor, setTelefonoProveedor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProveedores();
  }, []);

  useEffect(() => {
    // Actualizar el teléfono cuando cambia el proveedor seleccionado
    const proveedor = proveedores.find(p => String(p.id) === String(formData.proveedorId));
    setTelefonoProveedor(proveedor ? proveedor.telefono : '');
  }, [formData.proveedorId, proveedores]);

  const loadProveedores = async () => {
    try {
      const data = await proveedoresService.getAll();
      if (Array.isArray(data)) {
        setProveedores(data);
      } else {
        setError('Error al cargar los proveedores.');
      }
    } catch (err) {
      setError('Error al cargar los proveedores: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Construir el objeto con proveedor_id
      const dataToSend = {
        ...formData,
        proveedor_id: formData.proveedorId
      };
      delete dataToSend.proveedorId;
      await ordenCompraService.create(dataToSend);
      alert('Orden de compra creada exitosamente');
      navigate('/sistemafloreria/ordenes-compra');
    } catch (err) {
      setError('Error al crear la orden: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/sistemafloreria/ordenes-compra');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Crear Orden de Compra</h1>
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
                <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Orden *
                </label>
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="OC-001"
                />
              </div>

              <div>
                <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-2">
                  Total *
                </label>
                <input
                  type="number"
                  id="total"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="proveedorId" className="block text-sm font-medium text-gray-700 mb-2">
                  Proveedor *
                </label>
                <select
                  id="proveedorId"
                  name="proveedorId"
                  value={formData.proveedorId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Seleccionar proveedor</option>
                  {proveedores.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.id}>
                      {proveedor.empresa ? proveedor.empresa + ' - ' : ''}{proveedor.nombre}
                    </option>
                  ))}
                </select>
                {telefonoProveedor && (
                  <div className="mt-2 text-sm text-gray-600">
                    <strong>Teléfono:</strong> {telefonoProveedor}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha *
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Aprobada">Aprobada</option>
                  <option value="Rechazada">Rechazada</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Completada">Completada</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-2">
                Observaciones
              </label>
              <textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Observaciones adicionales sobre la orden..."
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
                    Creando...
                  </>
                ) : (
                  'Crear Orden'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrdenCompraCreate; 