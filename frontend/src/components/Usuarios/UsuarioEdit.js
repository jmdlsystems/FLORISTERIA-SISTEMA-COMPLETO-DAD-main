import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usuariosService } from '../../services/usuariosService';
import { rolesService } from '../../services/rolesService';

const UsuarioEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rol_id: '',
    activo: true
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  // Efecto para debuggear cuando cambia formData
  useEffect(() => {
    console.log('formData actualizado:', formData);
  }, [formData]);

  const loadData = async () => {
    try {
      setInitialLoading(true);
      
      // Cargar roles
      const rolesRes = await rolesService.getAll();
      if (rolesRes.success) {
        setRoles(rolesRes.data || []);
      }

      // Cargar usuario
      const userRes = await usuariosService.getById(id);
      
      if (userRes.success) {
        setFormData({
          nombre: userRes.data.nombre || '',
          correo: userRes.data.correo || '',
          rol_id: userRes.data.rol_id ? userRes.data.rol_id.toString() : '',
          activo: userRes.data.activo !== undefined ? userRes.data.activo : true,
          contraseña: ''
        });
      }
      
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos: ' + err.message);
    } finally {
      setInitialLoading(false);
  }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
    const payload = {
        ...formData,
        rol_id: Number(formData.rol_id),
        activo: Boolean(formData.activo)
      };
      
      // Solo incluir contraseña si se proporcionó una nueva
      if (!payload.contraseña) {
        delete payload.contraseña;
      }
      
    const res = await usuariosService.update(id, payload);
      
    if (res.success) {
        alert('Usuario actualizado exitosamente');
      navigate('/sistema/usuarios');
    } else {
        setError(res.error || 'Error al actualizar el usuario');
      }
    } catch (err) {
      setError('Error al actualizar el usuario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/sistema/usuarios');
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error && !formData.nombre) {
  return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={handleCancel}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Editar Usuario</h1>
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
            <div className="mb-6">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Usuario *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ej: Juan Pérez, María García, etc."
              />
            </div>

            <div className="mb-6">
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="usuario@ejemplo.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-2">
                Nueva Contraseña
              </label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Deja vacío para mantener la contraseña actual"
                autoComplete="new-password"
              />
              <p className="mt-1 text-sm text-gray-500">
                Deja este campo vacío si no quieres cambiar la contraseña
              </p>
        </div>

            <div className="mb-6">
              <label htmlFor="rol_id" className="block text-sm font-medium text-gray-700 mb-2">
                Rol *
              </label>
              <select
                id="rol_id"
                name="rol_id"
                value={formData.rol_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">{formData.rol_id ? 'Selecciona un rol' : 'Cargando...'}</option>
                {roles.filter(rol => rol.activo || rol.id.toString() === formData.rol_id).map(rol => (
                  <option key={rol.id} value={rol.id.toString()}>{rol.nombre}</option>
            ))}
          </select>
              <p className="mt-1 text-sm text-gray-500">
                Rol actual: {formData.rol_id ? roles.find(r => r.id.toString() === formData.rol_id)?.nombre || 'No encontrado' : 'No asignado'}
                {formData.rol_id && roles.find(r => r.id.toString() === formData.rol_id)?.activo === false && ' (INACTIVO)'}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Solo se muestran roles activos para nuevas asignaciones
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="activo"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="activo" className="ml-2 block text-sm text-gray-700">
                  Usuario Activo
                </label>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Los usuarios inactivos no pueden iniciar sesión
              </p>
            </div>

            <div className="flex justify-end space-x-4">
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
                    Actualizando...
                  </>
                ) : (
                  'Actualizar Usuario'
                )}
              </button>
            </div>
          </form>
        </div>
        </div>
    </div>
  );
};

export default UsuarioEdit; 