import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  // Hook de navegación de React Router
  const navigate = useNavigate();
  /**
   * Navega a la página de detalles del producto cuando se hace clic en un producto
   * Nota: Actualmente no se está pasando el ID del producto en la navegación
   */
  const handleProductClick = () => {
    navigate(`/products`);
  };

   const handleFilterChange = (category) => {
    setFilter(category);
    
  };
  const [filter, setFilter] = useState('All');
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

  // Filtra los productos según la categoría seleccionada
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(product => product.category === filter);
  
  return (
    <div className="bg-red-900 text-white min-h-screen w-full flex flex-col">
      {/* Contenedor principal - Adaptable y con padding responsive */}
      <div className="px-2 sm:px-4 md:px-8 lg:px-16 py-3 sm:py-6 w-full flex-grow">
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