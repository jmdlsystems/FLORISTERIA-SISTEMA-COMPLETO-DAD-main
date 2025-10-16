import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AccessDenied from '../AccessDenied/AccessDenied';

const RoleGuard = ({ allowedRoles, children, fallbackPath = '/sistemafloreria' }) => {
  const { user, loading } = useAuth();

  // Si está cargando, mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si el usuario tiene el rol permitido
  const userRole = user.rol?.nombre || user.rol_nombre;
  const hasPermission = allowedRoles.includes(userRole);

  if (!hasPermission) {
    // Mostrar página de acceso denegado
    return (
      <AccessDenied 
        requiredRole={allowedRoles.join(' o ')}
        currentRole={userRole}
      />
    );
  }

  return children;
};

export default RoleGuard; 