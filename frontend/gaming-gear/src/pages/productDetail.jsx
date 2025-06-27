import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure this path is correct

export default function ProductDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate(); // Added useNavigate

  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState(''); // New state for cart messages
  const [quantity, setQuantity] = useState(1); // Nueva cantidad seleccionada
  const [addingToCart, setAddingToCart] = useState(false); // Estado para mostrar loading al agregar

  // Estados para reseñas
  const [resenas, setResenas] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loadingResenas, setLoadingResenas] = useState(true);
  const [filtroEstrellas, setFiltroEstrellas] = useState('todas');

  // Estados para nueva reseña
  const [nuevaResena, setNuevaResena] = useState({
    estrellas: 5,
    comentario: ''
  });
  const [enviandoResena, setEnviandoResena] = useState(false);

  // Cargar producto
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:4000/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setProducto(data);
      } catch (err) {
        console.error('Error al obtener producto:', err);
        setError(err.message || 'Error al cargar el producto');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  // Cargar reseñas y estadísticas
  useEffect(() => {
    const fetchResenas = async () => {
      if (!id) return;

      try {
        setLoadingResenas(true);

        // Cargar reseñas
        const resenasResponse = await fetch(`http://localhost:4000/api/reviews/producto/${id}`);
        const resenasData = await resenasResponse.json();
        setResenas(resenasData);

        // Cargar estadísticas
        const statsResponse = await fetch(`http://localhost:4000/api/reviews/producto/${id}/estadisticas`);
        const statsData = await statsResponse.json();
        setEstadisticas(statsData);

      } catch (err) {
        console.error('Error al cargar reseñas:', err);
      } finally {
        setLoadingResenas(false);
      }
    };

    fetchResenas();
  }, [id]);

  // Función para manejar cambio de cantidad
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= producto.cantidad) {
      setQuantity(newQuantity);
    }
  };

  // Función mejorada para agregar al carrito
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setCartMessage('Debes iniciar sesión para agregar productos al carrito.');
      setTimeout(() => setCartMessage(''), 3000);
      return;
    }

    if (!producto || producto.cantidad === 0) {
      setCartMessage('Este producto no está disponible.');
      setTimeout(() => setCartMessage(''), 3000);
      return;
    }

    if (quantity > producto.cantidad) {
      setCartMessage(`Solo hay ${producto.cantidad} unidades disponibles.`);
      setTimeout(() => setCartMessage(''), 3000);
      return;
    }

    try {
      setAddingToCart(true);
      const response = await fetch('http://localhost:4000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('authToken=')[1]?.split(';')[0]}` // Assuming auth token in cookie
        },
        body: JSON.stringify({
          productId: producto._id, // Assuming producto._id is the product's unique ID
          name: producto.nombre,
          price: producto.precio,
          image: producto.imagenPrincipal, // Or an array of images
          quantity: quantity, // Usar la cantidad seleccionada
          cliente: user.id || user.email || user.nombre, // Use user ID or a unique identifier from auth context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar producto al carrito');
      }

      setCartMessage(`${quantity} ${quantity === 1 ? 'producto agregado' : 'productos agregados'} al carrito ✓`);
      setIsInCart(true); // Set state to indicate it's in cart
      setTimeout(() => setCartMessage(''), 3000);
    } catch (err) {
      console.error('Error al añadir al carrito:', err);
      setCartMessage(`Error: ${err.message}`);
      setIsInCart(false);
      setTimeout(() => setCartMessage(''), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  // Función para ir al carrito
  const handleGoToCart = () => {
    navigate('/cart');
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const formatPrice = (precio) => {
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(precio);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200/333333/ffffff?text=Sin+Imagen';
  };

  // Función para enviar nueva reseña
  const handleSubmitResena = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para escribir una reseña');
      return;
    }

    if (!nuevaResena.comentario.trim()) {
      alert('Por favor escribe un comentario');
      return;
    }

    try {
      setEnviandoResena(true);
      const response = await fetch('http://localhost:4000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('authToken=')[1]?.split(';')[0]}`
        },
        body: JSON.stringify({
          productoId: id,
          usuario: user?.nombre || user?.name || user?.email || 'Usuario',
          estrellas: nuevaResena.estrellas,
          comentario: nuevaResena.comentario.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar reseña');
      }

      const result = await response.json();
      // Actualizar lista de reseñas
      setResenas(prev => [result.resena, ...prev]);
      // Limpiar formulario
      setNuevaResena({
        estrellas: 5,
        comentario: ''
      });
      // Recargar estadísticas
      const statsResponse = await fetch(`http://localhost:4000/api/reviews/producto/${id}/estadisticas`);
      const statsData = await statsResponse.json();
      setEstadisticas(statsData);
      alert('¡Reseña enviada exitosamente!');

    } catch (err) {
      console.error('Error al enviar reseña:', err);
      alert('Error al enviar la reseña: ' + err.message);
    } finally {
      setEnviandoResena(false);
    }
  };

  // Filtrar reseñas y limitar a 6
  const resenasFiltradas = filtroEstrellas === 'todas'
    ? resenas
    : resenas.filter(resena => resena.estrellas === parseInt(filtroEstrellas));
  // Mostrar solo las primeras 6 reseñas
  const resenasLimitadas = resenasFiltradas.slice(0, 6);
  const hayMasResenas = resenasFiltradas.length > 6;

  // Componente para renderizar estrellas
  const StarRating = ({ rating, size = "w-5 h-5", interactive = false, onRatingChange = null }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <svg
            key={star}
            className={`${size} ${star <= rating ? "text-yellow-400" : "text-gray-400"} ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            onClick={interactive ? () => onRatingChange(star) : undefined}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-red-900 text-white min-h-screen w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <span className="ml-3 text-lg">Cargando producto...</span>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="bg-red-900 text-white min-h-screen w-full flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-4">{error || 'Producto no encontrado'}</p>
          <Link to="/" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const productImages = [
    producto.imagenPrincipal,
    ...(producto.imagenesSecundarias || [])
  ].filter(Boolean);

  return (
    <div className="bg-red-900 text-white min-h-screen w-full">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="border-4 border-yellow-50/30 p-1 bg-yellow-50/10 mb-4">
              <img
                src={productImages[selectedImage] || producto.imagenPrincipal}
                alt={producto.nombre}
                className="w-full"
                onError={handleImageError}
              />
            </div>

            {productImages.length > 1 && (
              <div className="flex gap-2 justify-center">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    className={`border-2 cursor-pointer ${selectedImage === index ? 'border-white' : 'border-gray-500'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${index + 1}`}
                      className="w-16 h-16 object-cover"
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-3">{producto.nombre}</h1>

            <div className="bg-black/20 p-3 rounded-lg mb-4">
              <div className="flex items-center mb-1">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-1 text-gray-200">
                  <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                  <path fill="currentColor" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
                </svg>
                <span>¡Entrega aproximada! jueves 20 a lunes 24 de febrero al ordenar hoy!</span>
              </div>
            </div>

            <div className="flex items-center mb-4">
              {estadisticas && estadisticas.totalResenas > 0 ? (
                <>
                  <StarRating rating={Math.round(estadisticas.promedioEstrellas)} />
                  <span className="ml-2 text-sm text-gray-300">
                    {estadisticas.promedioEstrellas}/5 ({estadisticas.totalResenas} reseñas)
                  </span>
                </>
              ) : (
                <span className="text-gray-400">Sin reseñas aún</span>
              )}
            </div>

            <div className="mb-4">
              <span className="text-2xl font-bold">{formatPrice(producto.precio)}</span>
              <span className={`ml-3 ${producto.cantidad > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {producto.cantidad > 0 ? `Disponible (${producto.cantidad})` : 'Sin stock'}
              </span>
            </div>

            {/* Selector de cantidad */}
            {producto.cantidad > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Cantidad:</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={producto.cantidad}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-16 h-8 text-center bg-gray-700 border border-gray-600 rounded text-white"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= producto.cantidad}
                    className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 flex items-center justify-center"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-300">
                    de {producto.cantidad} disponibles
                  </span>
                </div>
              </div>
            )}

            <div className="flex space-x-2 mb-6">
              {!isInCart ? (
                <button
                  onClick={handleAddToCart}
                  disabled={producto.cantidad === 0 || addingToCart}
                  className={`flex items-center px-4 py-2 rounded transition duration-200 ${
                    producto.cantidad === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-red-900 hover:bg-gray-200'
                  }`}
                >
                  {addingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-900 mr-2"></div>
                      Agregando...
                    </>
                  ) : producto.cantidad === 0 ? (
                    'Sin stock'
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5A1 1 0 006.9 19H19" />
                      </svg>
                      Agregar al carrito
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleGoToCart}
                  className="flex items-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Ver carrito
                </button>
              )}
              
              <button
                onClick={toggleWishlist}
                className={`p-2 rounded border ${isInWishlist ? 'bg-red-700 border-red-600' : 'bg-transparent border-white'}`}
              >
                <svg className="w-6 h-6" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {cartMessage && (
              <div className={`mb-4 p-3 rounded text-center ${
                cartMessage.includes('Error') || cartMessage.includes('Solo hay') || cartMessage.includes('Debes') 
                  ? 'bg-red-500' 
                  : 'bg-green-500'
              } text-white`}>
                {cartMessage}
              </div>
            )}

            <div className="border-t border-red-700 pt-4">
              <h3 className="text-lg font-semibold mb-2">Detalles del producto:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nombre: {producto.nombre}</li>
                {producto.categoria && <li>Categoría: {producto.categoria}</li>}
                <li>Precio: {formatPrice(producto.precio)}</li>
                <li>Stock disponible: {producto.cantidad || 0}</li>
                {producto.descripcion && <li>Descripción: {producto.descripcion}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Reseñas */}
      <div className="container mx-auto p-4 mt-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Estadísticas */}
          <div className="md:w-1/3 bg-red-950 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Calificación General</h3>
            {loadingResenas ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
              </div>
            ) : estadisticas && estadisticas.totalResenas > 0 ? (
              <>
                <div className="flex items-center mb-4">
                  <StarRating rating={Math.round(estadisticas.promedioEstrellas)} />
                  <span className="ml-2 text-lg font-medium">{estadisticas.promedioEstrellas}/5</span>
                </div>

                {estadisticas.distribucion.map(item => (
                  <div key={item.estrellas} className="flex items-center mb-2">
                    <span className="w-8 text-sm">{item.estrellas} ★</span>
                    <div className="flex-1 mx-2 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${item.porcentaje}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-sm text-right">{item.porcentaje}%</span>
                  </div>
                ))}

                {/* Filtros */}
                <div className="mt-4">
                  <p className="text-sm mb-2">Filtrar por estrellas:</p>
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => setFiltroEstrellas('todas')}
                      className={`px-2 py-1 text-xs rounded ${filtroEstrellas === 'todas' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                      Todas
                    </button>
                    {[5, 4, 3, 2, 1].map(num => (
                      <button
                        key={num}
                        onClick={() => setFiltroEstrellas(num.toString())}
                        className={`px-2 py-1 text-xs rounded ${filtroEstrellas === num.toString() ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                      >
                        {num} ★
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-400">No hay reseñas aún. ¡Sé el primero en opinar!</p>
            )}
          </div>

          {/* Lista de reseñas y formulario */}
          <div className="md:w-2/3 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Reseñas del Producto</h3>

            {/* Formulario para nueva reseña - Solo si está autenticado */}
            {isAuthenticated ? (
              <form onSubmit={handleSubmitResena} className="mb-6 p-4 bg-gray-700 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Escribe tu reseña</h4>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Escribiendo como:</label>
                  <div className="text-green-400 font-medium">
                    {user?.nombre || user?.name || user?.email || 'Usuario'}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Calificación:</label>
                  <StarRating
                    rating={nuevaResena.estrellas}
                    size="w-6 h-6"
                    interactive={true}
                    onRatingChange={(rating) => setNuevaResena({...nuevaResena, estrellas: rating})}
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Tu comentario:</label>
                  <textarea
                    value={nuevaResena.comentario}
                    onChange={(e) => setNuevaResena({...nuevaResena, comentario: e.target.value})}
                    className="w-full p-2 bg-gray-600 rounded text-white placeholder-gray-400"
                    rows="4"
                    placeholder="Comparte tu experiencia con este producto..."
                    maxLength="500"
                    required
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {nuevaResena.comentario.length}/500 caracteres
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={enviandoResena}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-2 rounded text-white transition duration-200"
                >
                  {enviandoResena ? 'Enviando...' : 'Publicar Reseña'}
                </button>
              </form>
            ) : (
              <div className="mb-6 p-4 bg-gray-700 rounded-lg text-center">
                <p className="mb-3">¿Quieres escribir una reseña?</p>
                <Link
                  to="/login"
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition duration-200 inline-block"
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}

            {/* Lista de reseñas limitadas */}
            {loadingResenas ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse border-t border-gray-700 pt-4">
                    <div className="h-4 bg-gray-600 rounded mb-2 w-1/4"></div>
                    <div className="h-4 bg-gray-600 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : resenasLimitadas.length > 0 ? (
              <>
                <div className="space-y-4">
                  {resenasLimitadas.map((resena) => (
                    <div key={resena._id} className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <StarRating rating={resena.estrellas} size="w-4 h-4" />
                          <span className="ml-2 font-medium">{resena.usuario}</span>
                          {resena.verificado && (
                            <span className="ml-2 text-xs bg-green-600 px-1 rounded">Verificado</span>
                          )}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {resena.fechaFormateada || new Date(resena.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <p className="text-gray-300">{resena.comentario}</p>
                    </div>
                  ))}
                </div>
                {/* Botón Ver más reseñas */}
                {hayMasResenas && (
                  <div className="mt-6 text-center">
                    <Link to={`/product/${id}/reviews`} className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white transition duration-200 inline-flex items-center" >
                      Ver todas las reseñas ({resenasFiltradas.length}) <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /> </svg>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-400">
                {filtroEstrellas === 'todas' ? 'No hay reseñas aún. ¡Sé el primero en opinar!' : `No hay reseñas con ${filtroEstrellas} estrella${filtroEstrellas === '1' ? '' : 's'}.`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="container mx-auto p-4 mt-8 mb-8">
        <h3 className="text-xl font-bold mb-6">Productos relacionados:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 1, name: "Teclado RGB", price: 50, image: "https://aeon.com.sv/web/image/product.image/3926/image_1024/Teclado%20Mecanico%20REDRAGON%20Gaming%20KUMARA%20RGB%2C%20Switch%20ROJO%2C%20TKL%2C%20USB%2C%20Blanco%20-%20K552RGB-1?unique=a92bb59" },
            { id: 2, name: "JBL Pro Ultra", price: 120, image: "https://m.media-amazon.com/images/I/71kzInVwzgL.jpg" },
            { id: 3, name: "Xbox", price: 300, image: "https://i5.walmartimages.com/seo/Microsoft-Xbox-Series-X-1TB-SSD-Gaming-Console-with-1-Xbox-Wireless-Controller-Black-2160p-Resolution-8K-HDR-Wi-Fi-w-Batteries_7731b7a3-2b2c-4cdd-b79a-56958896fc7c.7579fef99ebf8da06c02e6a2ecb62f4f.jpeg" },
            { id: 4, name: "Red Dead II", price: 40, image: "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png" }
          ].map(product => (
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