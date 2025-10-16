import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const Registrarse = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: '',
    nombre: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', formData);
      setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-green-400 to-green-600 flex items-center justify-center shadow-lg mb-4">
            <svg className="h-12 w-12 text-green-200" fill="none" viewBox="0 0 48 48" stroke="currentColor">
              <circle cx="24" cy="24" r="6" fill="#22c55e" />
              <path d="M24 6v6M24 36v6M6 24h6M36 24h6M12.22 12.22l4.24 4.24M31.54 31.54l4.24 4.24M12.22 35.78l4.24-4.24M31.54 16.46l4.24-4.24" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-green-800 mb-1 tracking-tight">Crear cuenta</h2>
          <p className="text-green-500 text-sm">Regístrate para acceder al sistema</p>
        </div>
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center mb-4">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-green-800 font-medium mb-1">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                className="block w-full px-3 py-2 border border-green-200 rounded-lg shadow-sm placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-green-900 bg-white"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="correo" className="block text-green-800 font-medium mb-1">Correo electrónico</label>
              <input
                id="correo"
                name="correo"
                type="email"
                required
                className="block w-full px-3 py-2 border border-green-200 rounded-lg shadow-sm placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-green-900 bg-white"
                placeholder="ejemplo@correo.com"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="contraseña" className="block text-green-800 font-medium mb-1">Contraseña</label>
              <input
                id="contraseña"
                name="contraseña"
                type="password"
                required
                className="block w-full px-3 py-2 border border-green-200 rounded-lg shadow-sm placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-green-900 bg-white"
                placeholder="Crea una contraseña"
                value={formData.contraseña}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg shadow-md hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-green-700 hover:underline text-sm font-semibold">¿Ya tienes cuenta? Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Registrarse; 