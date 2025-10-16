import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const RecuperarClave = () => {
  const [correo, setCorreo] = useState('');
  const [nuevaClave, setNuevaClave] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/restore', { correo, nueva_contraseña: nuevaClave });
      if (res.data && res.data.success) {
        navigate('/login', {
          state: {
            restoredMessage: 'Contraseña restaurada correctamente. Ya puedes iniciar sesión con tu nueva clave.'
          }
        });
      } else {
        setError(res.data.error || 'No se pudo restaurar la contraseña.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: "url('/fondo.jpg')" }}></div>
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center shadow-lg mb-4">
              <svg className="h-12 w-12 text-blue-200" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                <circle cx="24" cy="24" r="6" fill="#3b82f6" />
                <path d="M24 6v6M24 36v6M6 24h6M36 24h6M12.22 12.22l4.24 4.24M31.54 31.54l4.24 4.24M12.22 35.78l4.24-4.24M31.54 16.46l4.24-4.24" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-blue-800 mb-1 tracking-tight">Restaurar contraseña</h2>
            <p className="text-blue-500 text-sm">Ingresa tu correo y una nueva contraseña</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="correo" className="block text-blue-800 font-medium mb-1">Correo electrónico</label>
              <input
                id="correo"
                name="correo"
                type="email"
                required
                className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-blue-900 bg-white"
                placeholder="ejemplo@correo.com"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="nuevaClave" className="block text-blue-800 font-medium mb-1">Nueva contraseña</label>
              <input
                id="nuevaClave"
                name="nuevaClave"
                type="password"
                required
                className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-blue-900 bg-white"
                placeholder="Nueva contraseña"
                value={nuevaClave}
                onChange={e => setNuevaClave(e.target.value)}
              />
            </div>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Restaurando...' : 'Restaurar contraseña'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecuperarClave; 