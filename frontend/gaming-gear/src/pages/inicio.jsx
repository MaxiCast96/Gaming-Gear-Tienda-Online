import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente Inicio
 * 
 * Página principal que muestra un banner y una cuadrícula de productos con filtrado por categorías.
 * Los productos se pueden filtrar mediante un menú desplegable y al hacer clic en ellos 
 * se navega a la página de detalles del producto.
 */
const Inicio = () => {
  // Estado para el filtro de categorías (por defecto muestra todas)
  const [filter, setFilter] = useState('All');
  
  // Estado para controlar si el menú desplegable está abierto o cerrado
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Hook de navegación de React Router
  const navigate = useNavigate();
  
  // Array de productos con sus propiedades (simulando datos de una API)
  const products = [
    { id: 1, name: 'Mando PS5', price: 60, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'controllers' },
    { id: 2, name: 'Phanteks', price: 200, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'cases' },
    { id: 3, name: 'Grand Theft Auto', price: 35, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'games' },
    { id: 4, name: 'Tarjeta de video Msi Ventus3X', price: 200, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'graphics' },
    { id: 5, name: 'Test', price: 50, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'peripherals' },
    { id: 6, name: 'JBL pro ultra', price: 30, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'audio' },
    { id: 7, name: 'Xbox', price: 300, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'consoles' },
    { id: 8, name: 'Red dead II', price: 40, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'games' },
    { id: 9, name: 'Tarjeta de video Msi ventus3x', price: 350, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'graphics' },
    { id: 10, name: 'UFC 5', price: 55, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'games' },
    { id: 11, name: 'PC Completa', price: 980, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'computers' },
    { id: 12, name: 'Switch', price: 170, image: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png', category: 'consoles' },
  ];
  
  // Extrae todas las categorías únicas y añade 'All' al principio
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  // Filtra los productos según la categoría seleccionada
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(product => product.category === filter);

  /**
   * Navega a la página de detalles del producto cuando se hace clic en un producto
   * Nota: Actualmente no se está pasando el ID del producto en la navegación
   */
  const handleProductClick = () => {
    navigate(`/products`);
  };
  
  /**
   * Alterna la visibilidad del menú desplegable de categorías
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  /**
   * Cambia el filtro de categoría seleccionado y cierra el menú desplegable
   * @param {string} category - La categoría seleccionada
   */
  const handleFilterChange = (category) => {
    setFilter(category);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="bg-red-900 text-white min-h-screen w-full flex flex-col">
      {/* Banner Hero - Imagen de fondo con texto superpuesto */}
      <div className="relative h-48 sm:h-56 md:h-72 lg:h-96 w-full">
        <img 
          src="https://wallpapers.com/images/hd/pc-gaming-setup-rgb-4k-ft1ym37yjyb7lp19.jpg" 
          alt="Gaming Setup" 
          className="w-full h-full object-cover"
        />
        {/* Capa oscura semitransparente con texto */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-2 sm:p-4 bg-black bg-opacity-40">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 px-2">
            "Juega Más, Gasta Menos"
          </h2>
          <p className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-xs sm:text-sm md:text-base px-2">
            Los últimos juegos, los últimos diseños, los 
            últimos modelos, las últimas consolas, lo mas 
            nuevo lo tienes aquí al mejor precio, y en la 
            mejor tienda.
          </p>
        </div>
      </div>
      
      {/* Contenedor principal - Adaptable y con padding responsive */}
      <div className="px-2 sm:px-4 md:px-8 lg:px-16 py-3 sm:py-6 w-full flex-grow">
        {/* Filtro desplegable de categorías */}
        <div className="mb-3 sm:mb-6 relative">
          <button 
            className="flex items-center justify-between w-full sm:w-40 md:w-48 space-x-1 bg-red-950 px-2 sm:px-4 py-1 sm:py-2 rounded-md text-sm sm:text-base"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <span>({filter})</span>
            {/* Icono de flecha para el desplegable */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          {/* Menú desplegable (solo visible cuando isDropdownOpen es true) */}
          {isDropdownOpen && (
            <div className="absolute z-10 w-full sm:w-40 md:w-48 mt-1 rounded-md shadow-lg bg-red-950">
              <ul className="py-1 text-sm sm:text-base" role="menu" aria-orientation="vertical">
                {categories.map((category) => (
                  <li 
                    key={category} 
                    className="px-2 sm:px-4 py-1 sm:py-2 hover:bg-red-800 cursor-pointer"
                    onClick={() => handleFilterChange(category)}
                    role="menuitem"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Cuadrícula de productos - Responsive para múltiples tamaños de pantalla */}
        <div className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 4xl:grid-cols-12 gap-2 sm:gap-4 w-full">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-red-950 p-2 sm:p-3 rounded-md cursor-pointer hover:bg-red-800 transition duration-300"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Información del producto */}
              <div className="mb-1 sm:mb-2">
                <h3 className="font-medium truncate text-sm sm:text-base">{product.name}</h3>
                <p className="text-xs sm:text-sm">${product.price}</p>
              </div>
              {/* Contenedor de imagen */}
              <div className="h-24 xxs:h-28 sm:h-32 md:h-36 lg:h-40 bg-black rounded-md overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Estilos personalizados para pantallas extra pequeñas y ultra grandes */}
      <style jsx>{`
        /* Pantallas muy pequeñas (menos de 360px) */
        @media screen and (max-width: 360px) {
          .xxs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .xxs\\:h-28 {
            height: 7rem;
          }
        }
        
        /* Pantallas muy grandes (más de 1920px) */
        @media screen and (min-width: 1920px) {
          .3xl\\:grid-cols-10 {
            grid-template-columns: repeat(10, minmax(0, 1fr));
          }
        }
        
        /* Pantallas ultra grandes (más de 2560px) */
        @media screen and (min-width: 2560px) {
          .4xl\\:grid-cols-12 {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default Inicio;