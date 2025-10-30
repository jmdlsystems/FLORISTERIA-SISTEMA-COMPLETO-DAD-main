import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RoleBasedRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // Todos los roles van al mismo dashboard, pero con diferentes opciones en el sidebar
      navigate('/sistema/dashboard');
    }
  }, [user, loading, navigate]);

  // Mostrar loading mientras se determina el rol
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Determinando tu rol...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, no mostrar nada (el AuthGuard se encargará)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  );
};

export default RoleBasedRedirect; 