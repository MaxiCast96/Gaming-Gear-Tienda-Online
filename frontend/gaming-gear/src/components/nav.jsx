import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu } from 'lucide-react';
import logo from "../assets/logo.jpg"

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de búsqueda aquí
    console.log('Buscando:', searchTerm);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='w-full'>
    <nav className="bg-black text-white p-4 w-full">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo y Título */}
        <div className="flex items-center">
          <img 
            src={logo}
            alt="Gaming Gear Logo" 
            className="h-12 w-12 sm:h-16 sm:w-16 mr-2" 
          />
          <span className="text-lg sm:text-xl font-bold">GAMING GEAR</span>
        </div>
        
        {/* Botón de menú móvil */}
        <div className="flex md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Enlaces de Navegación - Escritorio */}
        <div className="hidden md:flex space-x-4 lg:space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/news" className="hover:text-gray-300">News</Link>
          <Link to="/categories" className="hover:text-gray-300">Categories</Link>
          <Link to="/about-us" className="hover:text-gray-300">About Us</Link>
        </div>
        
        {/* Búsqueda e Iconos - Escritorio */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-800 text-white px-3 py-1 rounded-md w-28 lg:w-48"
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Search size={16} />
            </button>
          </form>
          
          <Link to="/favorites" className="hover:text-gray-300">
            <Heart size={20} />
          </Link>
          
          <Link to="/cart" className="hover:text-gray-300">
            <ShoppingCart size={20} />
          </Link>
          
          <Link to="/account" className="hover:text-gray-300">
            <div className="h-7 w-7 lg:h-8 lg:w-8 bg-gray-700 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
          </Link>
        </div>
        
        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="w-full md:hidden mt-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/products" className="hover:text-gray-300">Products</Link>
              <Link to="/news" className="hover:text-gray-300">News</Link>
              <Link to="/categories" className="hover:text-gray-300">Categories</Link>
              <Link to="/about-us" className="hover:text-gray-300">About Us</Link>
            </div>
            
            <div className="mt-4">
              <form onSubmit={handleSearchSubmit} className="relative mb-3">
                <input
                  type="text"
                  placeholder="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="bg-gray-800 text-white px-3 py-1 rounded-md w-full"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Search size={16} />
                </button>
              </form>
              
              <div className="flex justify-between mt-3">
                <Link to="/favorites" className="hover:text-gray-300">
                  <Heart size={20} />
                </Link>
                
                <Link to="/cart" className="hover:text-gray-300">
                  <ShoppingCart size={20} />
                </Link>
                
                <Link to="/account" className="hover:text-gray-300">
                  <div className="h-7 w-7 bg-gray-700 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    </div>
  );
};

export default Nav;