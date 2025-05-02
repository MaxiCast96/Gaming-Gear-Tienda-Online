import { useState } from 'react';
import logo from "../assets/logo.jpg"

export default function Signup() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup attempt with:', nombre, email, password, confirmPassword);
  };

  return (
    <div className="flex h-screen w-full bg-black">
      {/* Panel izquierdo */}
      <div className="w-2/5 flex flex-col items-center justify-center bg-black p-8 relative">
        {/* Logo */}
        <div className="mb-12">
          <img src={logo} alt="Gaming Clan Logo" className="w-24 h-24" />
        </div>

        {/* Signup Form */}
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Crear cuenta:</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-white text-sm mb-1">Nombre</label>
              <input 
                type="text" 
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-2 rounded bg-white" 
              />
            </div>
            
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
            
            <div>
              <label htmlFor="confirmPassword" className="block text-white text-sm mb-1">Repetir Contraseña:</label>
              <input 
                type="password" 
                id="confirmPassword" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded bg-white" 
              />
            </div>
            
            <div className="text-center mt-2">
              <button onClick={() => window.location.href = '/login'} className="text-red-500 text-sm hover:underline">
                ¿Ya tienes una cuenta? Inicia sesión
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
                onClick={() => window.location.href = '/login'}
                className="w-full p-2 bg-red-600 text-white rounded shadow-md hover:bg-red-700"
              >
                Crear Cuanta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel with Gaming Equipment Background */}
      <div className="w-3/5 bg-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900 bg-opacity-30">
          <div className="w-full h-full flex items-center justify-center">
            <img src="https://media.wired.com/photos/61f48f02d0e55ccbebd52d15/3:2/w_2400,h_1600,c_limit/Gear-Rant-Game-Family-Plans-1334436001.jpg" alt="Gaming Equipment" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}