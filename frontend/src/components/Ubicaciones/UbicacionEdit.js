import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ubicacionesService } from '../../services/ubicacionesService';

const UbicacionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { loadUbicacion(); }, [id]);
  const loadUbicacion = async () => {
    try {
      setInitialLoading(true);
      const response = await ubicacionesService.getById(id);
      if (response.success) {
        const ubicacion = response.data;
        setFormData({ 
          nombre: ubicacion.nombre || '', 
          descripcion: ubicacion.descripcion || ''
        });
        setError(null);
      } else {
        setError(response.error || 'Error al cargar la ubicación');
      }
    } catch (err) {
      setError('Error al cargar la ubicación: ' + err.message);
    } finally {
      setInitialLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await ubicacionesService.update(id, formData);
      alert('Ubicación actualizada exitosamente');
      navigate('/sistemafloreria/ubicaciones');
    } catch (err) {
      setError('Error al actualizar la ubicación: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => navigate('/sistemafloreria/ubicaciones');
  if (initialLoading) return (<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div></div>);
  if (error && !formData.nombre) return (<div className="container mx-auto px-4 py-8"><div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div><button onClick={handleCancel} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Volver</button></div>);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Editar Ubicación</h1>
          <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 transition duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div className="mb-6">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={handleCancel} className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200">Cancelar</button>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">{loading ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Actualizando...</>) : ('Actualizar Ubicación')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UbicacionEdit; 