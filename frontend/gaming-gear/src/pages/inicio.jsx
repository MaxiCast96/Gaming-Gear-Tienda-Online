import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente Inicio
 * 
 * Página principal que muestra un banner y una cuadrícula de productos con filtrado por categorías.
 * Los productos se obtienen de la API real y se pueden filtrar mediante un menú desplegable.
 * Al hacer clic en ellos se navega a la página de detalles del producto.
 */
const Inicio = () => {
  // Estado para los productos obtenidos de la API
  const [productos, setProductos] = useState([]);
  
  // Estado para el filtro de categorías (por defecto muestra todas)
  const [filter, setFilter] = useState('All');
  
  // Estado para controlar si el menú desplegable está abierto o cerrado
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Estados para manejo de carga y errores
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Hook de navegación de React Router
  const navigate = useNavigate();
  
  /**
   * Obtiene los productos de la API
   */
  const fetchProductos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:4000/api/products');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProductos(data);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Efecto para cargar los productos al montar el componente
   */
  useEffect(() => {
    fetchProductos();
  }, []);
  
  // Extrae todas las categorías únicas y añade 'All' al principio
  const categories = ['All', ...new Set(productos.map(producto => producto.categoria).filter(Boolean))];
  
  // Filtra los productos según la categoría seleccionada
  const filteredProducts = filter === 'All' 
    ? productos 
    : productos.filter(producto => producto.categoria === filter);

  /**
   * Navega a la página de detalles del producto cuando se hace clic en un producto
   * @param {string} productId - ID del producto
   */
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
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
  
  /**
   * Reintentar cargar productos en caso de error
   */
  const handleRetry = () => {
    fetchProductos();
  };
  
  /**
   * Maneja errores de carga de imágenes
   * @param {Event} e - Evento de error de imagen
   */
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200/333333/ffffff?text=Sin+Imagen';
  };
  
  /**
   * Formatea el precio con separadores de miles
   * @param {number} precio - Precio a formatear
   */
  const formatPrice = (precio) => {
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(precio);
  };
  
  return (
    <div className="bg-red-900 text-white min-h-screen w-full flex flex-col">
      {/* Banner Hero - Imagen de fondo con texto superpuesto */}
      <div className="relative h-48 sm:h-56 md:h-72 lg:h-96 w-full">
        <img 
          src="https://wallpapers.com/images/hd/pc-gaming-setup-rgb-4k-ft1ym37yjyb7lp19.jpg" 
          alt="Gaming Setup" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1920x1080/8B0000/ffffff?text=Gaming+Setup';
          }}
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
        {/* Mostrar estado de carga */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <span className="ml-3 text-lg">Cargando productos...</span>
          </div>
        )}
        
        {/* Mostrar error si existe */}
        {error && !isLoading && (
          <div className="bg-red-800 border border-red-600 text-white px-4 py-3 rounded mb-6">
            <div className="flex items-center justify-between">
              <div>
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
              <button 
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm ml-4"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}
        
        {/* Contenido principal solo si no hay error y no está cargando */}
        {!isLoading && !error && (
          <>
            {/* Filtro desplegable de categorías */}
            <div className="mb-3 sm:mb-6 relative">
              <button 
                className="flex items-center justify-between w-full sm:w-40 md:w-48 space-x-1 bg-red-950 px-2 sm:px-4 py-1 sm:py-2 rounded-md text-sm sm:text-base hover:bg-red-800 transition-colors"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <span>({filter})</span>
                {/* Icono de flecha para el desplegable */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`sm:w-5 sm:h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              {/* Menú desplegable (solo visible cuando isDropdownOpen es true) */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full sm:w-40 md:w-48 mt-1 rounded-md shadow-lg bg-red-950 border border-red-800">
                  <ul className="py-1 text-sm sm:text-base" role="menu" aria-orientation="vertical">
                    {categories.map((category) => (
                      <li 
                        key={category} 
                        className={`px-2 sm:px-4 py-1 sm:py-2 hover:bg-red-800 cursor-pointer transition-colors ${
                          filter === category ? 'bg-red-800 font-semibold' : ''
                        }`}
                        onClick={() => handleFilterChange(category)}
                        role="menuitem"
                      >
                        {category === 'All' ? 'Todas las categorías' : category}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Información de productos encontrados */}
            <div className="mb-4">
              <p className="text-sm sm:text-base text-gray-300">
                {filteredProducts.length === 0 
                  ? 'No se encontraron productos'
                  : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>
            
            {/* Cuadrícula de productos - Responsive para múltiples tamaños de pantalla */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 4xl:grid-cols-12 gap-2 sm:gap-4 w-full">
                {filteredProducts.map(producto => (
                  <div 
                    key={producto._id} 
                    className="bg-red-950 p-2 sm:p-3 rounded-md cursor-pointer hover:bg-red-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={() => handleProductClick(producto._id)}
                  >
                    {/* Información del producto */}
                    <div className="mb-1 sm:mb-2">
                      <h3 className="font-medium truncate text-sm sm:text-base" title={producto.nombre}>
                        {producto.nombre}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-green-300">
                        {formatPrice(producto.precio)}
                      </p>
                      {producto.cantidad !== undefined && (
                        <p className="text-xs text-gray-300">
                          {producto.cantidad > 0 
                            ? `Stock: ${producto.cantidad}` 
                            : 'Sin stock'
                          }
                        </p>
                      )}
                    </div>
                    
                    {/* Contenedor de imagen */}
                    <div className="h-24 xxs:h-28 sm:h-32 md:h-36 lg:h-40 bg-black rounded-md overflow-hidden">
                      <img 
                        src={producto.imagenPrincipal || 'https://via.placeholder.com/300x200/333333/ffffff?text=Sin+Imagen'} 
                        alt={producto.nombre}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Indicador de categoría */}
                    {producto.categoria && (
                      <div className="mt-1 sm:mt-2">
                        <span className="inline-block bg-red-800 text-xs px-2 py-1 rounded-full">
                          {producto.categoria}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-4">
                    <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0H4m16 0l-2-2m2 2l-2 2M4 13l2-2m-2 2l2 2" />
                    </svg>
                    No hay productos disponibles
                  </div>
                  <p className="text-gray-500">
                    {filter === 'All' 
                      ? 'No se han encontrado productos en la base de datos.'
                      : `No hay productos en la categoría "${filter}".`
                    }
                  </p>
                  {filter !== 'All' && (
                    <button 
                      onClick={() => handleFilterChange('All')}
                      className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                    >
                      Ver todos los productos
                    </button>
                  )}
                </div>
              )
            )}
          </>
        )}
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