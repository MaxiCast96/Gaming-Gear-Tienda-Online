import { useState, useEffect } from 'react';

/**
 * Componente principal de Noticias Gaming
 * Muestra un portal de noticias relacionadas con videojuegos con funcionalidad
 * de filtrado por categoría y búsqueda.
 */
export default function Noticias() {
  // Estado para la categoría activa (por defecto: 'all')
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  
  // Efecto para animar la entrada de las tarjetas de noticias
  useEffect(() => {
    // Crea un observador de intersección para detectar cuando las tarjetas son visibles
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Cuando una tarjeta entra en el viewport, añade la clase 'visible' para activar la animación
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 } // Activa cuando al menos el 20% de la tarjeta es visible
    );

    // Selecciona todas las tarjetas de noticias y las observa
    const newsSections = document.querySelectorAll('.news-card');
    newsSections.forEach((section) => observer.observe(section));

    // Limpieza del efecto al desmontar el componente
    return () => newsSections.forEach((section) => observer.unobserve(section));
  }, []);
  
  // Base de datos de noticias (en un proyecto real, esto vendría de una API)
  const noticias = [
    {
      id: 1,
      title: 'PlayStation 5 Pro confirmado para finales de 2025',
      category: 'consolas',
      date: '28 Abril 2025',
      image: 'https://www.muycomputer.com/wp-content/uploads/2024/01/PS5-Pro.jpg',
      excerpt: 'Sony ha anunciado oficialmente el lanzamiento de la PS5 Pro con mejoras significativas en rendimiento y gráficos.',
      highlighted: true // Esta noticia aparecerá en la sección destacada
    },
    {
      id: 2,
      title: 'Nuevos drivers NVIDIA mejoran rendimiento en los últimos AAA',
      category: 'hardware',
      date: '25 Abril 2025',
      image: 'https://www.nvidia.com/es-la/software/nvidia-app/_jcr_content/root/responsivegrid/nv_container_3398778/nv_container/nv_teaser.coreimg.100.1070.jpeg/1730262797264/game-ready-drivers-ari.jpeg',
      excerpt: 'La última actualización de controladores para tarjetas RTX aumenta hasta un 15% el rendimiento en juegos recientes.'
    },
    {
      id: 3,
      title: 'Gaming Gear expande su catálogo con periféricos premium',
      category: 'tienda',
      date: '22 Abril 2025',
      image: 'https://media.game.es/Catalog/Dynamic/Catalogo_206/1__.png',
      excerpt: 'Nuestra tienda ahora cuenta con la línea completa de teclados y ratones profesionales para e-sports.'
    },
    {
      id: 4,
      title: 'Análisis: Red Dead Redemption 3 supera todas las expectativas',
      category: 'juegos',
      date: '20 Abril 2025',
      image: 'https://i.ytimg.com/vi/7OnjwJAVfe8/maxresdefault.jpg',
      excerpt: 'El esperado título de Rockstar Games redefine los mundos abiertos con una historia inolvidable.',
      highlighted: true // Esta noticia aparecerá en la sección destacada
    },
    {
      id: 5,
      title: 'Xbox anuncia 5 nuevos juegos para Game Pass',
      category: 'juegos',
      date: '18 Abril 2025',
      image: 'https://i.blogs.es/5f436b/game-pass/1366_2000.jpeg',
      excerpt: 'Microsoft sigue ampliando su catálogo con títulos de alta calidad para su servicio de suscripción.'
    },
    {
      id: 6,
      title: 'Torneo Gaming Gear: Resultados del campeonato de Counter Strike',
      category: 'eventos',
      date: '15 Abril 2025',
      image: 'https://weezevent.com/wp-content/uploads/2021/12/01103359/organiser-tournoi-jeux-video.png',
      excerpt: 'El equipo Fury Gamers se llevó el primer premio en nuestro torneo mensual con una final épica.'
    },
    {
      id: 7,
      title: 'Nuevo teclado mecánico Razer con switches ópticos',
      category: 'hardware',
      date: '12 Abril 2025',
      image: 'https://assets2.razerzone.com/images/huntsman-2018/razer-huntsman-elite-og-image.jpg',
      excerpt: 'Razer presenta su revolucionario teclado con los switches más rápidos del mercado.'
    },
    {
      id: 8,
      title: 'La realidad virtual avanza: Análisis del Meta Quest 4',
      category: 'hardware',
      date: '10 Abril 2025',
      image: 'https://i.ytimg.com/vi/WFdj-j1e-IA/maxresdefault.jpg',
      excerpt: 'Probamos el nuevo visor de Meta que promete revolucionar la experiencia VR con tecnología de eye-tracking.'
    }
  ];
  
  /**
   * Filtra las noticias según la categoría activa y el término de búsqueda
   * Devuelve un array con las noticias que cumplen ambas condiciones
   */
  const filteredNews = noticias.filter(noticia => {
    // Una noticia coincide si está en la categoría seleccionada (o si se muestra 'all')
    const matchesCategory = activeCategory === 'all' || noticia.category === activeCategory;
    
    // Una noticia coincide si el término de búsqueda está en el título o resumen
    const matchesSearch = noticia.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          noticia.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Solo devuelve true si la noticia cumple ambas condiciones
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950">
      {/* Banner principal (Hero) */}
      <div className="relative bg-black overflow-hidden">
        {/* Gradiente oscuro sobre la imagen para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        
        {/* Imagen de fondo del banner */}
        <img 
          src="https://source.unsplash.com/1920x500/?gaming" 
          alt="Gaming News" 
          className="w-full h-80 object-cover opacity-50"
        />
        
        {/* Contenido de texto del banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">
            Noticias Gaming
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl text-center">
            Las últimas novedades del mundo gamer: juegos, hardware, eventos y más
          </p>
        </div>
      </div>

      {/* Contenedor principal para el resto del contenido */}
      <div className="container mx-auto px-4 py-6">
        {/* Barra de búsqueda y filtros */}
        <div className="bg-black bg-opacity-70 rounded-xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Campo de búsqueda */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar noticias..."
                  className="w-full bg-gray-900 border border-red-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>
            
            {/* Botones de filtro por categoría */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
              {/* Nota: Los botones de categoría están comentados en el código original */}
              {/* Aquí irían los botones para filtrar por categoría */}
            </div>
          </div>
        </div>
        
        {/* Sección de noticias destacadas (solo se muestra si hay noticias destacadas) */}
        {filteredNews.some(noticia => noticia.highlighted) && (
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-600 pl-4">Noticias Destacadas</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mapeo de noticias destacadas */}
              {filteredNews
                .filter(noticia => noticia.highlighted) // Solo noticias con highlighted=true
                .map(noticia => (
                  <div 
                    key={noticia.id} 
                    className="news-card bg-black opacity-0 transform translate-y-4 transition-all duration-700 rounded-xl overflow-hidden border border-red-700 shadow-lg shadow-red-900/30"
                  >
                    {/* Imagen de la noticia con superposición de gradiente */}
                    <div className="relative">
                      <img 
                        src={noticia.image} 
                        alt={noticia.title} 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      
                      {/* Etiqueta de categoría */}
                      <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {noticia.category.charAt(0).toUpperCase() + noticia.category.slice(1)}
                      </span>
                    </div>
                    
                    {/* Contenido de texto de la noticia */}
                    <div className="p-6">
                      {/* Fecha de publicación */}
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <span className="mr-2">📅</span>
                        <span>{noticia.date}</span>
                      </div>
                      
                      {/* Título y extracto */}
                      <h3 className="text-2xl font-bold text-white mb-3">{noticia.title}</h3>
                      <p className="text-gray-300 mb-4">{noticia.excerpt}</p>
                      
                      {/* Botón "Leer más" */}
                      <button onClick={() => window.location.href = '/news-detail'} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
                        Leer más
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Sección de todas las noticias */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-600 pl-4">Últimas Noticias</h2>
          
          {/* Mensaje cuando no hay noticias que coincidan con los filtros */}
          {filteredNews.length === 0 ? (
            <div className="bg-black bg-opacity-80 p-10 rounded-xl text-center">
              <p className="text-white text-xl">No se encontraron noticias que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            /* Cuadrícula de tarjetas de noticias */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mapeo de noticias (excluyendo las destacadas si estamos en vista general) */}
              {filteredNews
                .filter(noticia => !noticia.highlighted || activeCategory !== 'all' || searchTerm)
                .map(noticia => (
                  <div 
                    key={noticia.id} 
                    className="news-card bg-black opacity-0 transform translate-y-4 transition-all duration-700 rounded-xl overflow-hidden border border-red-800 hover:border-red-600 shadow-md hover:shadow-lg shadow-red-900/20 hover:shadow-red-900/40"
                  >
                    {/* Imagen de la noticia con superposición de gradiente */}
                    <div className="relative">
                      <img 
                        src={noticia.image} 
                        alt={noticia.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                      
                      {/* Etiqueta de categoría */}
                      <span className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                        {noticia.category.charAt(0).toUpperCase() + noticia.category.slice(1)}
                      </span>
                    </div>
                    
                    {/* Contenido de texto de la noticia */}
                    <div className="p-4">
                      {/* Fecha de publicación */}
                      <div className="flex items-center text-gray-400 text-xs mb-2">
                        <span className="mr-1">📅</span>
                        <span>{noticia.date}</span>
                      </div>
                      
                      {/* Título y extracto */}
                      <h3 className="text-xl font-bold text-white mb-2">{noticia.title}</h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{noticia.excerpt}</p>
                      
                      {/* Enlace "Leer más" */}
                      <button className="text-red-500 hover:text-red-400 text-sm font-semibold transition flex items-center">
                        Leer más <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        
        {/* Paginación */}
        <div className="mt-10 flex justify-center">
          <div className="flex space-x-2">
            {/* Botón "Anterior" */}
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-black border border-red-800 text-white hover:bg-red-900 transition">
              {/* Aquí iría el icono de "anterior" */}
            </button>
            
            {/* Botones de página */}
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-600 text-white">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-black border border-red-800 text-white hover:bg-red-900 transition">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-black border border-red-800 text-white hover:bg-red-900 transition">
              3
            </button>
            
            {/* Botón "Siguiente" */}
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-black border border-red-800 text-white hover:bg-red-900 transition">
              {/* Aquí iría el icono de "siguiente" */}
            </button>
          </div>
        </div>
        
        {/* Sección de suscripción al boletín de noticias */}
        <div className="mt-16 mb-8">
          <div className="bg-black bg-opacity-80 rounded-xl p-6 border border-red-800">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Texto promocional */}
              <div className="text-center md:text-left md:flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">¿No te quieres perder nada?</h3>
                <p className="text-gray-300">Suscríbete a nuestro newsletter y recibe las mejores noticias gaming en tu correo.</p>
              </div>
              
              {/* Formulario de suscripción */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="bg-gray-900 border border-red-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition whitespace-nowrap">
                  Suscribirme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Estilos CSS personalizados para animaciones */}
      <style jsx>{`
        /* Cuando una tarjeta de noticia tiene la clase 'visible', se vuelve totalmente opaca y se mueve a su posición final */
        .news-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}