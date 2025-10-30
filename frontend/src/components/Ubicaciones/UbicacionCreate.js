import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ubicacionesService } from '../../services/ubicacionesService';

const UbicacionCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await ubicacionesService.create(formData);
      alert('Ubicación creada exitosamente');
      navigate('/sistema/ubicaciones');
    } catch (err) {
      setError('Error al crear la ubicación: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate('/sistema/ubicaciones');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Crear Ubicación</h1>
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
              <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">{loading ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Creando...</>) : ('Crear Ubicación')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UbicacionCreate; 