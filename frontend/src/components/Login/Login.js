import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [restoredMessage, setRestoredMessage] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.restoredMessage) {
      setRestoredMessage(location.state.restoredMessage);
      // Limpiar el mensaje después de 4 segundos
      const timer = setTimeout(() => setRestoredMessage(''), 4000);
      // Limpiar el state de la navegación para que no se muestre de nuevo
      navigate(location.pathname, { replace: true, state: {} });
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData);
      
      if (result.success) {
        navigate('/sistemafloreria/dashboard');
      } else {
        // Manejar errores específicos
        if (result.code === 'USER_INACTIVE') {
          setError('Tu cuenta está desactivada. Contacta al administrador para reactivar tu acceso.');
        } else {
          setError(result.error);
        }
      }
    } catch (error) {
      setError('Error de conexión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mitad izquierda: Imagen */}
      <div
        className="hidden md:block md:w-1/2 h-64 md:h-auto bg-cover bg-center"
        style={{
          backgroundImage: "url('/camsa_fondo.jpg')",
        }}
      ></div>
      {/* Mitad derecha: Login */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-lg mb-4">
              {/* Logo de CAMSA en círculo */}
              <img 
                src="/camsa_logo.jpg" 
                alt="CAMSA Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-extrabold text-blue-800 mb-1 tracking-tight">Login</h2>
            <p className="text-blue-500 text-sm">Inicia sesión para continuar</p>
          </div>
          {restoredMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center mb-4">
              {restoredMessage}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="correo" className="block text-blue-800 font-medium mb-1">Correo electrónico</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-blue-900 bg-white"
                    placeholder="ejemplo@correo.com"
                    value={formData.correo}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contraseña" className="block text-blue-800 font-medium mb-1">Contraseña</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2c0-1.104.896-2 2-2z" />
                    </svg>
                  </span>
                  <input
                    id="contraseña"
                    name="contraseña"
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-blue-900 bg-white"
                    placeholder="Tu contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {error && (
              <div className={`px-4 py-3 rounded text-center ${
                error.includes('desactivada') 
                  ? 'bg-orange-100 border border-orange-400 text-orange-700' 
                  : 'bg-red-100 border border-red-400 text-red-700'
              }`}>
                {error.includes('desactivada') && (
                  <svg className="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/recuperar-clave" className="text-blue-600 hover:underline text-sm font-medium">¿Olvidaste tu contraseña?</Link>
            <div className="mt-2">
              <Link to="/registrarse" className="text-blue-700 hover:underline text-sm font-semibold">¿No tienes cuenta? Regístrate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;