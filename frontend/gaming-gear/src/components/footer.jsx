import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Instagram, Facebook, Phone, Heart, ShoppingCart, LogIn, LogOut } from 'lucide-react';
import logo from "../assets/logo.jpg";
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { isAuthenticated, userType, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Páginas donde no se debe mostrar el footer
  const authPages = ['/login', '/signup'];

  // No mostrar footer para empleados
  if (userType === 'employee') return null;
  
  // Si estamos en páginas de autenticación, no mostrar el footer
  if (authPages.includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <footer className="bg-black text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1: Logo y métodos de pago */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4">
            <img 
              src={logo} 
              alt="Gaming Gear Logo" 
              className="h-16 w-16" 
            />
            <h3 className="font-bold text-lg mt-2">GAMING GEAR</h3>
          </div>
          {/* Métodos de pago */}
          <div className="mt-4 flex flex-col space-y-4">
            <img 
              src="https://help.zazzle.com/hc/article_attachments/360010513393" 
              alt="Payment Methods" 
              className="h-10" 
            />
          </div>
        </div>

        {/* Columna 2: Políticas y Privacidad */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-xl mb-4">Políticas y Privacidad</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-300">• Home</Link></li>
            <li><Link to="/news" className="hover:text-gray-300">• News</Link></li>
            <li><Link to="/categories" className="hover:text-gray-300">• Categories</Link></li>
            <li><Link to="/about-us" className="hover:text-gray-300">• About Us</Link></li>
            <li><Link to="/terminos" className="hover:text-gray-300">• Términos y condiciones</Link></li>
          </ul>
        </div>

        {/* Columna 3: Contacto, Redes y Usuario */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-xl mb-4">Contáctanos</h3>
          <div className="flex items-center justify-center md:justify-start mb-4">
            <Phone size={20} className="mr-2" />
            <span>77774444</span>
          </div>

          {/* Enlaces de usuario */}
          <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
            {isAuthenticated && (
              <>
                <Link to="/favorites" className="hover:text-gray-300">
                  <Heart size={24} />
                </Link>
                <Link to="/cart" className="hover:text-gray-300">
                  <ShoppingCart size={24} />
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <button 
                onClick={handleLogout} 
                className="hover:text-gray-300 flex items-center"
                title="Cerrar Sesión"
              >
                <LogOut size={24} />
                <span className="ml-2">Cerrar</span>
              </button>
            ) : (
              <Link to="/login" className="hover:text-gray-300 flex items-center">
                <LogIn size={24} />
                <span className="ml-2">Iniciar Sesión</span>
              </Link>
            )}
          </div>

          <h3 className="font-bold text-lg mb-2">Síguenos:</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Instagram size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Facebook size={24} />
            </a>
            {/* Puedes añadir más iconos aquí */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;