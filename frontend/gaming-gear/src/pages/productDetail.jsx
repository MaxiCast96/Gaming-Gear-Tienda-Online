import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente ProductDetail
 * 
 * Este componente muestra la página de detalle de un producto (GTA V)
 * con imágenes, información, reseñas y productos relacionados.
 */
export default function ProductDetail() {
  // Estados para control de la interfaz
  const [selectedImage, setSelectedImage] = useState(0); // Índice de la imagen seleccionada
  const [isInWishlist, setIsInWishlist] = useState(false); // Estado para la lista de deseos
  const [isInCart, setIsInCart] = useState(false); // Estado para el carrito

  // Array con URLs de imágenes del producto
  const productImages = [
    "https://articles-img.sftcdn.net/auto-mapping-folder/sites/2/2022/03/gta-v-thumb.jpg",
    "https://atomix.vg/wp-content/uploads/2015/01/pcfranklin_full.jpg",
    "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2014/09/382006-gta-v-fecha-lanzamiento-ps4-xbox-one-pc-confirmada.jpg?tf=3840x",
    "https://cdn.prod.website-files.com/6657421f71dedfccb6c0511b/67885c1b81acba01a2bfcdca_66c8ebe8db5564ac2f035df0_1292771%2520(1).png"
  ];

  // Datos de reseñas de clientes
  const reviews = [
    { rating: 5, text: "¡Excelente producto! Me encantó la calidad y el servicio. 10/10 👍", user: "Usuario1", date: "18 Feb 2023" },
    { rating: 4, text: "Muy bueno, pero se entregó tarde un poco.", user: "Usuario2", date: "22 Feb 2023" },
    { rating: 4, text: "El producto está bien, pero esperaba mejor embalaje.", user: "Usuario3", date: "01 Mar 2023" },
    { rating: 4, text: "El producto está bien, pero esperaba mejor embalaje.", user: "Usuario4", date: "08 Mar 2023" }
  ];

  // Productos relacionados para mostrar
  const relatedProducts = [
    { id: 1, name: "Teclado RGB", price: 50, image: "https://aeon.com.sv/web/image/product.image/3926/image_1024/Teclado%20Mecanico%20REDRAGON%20Gaming%20KUMARA%20RGB%2C%20Switch%20ROJO%2C%20TKL%2C%20USB%2C%20Blanco%20-%20K552RGB-1?unique=a92bb59" },
    { id: 2, name: "JBL Pro Ultra", price: 120, image: "https://m.media-amazon.com/images/I/71kzInVwzgL.jpg" },
    { id: 3, name: "Xbox", price: 300, image: "https://i5.walmartimages.com/seo/Microsoft-Xbox-Series-X-1TB-SSD-Gaming-Console-with-1-Xbox-Wireless-Controller-Black-2160p-Resolution-8K-HDR-Wi-Fi-w-Batteries_7731b7a3-2b2c-4cdd-b79a-56958896fc7c.7579fef99ebf8da06c02e6a2ecb62f4f.jpeg" },
    { id: 4, name: "Red Dead II", price: 40, image: "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png" }
  ];

  // Distribución de calificaciones para la visualización estadística
  const ratingDistribution = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 }
  ];

  /**
   * Función para alternar el estado del carrito
   * Muestra una alerta al añadir o eliminar el producto
   */
  const toggleCart = () => {
    setIsInCart(!isInCart);
    if (!isInCart) {
      alert("Producto añadido al carrito");
    } else {
      alert("Producto eliminado del carrito");
    }
  };

  /**
   * Función para alternar el estado de la lista de deseos
   */
  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  return (
    <div className="bg-red-900 text-white min-h-screen w-full">

      {/* Sección principal del producto */}
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Columna izquierda - Galería de imágenes */}
          <div className="md:w-1/2">
            {/* Imagen principal */}
            <div className="border-4 border-yellow-50/30 p-1 bg-yellow-50/10 mb-4">
              <img 
                src={productImages[selectedImage]} 
                alt="Grand Theft Auto V" 
                className="w-full" 
              />
            </div>
            
            {/* Miniaturas para selección de imágenes */}
            <div className="flex gap-2 justify-center">
              {productImages.map((img, index) => (
                <div 
                  key={index}
                  className={`border-2 cursor-pointer ${selectedImage === index ? 'border-white' : 'border-gray-500'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`Miniatura ${index + 1}`} className="w-16 h-16 object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha - Información del producto */}
          <div className="md:w-1/2">
            {/* Título del producto */}
            <h1 className="text-3xl font-bold mb-3">Grand Theft Auto V</h1>
      
            {/* Información de entrega */}
            <div className="bg-black/20 p-3 rounded-lg mb-4">
              <div className="flex items-center mb-1">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-1 text-gray-200">
                  <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
                  <path fill="currentColor" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"/>
                </svg>
                <span>¡Entrega aproximada! jueves 20 a lunes 24 de febrero al ordenar hoy 19/02/2023!</span>
              </div>
            </div>
            
            {/* Estrellas de calificación */}
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <svg 
                  key={star} 
                  className={`w-5 h-5 ${star <= 4 ? "text-yellow-400" : "text-gray-400"}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            {/* Precio y disponibilidad */}
            <div className="mb-4">
              <span className="text-2xl font-bold">$ 29.99</span>
              <span className="ml-3 text-green-400">Disponible</span>
            </div>
            
            {/* Botones de acción (carrito y lista de deseos) */}
            <div className="flex space-x-2 mb-6">
              <button 
                onClick={toggleCart}
                className={`px-4 py-2 rounded transition duration-200 ${
                  isInCart 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-white text-red-900 hover:bg-gray-200'
                }`}
              >
                {isInCart ? 'Agregado al carrito ✓' : 'Agregar al carrito'}
              </button>
              <button 
                onClick={toggleWishlist}
                className={`p-2 rounded border ${isInWishlist ? 'bg-red-700 border-red-600' : 'bg-transparent border-white'}`}
              >
                <svg className="w-6 h-6" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            {/* Detalles del producto */}
            <div className="border-t border-red-700 pt-4">
              <h3 className="text-lg font-semibold mb-2">Detalles del producto:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nombre: Grand Theft Auto V</li>
                <li>Desarrollador: Rockstar Games</li>
                <li>Plataforma: PC, PS4, PS5, Xbox 360, Xbox One, Xbox Series X/S</li>
                <li>Género: Acción, aventura, mundo abierto y aventura</li>
                <li>Modo de juego: Un jugador y multijugador (GTA Online)</li>
                <li>Clasificación: +18 (por violencia, lenguaje fuerte y contenido adulto)</li>
                <li>Descripción: Explora los vastos y vibrantes mundos de Los Santos y Blaine County con Franklin V, Michael y Trevor en Los Santos, una ciudad llena de peligros, misiones y actividades. Disfruta de un mundo abierto enorme con una historia envolvente, acción intensa y la posibilidad de crear tu propia aventura en GTA Online.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de reseñas */}
      <div className="container mx-auto p-4 mt-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Estadísticas de calificación */}
          <div className="md:w-1/3 bg-red-950 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Calificación General</h3>
            <div className="flex items-center mb-4">
              <div className="mr-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg 
                    key={star} 
                    className="w-5 h-5 inline-block text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-medium">4.7/5</span>
            </div>
            
            {/* Barras de distribución de calificaciones */}
            {ratingDistribution.map(item => (
              <div key={item.stars} className="flex items-center mb-2">
                <span className="w-8 text-sm">{item.stars} estrellas</span>
                <div className="flex-1 mx-2 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="w-8 text-sm text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
          
          {/* Lista de reseñas y campo para añadir nueva reseña */}
          <div className="md:w-2/3 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Reseñas del Producto</h3>
            
            {/* Campo para escribir una nueva reseña */}
            <div className="mb-4">
              <textarea 
                className="w-full p-3 bg-gray-700 rounded text-white" 
                rows="4" 
                placeholder="Escribe una opinión..."
              ></textarea>
            </div>
            
            {/* Listado de reseñas existentes */}
            {reviews.map((review, index) => (
              <div key={index} className="border-t border-gray-700 py-4">
                <div className="flex justify-between mb-1">
                  <div>
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg 
                        key={star} 
                        className={`w-4 h-4 inline-block ${star <= review.rating ? "text-yellow-400" : "text-gray-400"}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    <span>{review.user}</span> • <span>{review.date}</span>
                  </div>
                </div>
                <p className="text-gray-300">{review.text}</p>
              </div>
            ))}
            
            {/* Botón para ver más reseñas */}
            <div className="text-center mt-4">
              <Link to="/ofertas">
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition duration-200">
                  Ver más...
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de productos relacionados */}
      <div className="container mx-auto p-4 mt-8 mb-8">
        <h3 className="text-xl font-bold mb-6">Productos relacionados:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Renderizado de cada producto relacionado */}
          {relatedProducts.map(product => (
            <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden border border-red-800">
              <div className="p-3">
                <div className="text-sm text-gray-300 mb-1">{product.name}</div>
                <div className="font-bold">${product.price}</div>
              </div>
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}