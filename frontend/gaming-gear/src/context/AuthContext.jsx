import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Función para obtener token desde cookies
  const getTokenFromCookie = () => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='));
    
    return cookieValue ? cookieValue.split('=')[1] : null;
  };

  // Función para decodificar JWT manualmente (sin dependencias externas)
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al decodificar JWT:', error);
      return null;
    }
  };

  // Función para verificar si el token ha expirado
  const isTokenExpired = (decoded) => {
    if (!decoded.exp) return false;
    return Date.now() >= decoded.exp * 1000;
  };

  // Función para verificar token y establecer usuario
  const checkAuthStatus = () => {
    try {
      const token = getTokenFromCookie();
      
      if (token) {
        const decoded = decodeJWT(token);
        
        if (decoded && !isTokenExpired(decoded)) {
          console.log('Token decodificado:', decoded); // Para debugging
          setUser(decoded);
          setUserType(decoded.userType);
          setIsAuthenticated(true);
        } else {
          console.log('Token expirado o inválido');
          logout();
        }
      } else {
        console.log('No se encontró token');
        setUser(null);
        setUserType(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      setUser(null);
      setUserType(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Función para hacer login
  const login = (userData, token) => {
    try {
      console.log('Haciendo login con:', { userData, token }); // Para debugging
      
      // Guardar token en cookie
      const expires = new Date();
      expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 días
      document.cookie = `authToken=${token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
      
      // Verificar que el token se decodifique correctamente
      const decoded = decodeJWT(token);
      console.log('Usuario decodificado del token:', decoded); // Para debugging
      
      setUser(userData);
      setUserType(userData.userType);
      setIsAuthenticated(true);
      
      console.log('Estado después del login:', {
        user: userData,
        userType: userData.userType,
        isAuthenticated: true
      });
      
    } catch (error) {
      console.error('Error durante el login:', error);
    }
  };

  // Función para hacer logout
  const logout = () => {
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    console.log('Logout realizado');
  };

  // Verificar autenticación al cargar la app
  useEffect(() => {
    console.log('Verificando estado de autenticación...');
    checkAuthStatus();
  }, []);

  // Debug: Mostrar cambios en el estado
  useEffect(() => {
    console.log('Estado de autenticación actualizado:', {
      user,
      userType,
      isAuthenticated,
      loading
    });
  }, [user, userType, isAuthenticated, loading]);

  const value = {
    user,
    userType,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};