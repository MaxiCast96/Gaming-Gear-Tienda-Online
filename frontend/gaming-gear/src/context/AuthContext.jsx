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

  const getTokenFromCookie = () => {
    console.log('🍪 Buscando token en cookies...');
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='));
    
    const token = cookieValue ? cookieValue.split('=')[1] : null;
    console.log('🔍 Token encontrado:', token ? 'SÍ' : 'NO');
    return token;
  };

  const decodeJWT = (token) => {
    try {
      console.log('🔓 Decodificando JWT...');
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      console.log('✅ JWT decodificado:', decoded);
      return decoded;
    } catch (error) {
      console.error('❌ Error al decodificar JWT:', error);
      return null;
    }
  };

  const isTokenExpired = (decoded) => {
    if (!decoded.exp) {
      console.log('⚠️ Token sin fecha de expiración');
      return false;
    }
    const isExpired = Date.now() >= decoded.exp * 1000;
    console.log('⏰ Token expirado:', isExpired);
    return isExpired;
  };

  const checkAuthStatus = () => {
    console.log('🔄 Verificando estado de autenticación...');
    try {
      const token = getTokenFromCookie();
      
      if (token) {
        console.log('🔑 Token encontrado, decodificando...');
        const decoded = decodeJWT(token);
        
        if (decoded && !isTokenExpired(decoded)) {
          console.log('✅ Token válido, datos decodificados:', decoded);
          
          // ✅ CORRECCIÓN: Crear objeto de usuario con TODOS los datos del token
          const userData = {
            id: decoded.id,
            nombre: decoded.nombre, // ✅ Ahora incluimos el nombre del token
            name: decoded.nombre, // Alias para compatibilidad
            email: decoded.email,
            correoElectronico: decoded.email, // Alias para compatibilidad
            userType: decoded.userType
          };
          
          console.log('👤 Usuario establecido desde token:', userData);
          console.log('🔍 Verificando nombre:', userData.nombre);
          
          setUser(userData);
          setUserType(decoded.userType);
          setIsAuthenticated(true);
          
        } else {
          console.log('❌ Token expirado o inválido');
          logout();
        }
      } else {
        console.log('🚫 No se encontró token');
        setUser(null);
        setUserType(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('💥 Error al verificar autenticación:', error);
      setUser(null);
      setUserType(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
      console.log('✅ Verificación de auth completada');
    }
  };

  const login = (userData, token) => {
    try {
      console.log('🔑 INICIANDO LOGIN EN CONTEXTO');
      console.log('📦 Datos recibidos:');
      console.log('- userData:', JSON.stringify(userData, null, 2));
      console.log('- token presente:', !!token);
      console.log('- token length:', token ? token.length : 'N/A');
      
      // ✅ CORRECCIÓN: Validar que los datos necesarios estén presentes
      if (!userData || !token) {
        console.error('🚨 ERROR: Datos insuficientes para login');
        console.error('- userData:', userData);
        console.error('- token:', !!token);
        return;
      }
      
      if (!userData.nombre) {
        console.error('🚨 ERROR: Nombre faltante en userData');
        console.error('- userData completo:', userData);
        return;
      }
      
      console.log('💾 Guardando token en cookie...');
      // Guardar token en cookie
      const expires = new Date();
      expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
      document.cookie = `authToken=${token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
      console.log('✅ Cookie guardada');
      
      // ✅ CORRECCIÓN: Asegurar que todos los campos estén presentes
      const userDataWithAliases = {
        id: userData.id,
        nombre: userData.nombre, // ✅ Asegurar que nombre esté presente
        name: userData.nombre || userData.name, // Alias con fallback
        email: userData.email,
        correoElectronico: userData.email || userData.correoElectronico, // Alias con fallback
        userType: userData.userType
      };
      
      console.log('👤 Datos finales del usuario:', userDataWithAliases);
      console.log('🔍 Verificando nombre final:', userDataWithAliases.nombre);
      
      // Establecer datos del usuario
      setUser(userDataWithAliases);
      setUserType(userData.userType);
      setIsAuthenticated(true);
      
      console.log('✅ Login exitoso en contexto, estado actualizado');
      
    } catch (error) {
      console.error('💥 Error durante el login en contexto:', error);
    }
  };

  const logout = () => {
    console.log('🚪 Realizando logout...');
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    console.log('✅ Logout completado');
  };

  useEffect(() => {
    console.log('🏁 Iniciando verificación de autenticación inicial...');
    checkAuthStatus();
  }, []);

  // Debug: Mostrar estado actual del usuario
  useEffect(() => {
    console.log('📊 === ESTADO DEL AUTH CONTEXT ===');
    console.log('👤 user:', user);
    console.log('🏷️ userType:', userType);
    console.log('🔐 isAuthenticated:', isAuthenticated);
    console.log('⏳ loading:', loading);
    if (user) {
      console.log('📋 Detalles del usuario:');
      console.log('   - id:', user.id);
      console.log('   - nombre:', user.nombre);
      console.log('   - email:', user.email);
      console.log('   - userType:', user.userType);
    }
    console.log('================================');
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