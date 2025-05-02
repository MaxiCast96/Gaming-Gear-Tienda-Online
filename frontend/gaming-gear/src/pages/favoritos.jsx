import { useState } from 'react';

/**
 * Componente Favoritos
 * 
 * Este componente muestra los productos marcados como favoritos por el usuario.
 * Permite visualizar la lista de favoritos, eliminar productos de favoritos
 * y añadir productos al carrito de compras.
 */
export default function Favorites() {
  // Estado para almacenar los productos favoritos
  const [favoriteItems, setFavoriteItems] = useState([
    {
      id: 1,
      name: "Logitech G Pro X Superlight",
      price: 149.99,
      rating: 5,
      image: "/api/placeholder/400/320"  // Imagen de placeholder
    },
    {
      id: 2,
      name: "MSI Optix MAG274QRF-QD",
      price: 399.99,
      rating: 4,
      image: "/api/placeholder/400/320"  // Imagen de placeholder
    },
    {
      id: 3,
      name: "HyperX Cloud Alpha Wireless",
      price: 189.99,
      rating: 5,
      image: "/api/placeholder/400/320"  // Imagen de placeholder
    }
  ]);

  // Estado para mantener registro de productos añadidos al carrito
  const [addedToCart, setAddedToCart] = useState({});

  /**
   * Elimina un producto de la lista de favoritos
   * @param {number} id - ID del producto a eliminar
   */
  const removeFromFavorites = (id) => {
    setFavoriteItems(favoriteItems.filter(item => item.id !== id));
  };
  
  /**
   * Añade o elimina un producto del carrito
   * @param {Object} item - Producto a añadir/eliminar del carrito
   */
  const addToCart = (item) => {
    // Alterna el estado de "añadido al carrito" para este producto específico
    setAddedToCart(prev => ({
      ...prev,
      [item.id]: !prev[item.id]
    }));
  };
  
  /**
   * Navega a otra página de la aplicación
   * @param {string} path - Ruta a la que se desea navegar
   */
  const navigateTo = (path) => {
    window.location.href = path;
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-950">
      <div className="w-full max-w-3xl">
        {/* Cabecera */}
        <div className="bg-red-900 p-4 mb-4 rounded-t-lg">
          <h1 className="text-white text-2xl font-bold text-center">Mis Favoritos</h1>
        </div>
        
        {/* Contenido principal */}
        <div className="bg-red-800 p-6 rounded-b-lg">
          {/* Mensaje cuando no hay favoritos */}
          {favoriteItems.length === 0 ? (
            <div className="bg-red-200 p-8 rounded-lg text-center">
              <p className="text-red-900 text-lg">No tienes productos favoritos</p>
              <button 
                onClick={() => navigateTo('/')}
                className="mt-4 bg-red-700 hover:bg-red-600 text-white py-2 px-6 rounded-full transition-all duration-300"
              >
                Explorar productos
              </button>
            </div>
          ) : (
            <>
              {/* Lista de productos favoritos */}
              {favoriteItems.map((item) => (
                <div key={item.id} className="bg-red-200 mb-4 p-4 rounded-lg flex items-center justify-between">
                  {/* Información del producto */}
                  <div className="flex items-center">
                    {/* Imagen del producto */}
                    <div className="w-24 h-24 bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Detalles del producto */}
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      
                      {/* Sistema de valoración (estrellas) */}
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, index) => (
                          <svg 
                            key={index} 
                            className={`w-5 h-5 ${index < item.rating ? "text-yellow-500" : "text-gray-400"}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      {/* Precio del producto */}
                      <div className="text-lg font-bold text-gray-800 mt-1">${item.price.toFixed(2)} US</div>
                    </div>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex flex-col items-center gap-2">
                    {/* Botón para añadir/quitar del carrito */}
                    <button 
                      onClick={() => addToCart(item)}
                      className={`${addedToCart[item.id] ? 'bg-green-600 hover:bg-green-700' : 'bg-red-700 hover:bg-red-600'} text-white py-2 px-4 rounded-full text-sm transition-all duration-300 flex items-center`}
                    >
                      {addedToCart[item.id] ? (
                        <>
                          {/* Icono de verificación cuando está en el carrito */}
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Agregado al carrito
                        </>
                      ) : (
                        <>
                          {/* Icono de carrito cuando no está añadido */}
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Añadir al carrito
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Botón para eliminar de favoritos */}
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="ml-2 text-red-800 hover:text-red-600"
                    aria-label="Eliminar de favoritos"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
              
              {/* Botones de navegación */}
              <div className="flex flex-col items-center mt-8">
                <div className="flex gap-4">
                  {/* Botón para seguir comprando */}
                  <button 
                    onClick={() => navigateTo('/')}
                    className="bg-red-700 hover:bg-red-600 text-white py-3 px-8 rounded-full text-lg font-medium shadow-lg transition-all duration-300"
                  >
                    Seguir comprando
                  </button>
                  
                  {/* Botón para ver el carrito */}
                  <button 
                    onClick={() => navigateTo('/cart')}
                    className="bg-red-900 hover:bg-red-800 text-white py-3 px-8 rounded-full text-lg font-medium shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Ver carrito
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}