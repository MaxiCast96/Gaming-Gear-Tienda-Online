import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.jpg";

export default function GamingLoginInterface() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState(1); // 1: email, 2: código, 3: nueva contraseña
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener la ruta desde donde vino el usuario (para redirección después del login)
  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🚀 INICIANDO LOGIN FRONTEND');
      console.log('📧 Email:', email);
      console.log('🔗 URL de la petición:', '/api/login');
      
      const response = await axios.post('/api/login', { email, password });
      
      console.log('📡 RESPUESTA COMPLETA DEL SERVIDOR:');
      console.log('- Status:', response.status);
      console.log('- Headers:', response.headers);
      console.log('- Data completa:', JSON.stringify(response.data, null, 2));
      
      // ✅ CORRECCIÓN: Usar response.data para acceder a los datos
      const responseData = response.data;
      console.log('📦 Datos extraídos:', responseData);
      
      const { success, message, userType, token, user } = responseData;
      
      console.log('🔍 DESTRUCTURING DE LA RESPUESTA:');
      console.log('- success:', success);
      console.log('- message:', message);
      console.log('- userType:', userType);
      console.log('- token presente:', !!token);
      console.log('- token length:', token ? token.length : 'N/A');
      console.log('- user presente:', !!user);
      console.log('- user data:', user);

      if (success) {
        console.log('✅ Login exitoso detectado');
        
        // ✅ CORRECCIÓN: Verificación más detallada
        if (!user) {
          console.error('🚨 ERROR: Usuario no presente en la respuesta');
          console.error('Response data completa:', responseData);
          setError('Error: Datos de usuario no recibidos del servidor');
          return;
        }
        
        if (!token) {
          console.error('🚨 ERROR: Token no presente en la respuesta');
          console.error('Response data completa:', responseData);
          setError('Error: Token de autenticación no recibido del servidor');
          return;
        }
        
        if (!user.nombre) {
          console.error('🚨 ERROR: Nombre de usuario no presente');
          console.error('User object:', user);
          setError('Error: Nombre de usuario no recibido del servidor');
          return;
        }
        
        console.log('📋 DATOS PARA CONTEXTO:');
        console.log('- user:', JSON.stringify(user, null, 2));
        console.log('- token:', token.substring(0, 50) + '...');
        
        // ✅ Usar el contexto para hacer login
        console.log('🔄 Llamando a login del contexto...');
        login(user, token);
        
        // ✅ Verificar que el contexto se actualizó
        console.log('⏱️ Esperando actualización del contexto...');
        
        // Pequeño delay para asegurar que el estado se actualice
        setTimeout(() => {
          console.log('🧭 Preparando redirección...');
          
          // Redirigir según tipo de usuario o a la ruta original
          if (from) {
            console.log('↩️ Redirigiendo a ruta original:', from);
            navigate(from, { replace: true });
          } else if (userType === 'employee') {
            console.log('👨‍💼 Redirigiendo a admin dashboard');
            navigate('/admin', { replace: true });
          } else if (userType === 'client') {
            console.log('👤 Redirigiendo a home para cliente');
            navigate('/', { replace: true });
          } else {
            console.log('❓ Tipo de usuario desconocido:', userType, 'redirigiendo a home');
            navigate('/', { replace: true });
          }
        }, 100);
        
      } else {
        console.log('❌ Login fallido:', message);
        setError(message);
      }
    } catch (err) {
      console.error('💥 ERROR DURANTE EL LOGIN:');
      console.error('- Error object:', err);
      console.error('- Error message:', err.message);
      console.error('- Response status:', err.response?.status);
      console.error('- Response data:', err.response?.data);
      console.error('- Response headers:', err.response?.headers);
      
      if (err.response?.data?.message) {
        console.log('📝 Usando mensaje de error del servidor:', err.response.data.message);
        setError(err.response.data.message);
      } else if (err.response?.status) {
        console.log('📊 Error HTTP status:', err.response.status);
        setError(`Error HTTP ${err.response.status}: ${err.response.statusText || 'Error desconocido'}`);
      } else {
        console.log('🌐 Error de conexión');
        setError('Error al conectar con el servidor.');
      }
    } finally {
      setLoading(false);
      console.log('🏁 LOGIN PROCESS FINISHED');
    }
  };

  // Función para solicitar recuperación de contraseña
  const handleRecoveryRequest = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    console.log('=== INICIO RECUPERACIÓN DE CONTRASEÑA ===');
    console.log('Email para recuperación:', recoveryEmail);

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correoElectronico: recoveryEmail
        })
      });

      console.log('Respuesta recuperación - Status:', response.status);
      
      const data = await response.json();
      console.log('Datos de recuperación:', data);

      if (data.success) {
        console.log('✅ Código de recuperación enviado');
        setSuccess('Código de recuperación enviado a tu correo');
        setRecoveryStep(2);
      } else {
        console.log('❌ Error en solicitud:', data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('💥 Error en recuperación:', err);
      setError('Error al enviar código de recuperación: ' + err.message);
    } finally {
      setLoading(false);
      console.log('=== FIN SOLICITUD RECUPERACIÓN ===');
    }
  };

  // Función para verificar código y cambiar contraseña
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    console.log('=== CAMBIO DE CONTRASEÑA ===');
    console.log('Email:', recoveryEmail);
    console.log('Código:', recoveryCode);

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correoElectronico: recoveryEmail,
          recoveryCode: recoveryCode,
          newPassword: newPassword
        })
      });

      console.log('Respuesta cambio - Status:', response.status);
      
      const data = await response.json();
      console.log('Datos de cambio:', data);

      if (data.success) {
        console.log('✅ Contraseña cambiada exitosamente');
        setSuccess('Contraseña cambiada exitosamente');
        setTimeout(() => {
          setShowRecovery(false);
          setRecoveryStep(1);
          setRecoveryEmail('');
          setRecoveryCode('');
          setNewPassword('');
          setConfirmPassword('');
          setError('');
          setSuccess('');
        }, 2000);
      } else {
        console.log('❌ Error en cambio:', data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('💥 Error en cambio de contraseña:', err);
      setError('Error al cambiar contraseña: ' + err.message);
    } finally {
      setLoading(false);
      console.log('=== FIN CAMBIO CONTRASEÑA ===');
    }
  };

  // Función para reenviar código de recuperación
  const resendRecoveryCode = async () => {
    setLoading(true);
    
    console.log('=== REENVÍO CÓDIGO RECUPERACIÓN ===');
    console.log('Email para reenvío:', recoveryEmail);
    
    try {
      const response = await fetch('/api/resend-recovery-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correoElectronico: recoveryEmail
        })
      });
      
      console.log('Respuesta reenvío - Status:', response.status);
      
      const data = await response.json();
      console.log('Datos de reenvío:', data);
      
      if (data.success) {
        console.log('✅ Código reenviado exitosamente');
        setSuccess('Código reenviado a tu correo');
      } else {
        console.log('❌ Error en reenvío:', data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('💥 Error en reenvío:', err);
      setError('Error al reenviar el código: ' + err.message);
    } finally {
      setLoading(false);
      console.log('=== FIN REENVÍO RECUPERACIÓN ===');
    }
  };

  if (showRecovery) {
    return (
      <div className="flex h-screen w-full bg-black">
        {/* Left Panel with Recovery Form */}
        <div className="w-2/5 flex flex-col items-center justify-center bg-black p-8">
          <img src={logo} alt="Gaming Clan Logo" className="w-24 h-24 mb-8" />
          
          {recoveryStep === 1 && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Recuperar Contraseña</h2>
              <div className="w-full max-w-md">
                <p className="text-white text-sm mb-4">
                  Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña.
                </p>
                
                <form onSubmit={handleRecoveryRequest} className="space-y-4">
                  <div>
                    <label htmlFor="recoveryEmail" className="block text-white text-sm mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="recoveryEmail"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full p-2 rounded bg-white text-black"
                      placeholder="ejemplo@correo.com"
                      required
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  {success && <p className="text-green-500 text-sm">{success}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-2 bg-red-600 text-white rounded shadow-md hover:bg-red-700 disabled:opacity-50"
                  >
                    {loading ? 'Enviando...' : 'Enviar Código'}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => setShowRecovery(false)}
                    className="text-white text-sm hover:underline"
                  >
                    Volver al inicio de sesión
                  </button>
                </div>
              </div>
            </>
          )}

          {recoveryStep === 2 && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Cambiar Contraseña</h2>
              <div className="w-full max-w-md">
                <p className="text-white text-sm mb-4">
                  Hemos enviado un código a: <br />
                  <span className="font-semibold">{recoveryEmail}</span>
                </p>
                
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div>
                    <label htmlFor="recoveryCodeInput" className="block text-white text-sm mb-1">
                      Código de Recuperación
                    </label>
                    <input
                      type="text"
                      id="recoveryCodeInput"
                      value={recoveryCode}
                      onChange={(e) => setRecoveryCode(e.target.value)}
                      className="w-full p-2 rounded bg-white text-black text-center text-lg tracking-widest"
                      placeholder="000000"
                      maxLength="6"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-white text-sm mb-1">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 rounded bg-white text-black"
                      placeholder="Ingresa tu nueva contraseña"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-white text-sm mb-1">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2 rounded bg-white text-black"
                      placeholder="Confirma tu nueva contraseña"
                      required
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  {success && <p className="text-green-500 text-sm">{success}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-2 bg-red-600 text-white rounded shadow-md hover:bg-red-700 disabled:opacity-50"
                  >
                    {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                  </button>
                </form>

                <div className="text-center mt-4 space-y-2">
                  <button
                    type="button"
                    onClick={resendRecoveryCode}
                    disabled={loading}
                    className="text-red-500 text-sm hover:underline disabled:opacity-50"
                  >
                    Reenviar código
                  </button>
                  <br />
                  <button
                    type="button"
                    onClick={() => setRecoveryStep(1)}
                    className="text-white text-sm hover:underline"
                  >
                    Cambiar correo electrónico
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Panel with Gaming Equipment Background */}
        <div className="w-3/5 bg-purple-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-900 bg-opacity-30">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="https://saportareport.com/wp-content/uploads/2025/01/pexels-lulizler-3165335-1.jpg"
                alt="Gaming Equipment"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-black">
      {/* Left Panel with Login Form */}
      <div className="w-2/5 flex flex-col items-center justify-center bg-black p-8 relative">
        {/* Logo */}
        <div className="mb-12">
          <img src={logo} alt="Gaming Clan Logo" className="w-24 h-24" />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Iniciar Sesión:</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white text-sm mb-1">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 rounded bg-white text-black"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white text-sm mb-1">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 rounded bg-white text-black"
                placeholder="Tu contraseña"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="text-center mt-2">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-red-500 text-sm hover:underline"
              >
                ¿No tienes una cuenta? ¡Crea una!
              </button>
            </div>

            {/* Botón de recuperación de contraseña */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowRecovery(true)}
                className="text-red-500 text-sm hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 bg-red-600 text-white rounded shadow-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel with Gaming Equipment Background */}
      <div className="w-3/5 bg-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900 bg-opacity-30">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="https://saportareport.com/wp-content/uploads/2025/01/pexels-lulizler-3165335-1.jpg"
              alt="Gaming Equipment"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}