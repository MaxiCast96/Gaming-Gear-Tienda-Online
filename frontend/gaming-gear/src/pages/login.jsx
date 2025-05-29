import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.jpg";

export default function GamingLoginInterface() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
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
      console.log('Intentando login con:', { email }); // Para debugging
      
      const response = await axios.post('https://gaming-gear-tienda-online.onrender.com/api/login', { email, password });
      console.log('Respuesta del servidor:', response.data); // Para debugging
      
      const { success, message, userType, token, user } = response.data;

      if (success) {
        console.log('Login exitoso, datos recibidos:', { user, userType, token }); // Para debugging
        
        // Usar el contexto para hacer login
        login({ ...user, userType }, token);
        
        // Pequeño delay para asegurar que el estado se actualice
        setTimeout(() => {
          // Redirigir según tipo de usuario o a la ruta original
          if (from) {
            console.log('Redirigiendo a ruta original:', from);
            navigate(from, { replace: true });
          } else if (userType === 'employee') {
            console.log('Redirigiendo a admin dashboard');
            navigate('/admin', { replace: true });
          } else if (userType === 'customer') {
            console.log('Redirigiendo a home');
            navigate('/', { replace: true });
          } else {
            console.log('Tipo de usuario desconocido, redirigiendo a home');
            navigate('/', { replace: true });
          }
        }, 100);
        
      } else {
        console.log('Login fallido:', message);
        setError(message);
      }
    } catch (err) {
      console.error('Error durante el login:', err);
      console.error('Respuesta del error:', err.response?.data);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al conectar con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

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

            <div className="mt-4">
              <button
                type="button"
                className="flex items-center justify-center w-full p-2 bg-white rounded shadow-md hover:bg-gray-100 transition-colors"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
                  alt="Google icon"
                  className="w-5 h-5 mr-2"
                />
                <p className="text-black">Continuar con Google</p>
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