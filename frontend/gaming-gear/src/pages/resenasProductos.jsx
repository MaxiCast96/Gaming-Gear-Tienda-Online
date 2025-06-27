import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ResenasProducto() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  
  // Estados para reseñas y producto
  const [producto, setProducto] = useState(null);
  const [resenas, setResenas] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingResenas, setLoadingResenas] = useState(true);
  const [filtroEstrellas, setFiltroEstrellas] = useState('todas');
  
  // Estados para nueva reseña
  const [nuevaResena, setNuevaResena] = useState({
    estrellas: 5,
    comentario: ''
  });
  const [enviandoResena, setEnviandoResena] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar datos del producto
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProducto(data);
        }
      } catch (err) {
        console.error('Error al cargar producto:', err);
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
      
      // Limpiar formulario y ocultarlo
      setNuevaResena({
        estrellas: 5,
        comentario: ''
      });
      setMostrarFormulario(false);

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

  // Filtrar reseñas
  const resenasFiltradas = filtroEstrellas === 'todas' 
    ? resenas 
    : resenas.filter(resena => resena.estrellas === parseInt(filtroEstrellas));

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

  const formatPrice = (precio) => {
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(precio);
  };

  if (isLoading) {
    return (
      <div className="bg-red-900 text-white min-h-screen w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <span className="ml-3 text-lg">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="bg-red-900 text-white min-h-screen w-full">
      <div className="container mx-auto p-4">
        {/* Header con información del producto */}
        <div className="mb-6">
          <Link 
            to={`/products/${id}`} 
            className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al producto
          </Link>
          
          {producto && (
            <div className="bg-red-950 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <img 
                  src={producto.imagenPrincipal} 
                  alt={producto.nombre}
                  className="w-16 h-16 object-cover rounded border-2 border-yellow-50/30"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/64x64/333333/ffffff?text=Sin+Imagen';
                  }}
                />
                <div>
                  <h1 className="text-xl font-bold">{producto.nombre}</h1>
                  <p className="text-gray-300">{formatPrice(producto.precio)}</p>
                  {estadisticas && estadisticas.totalResenas > 0 && (
                    <div className="flex items-center mt-1">
                      <StarRating rating={Math.round(estadisticas.promedioEstrellas)} size="w-4 h-4" />
                      <span className="ml-2 text-sm text-gray-300">
                        {estadisticas.promedioEstrellas}/5 ({estadisticas.totalResenas} reseñas)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Panel de estadísticas */}
          <div className="lg:w-1/3">
            <div className="bg-red-950 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-bold mb-4">Calificación General</h2>
              
              {loadingResenas ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                </div>
              ) : estadisticas && estadisticas.totalResenas > 0 ? (
                <>
                  <div className="flex items-center mb-6">
                    <div className="text-4xl font-bold mr-4">
                      {estadisticas.promedioEstrellas}
                    </div>
                    <div>
                      <StarRating rating={Math.round(estadisticas.promedioEstrellas)} />
                      <p className="text-sm text-gray-300 mt-1">
                        Basado en {estadisticas.totalResenas} reseñas
                      </p>
                    </div>
                  </div>
                  
                  {/* Distribución de estrellas */}
                  <div className="space-y-2 mb-6">
                    {estadisticas.distribucion.map(item => (
                      <div key={item.estrellas} className="flex items-center">
                        <span className="w-8 text-sm">{item.estrellas}</span>
                        <svg className="w-4 h-4 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="flex-1 mx-2 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${item.porcentaje}%` }}
                          ></div>
                        </div>
                        <span className="w-12 text-sm text-right">{item.cantidad}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No hay reseñas aún.
                </p>
              )}
              
              {/* Filtros */}
              <div className="border-t border-red-800 pt-4">
                <p className="text-sm font-medium mb-3">Filtrar por estrellas:</p>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setFiltroEstrellas('todas')}
                    className={`px-3 py-2 text-sm rounded transition duration-200 ${
                      filtroEstrellas === 'todas' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    Todas ({resenas.length})
                  </button>
                  {[5, 4, 3, 2, 1].map(num => {
                    const count = resenas.filter(r => r.estrellas === num).length;
                    return (
                      <button 
                        key={num}
                        onClick={() => setFiltroEstrellas(num.toString())}
                        className={`px-3 py-2 text-sm rounded transition duration-200 ${
                          filtroEstrellas === num.toString() 
                            ? 'bg-red-600 text-white' 
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        {num} ★ ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Botón para escribir reseña */}
              {isAuthenticated && !mostrarFormulario && (
                <button
                  onClick={() => setMostrarFormulario(true)}
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 px-4 py-3 rounded text-white font-medium transition duration-200"
                >
                  Escribir una reseña
                </button>
              )}
            </div>
          </div>

          {/* Panel principal de reseñas */}
          <div className="lg:w-2/3">
            {/* Formulario para nueva reseña */}
            {mostrarFormulario && isAuthenticated && (
              <div className="bg-gray-800 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Escribe tu reseña</h3>
                  <button
                    onClick={() => setMostrarFormulario(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleSubmitResena}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Escribiendo como: <span className="text-green-400">{user?.nombre || user?.name || user?.email || 'Usuario'}</span>
                    </label>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Calificación:</label>
                    <StarRating 
                      rating={nuevaResena.estrellas} 
                      size="w-8 h-8" 
                      interactive={true}
                      onRatingChange={(rating) => setNuevaResena({...nuevaResena, estrellas: rating})}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Tu comentario:</label>
                    <textarea 
                      value={nuevaResena.comentario}
                      onChange={(e) => setNuevaResena({...nuevaResena, comentario: e.target.value})}
                      className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400 resize-none" 
                      rows="4" 
                      placeholder="Comparte tu experiencia con este producto..."
                      maxLength="500"
                      required
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      {nuevaResena.comentario.length}/500 caracteres
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      type="submit"
                      disabled={enviandoResena}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-2 rounded text-white font-medium transition duration-200"
                    >
                      {enviandoResena ? 'Enviando...' : 'Publicar Reseña'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMostrarFormulario(false)}
                      className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded text-white transition duration-200"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Lista de reseñas */}
            <div className="bg-gray-800 rounded-lg">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-lg font-semibold">
                  {filtroEstrellas === 'todas' 
                    ? `Todas las reseñas (${resenasFiltradas.length})`
                    : `Reseñas con ${filtroEstrellas} estrella${filtroEstrellas === '1' ? '' : 's'} (${resenasFiltradas.length})`
                  }
                </h3>
              </div>
              
              {loadingResenas ? (
                <div className="p-6 space-y-6">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-center mb-2">
                        <div className="h-4 bg-gray-600 rounded w-24 mr-4"></div>
                        <div className="h-4 bg-gray-600 rounded w-32"></div>
                      </div>
                      <div className="h-4 bg-gray-600 rounded mb-2"></div>
                      <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : resenasFiltradas.length > 0 ? (
                <div className="divide-y divide-gray-700">
                  {resenasFiltradas.map((resena, index) => (
                    <div key={resena._id || index} className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <StarRating rating={resena.estrellas} size="w-4 h-4" />
                          <span className="ml-3 font-medium">{resena.usuario}</span>
                          {resena.verificado && (
                            <span className="ml-2 text-xs bg-green-600 px-2 py-1 rounded">
                              Verificado
                            </span>
                          )}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {resena.fechaFormateada || new Date(resena.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{resena.comentario}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-lg mb-2">
                    {filtroEstrellas === 'todas' 
                      ? 'No hay reseñas aún' 
                      : `No hay reseñas con ${filtroEstrellas} estrella${filtroEstrellas === '1' ? '' : 's'}`
                    }
                  </p>
                  <p className="text-sm">
                    {filtroEstrellas === 'todas' 
                      ? '¡Sé el primero en opinar sobre este producto!' 
                      : 'Prueba con un filtro diferente.'
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Mensaje para usuarios no autenticados */}
            {!isAuthenticated && (
              <div className="mt-6 bg-gray-800 p-6 rounded-lg text-center">
                <h4 className="text-lg font-medium mb-2">¿Quieres escribir una reseña?</h4>
                <p className="text-gray-400 mb-4">Inicia sesión para compartir tu experiencia con este producto</p>
                <Link 
                  to="/login" 
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-medium transition duration-200 inline-block"
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}