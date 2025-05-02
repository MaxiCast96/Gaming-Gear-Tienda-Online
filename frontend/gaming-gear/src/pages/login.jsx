import { useState } from 'react';
import logo from "../assets/logo.jpg"

export default function GamingLoginInterface() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic would go here
    console.log('Login attempt with:', email, password);
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
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white text-sm mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-white" 
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-white text-sm mb-1">Contraseña:</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-white" 
              />
            </div>
            
            <div className="text-center mt-2">
              <button onClick={() => window.location.href = '/signup'} className="text-red-500 text-sm hover:underline">
                ¿No tienes una cuenta? Crea una!
              </button>
            </div>
            
            <div className="mt-4">
              <button 
                type="button"
                className="flex items-center justify-center w-full p-2 bg-white rounded shadow-md"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" alt="Google icon" className="w-5 h-5 mr-2" />
               <p className="text-black">Continuar con Google</p> 
              </button>
            </div>
            
            <div className="mt-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full p-2 bg-red-600 text-white rounded shadow-md hover:bg-red-700"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel with Gaming Equipment Background */}
      <div className="w-3/5 bg-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900 bg-opacity-30">
          <div className="w-full h-full flex items-center justify-center">
            <img src="https://saportareport.com/wp-content/uploads/2025/01/pexels-lulizler-3165335-1.jpg" alt="Gaming Equipment" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}