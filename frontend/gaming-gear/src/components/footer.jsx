import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone } from 'lucide-react';
import logo from "../assets/logo.jpg"

const Footer = () => {
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
            <li>
              <Link to="/" className="hover:text-gray-300">• Home</Link>    
            </li>
            <li>
            <Link to="/news" className="hover:text-gray-300">• News</Link>
            </li>
            <li>
            <Link to="/categories" className="hover:text-gray-300">• Categories</Link>
            </li>
            <li>
            <Link to="/about-us" className="hover:text-gray-300">• About Us</Link>
            </li>
            <li>
              <Link to="/terminos" className="hover:text-gray-300">• Términos y condiciones</Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contacto y Redes Sociales */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-xl mb-4">Contáctanos</h3>
          <div className="flex items-center justify-center md:justify-start mb-8">
            <Phone size={20} className="mr-2" />
            <span>77774444</span>
          </div>
          
          <h3 className="font-bold text-lg mb-4">Síguenos:</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Instagram size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;