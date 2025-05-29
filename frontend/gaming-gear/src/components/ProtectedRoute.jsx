import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { isAuthenticated, userType, loading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  // Si se requiere autenticación pero no está autenticado
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si se especifican roles permitidos y el usuario no tiene el rol correcto
  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    // Redirigir según el tipo de usuario
    if (userType === 'employee') {
      return <Navigate to="/admin" replace />;
    } else if (userType === 'client') {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;