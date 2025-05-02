import { useState, useEffect } from 'react';



export default function NoticiaDetalle() {
  
  
  useEffect(() => {
    // Efecto para animación de entrada del contenido
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);
  
  // Datos de ejemplo para la noticia
  const noticia = {
    id: 4,
    title: 'Análisis: Red Dead Redemption 3 supera todas las expectativas',
    category: 'juegos',
    date: '20 Abril 2025',
    author: 'Miguel García',
    readTime: '8 min',
    image: '/placeholder/1200/600',
    content: [
      {
        type: 'paragraph',
        text: 'Rockstar Games ha vuelto a demostrar por qué es uno de los estudios más respetados de la industria con el lanzamiento de Red Dead Redemption 3, una obra maestra que eleva el listón de lo que esperamos de un juego de mundo abierto. La espera ha sido larga —casi seis años desde el lanzamiento de RDR2— pero cada minuto de desarrollo se refleja en un producto pulido hasta el último detalle.'
      },
      {
        type: 'subtitle',
        text: 'Un mundo que respira'
      },
      {
        type: 'paragraph',
        text: 'Lo primero que impresiona al comenzar esta nueva aventura es la inmensidad y el nivel de detalle del mapa. Ambientado en 1889, unos años después de los eventos del primer Red Dead Redemption, el juego nos traslada a los territorios fronterizos entre Estados Unidos y México, con paisajes que van desde montañas nevadas hasta desiertos ardientes.'
      },
      {
        type: 'paragraph',
        text: 'Cada localización está construida con un cuidado meticuloso. Los pueblos y ciudades están llenos de vida, con habitantes que siguen rutinas creíbles según la hora del día. La fauna salvaje se comporta de manera orgánica, y los efectos climáticos son simplemente espectaculares. Una tormenta eléctrica en las llanuras es una experiencia visual que difícilmente olvidarás.'
      },
      {
        type: 'image',
        src: '/placeholder/800/400',
        caption: 'Los paisajes de Red Dead Redemption 3 son impresionantes en todas las plataformas'
      },
      {
        type: 'subtitle',
        text: 'Una historia memorable'
      },
      {
        type: 'paragraph',
        text: 'En esta entrega controlamos a Sarah Morgan, una ex-forajida que intenta dejar atrás su pasado criminal. Sin embargo, cuando su hermano es secuestrado por una peligrosa banda, Sarah se ve obligada a desempolvar sus revólveres y adentrarse en el peligroso mundo que había abandonado.'
      },
      {
        type: 'paragraph',
        text: 'La narrativa es madura, llena de momentos impactantes y personajes complejos. Los diálogos son brillantes, y las actuaciones de voz están a la altura de cualquier producción cinematográfica de primera línea. La evolución de Sarah a lo largo de las aproximadamente 50 horas de campaña principal es uno de los mejores arcos de personaje que hemos visto en un videojuego.'
      },
      {
        type: 'quote',
        text: '"Red Dead Redemption 3 no es solo un juego, es una experiencia que te absorbe completamente en su mundo y te hace sentir cada emoción de sus personajes."'
      },
      {
        type: 'subtitle',
        text: 'Jugabilidad refinada'
      },
      {
        type: 'paragraph',
        text: 'Rockstar ha perfeccionado el sistema de combate, haciéndolo más fluido y satisfactorio. Los tiroteos son intensos, con un sistema de cobertura mejorado y una física de daño realista. El combate cuerpo a cuerpo también ha recibido una importante actualización, siendo ahora más táctico y menos dependiente de pulsar repetidamente botones.'
      },
      {
        type: 'paragraph',
        text: 'El sistema de "Dead Eye" regresa con nuevas habilidades que se desbloquean a medida que avanzamos. La caza, la pesca y otras actividades secundarias han sido expandidas considerablemente, ofreciendo ahora pequeñas historias asociadas que enriquecen la experiencia.'
      },
      {
        type: 'image',
        src: '/placeholder/800/400',
        caption: 'El sistema de combate ha sido mejorado significativamente respecto a entregas anteriores'
      },
      {
        type: 'subtitle',
        text: 'Un apartado técnico sobresaliente'
      },
      {
        type: 'paragraph',
        text: 'En PS5 y Xbox Series X, el juego mantiene un rendimiento sólido a 60 fps con una resolución dinámica que rara vez baja de los 4K. En PC, con el hardware adecuado, es simplemente espectacular. El ray tracing aplicado a las fuentes de luz y reflejos crea ambientes de un realismo sin precedentes.'
      },
      {
        type: 'paragraph',
        text: 'El diseño sonoro merece una mención especial. Desde el crujir de la nieve bajo tus botas hasta el silbido del viento entre los cañones, cada sonido contribuye a la inmersión. La banda sonora, compuesta por Woody Jackson, acompaña perfectamente cada momento del juego, intensificando las emociones sin resultar intrusiva.'
      },
      {
        type: 'subtitle',
        text: 'Componente online prometedor'
      },
      {
        type: 'paragraph',
        text: 'Red Dead Online regresa con un sistema de progresión más profundo y una mayor variedad de actividades. Rockstar parece haber aprendido de la experiencia con GTA Online y RDR2 Online, ofreciendo desde el principio un modo multijugador robusto con suficiente contenido para mantenerte enganchado durante meses.'
      },
      {
        type: 'subtitle',
        text: 'Conclusión'
      },
      {
        type: 'paragraph',
        text: 'Red Dead Redemption 3 no solo cumple con las expectativas, sino que las supera ampliamente. Es un juego que define la generación actual de consolas y establece nuevos estándares para los mundos abiertos. Con una narrativa emotiva, personajes memorables, jugabilidad refinada y un apartado técnico de primera, es difícil encontrar fallos significativos en esta obra maestra.'
      },
      {
        type: 'paragraph',
        text: 'Si eres fan de la saga, ya estarás jugándolo. Y si aún no has entrado en el salvaje oeste de Rockstar, no hay mejor momento que este. Red Dead Redemption 3 es, sin duda, uno de los mejores juegos de la década.'
      }
    ],
    rating: 9.8,
    tags: ['Open World', 'Western', 'Action', 'Adventure', 'Rockstar Games'],
    relatedNews: [
      {
        id: 9,
        title: 'Rockstar anuncia el primer DLC para Red Dead Redemption 3',
        image: '/placeholder/300/180',
        date: '24 Abril 2025'
      },
      {
        id: 10,
        title: 'Los mejores Easter Eggs encontrados en Red Dead Redemption 3',
        image: '/placeholder/300/180',
        date: '22 Abril 2025'
      },
      {
        id: 11,
        title: 'Guía de inicio: consejos para sobrevivir en Red Dead Redemption 3',
        image: '/placeholder/300/180',
        date: '21 Abril 2025'
      }
    ]
  };
  
  // Compartir en redes sociales (simulado)
  const handleShare = (platform) => {
    console.log(`Compartir en ${platform}`);
    // En una implementación real, aquí iría la lógica para compartir
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950">
      {/* Hero Banner */}
      <div className="relative bg-black overflow-hidden h-96 md:h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
        <img 
          src={`/api${noticia.image}`} 
          alt={noticia.title} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20">
          <div className="container mx-auto max-w-4xl">
            <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold mb-4">
              {noticia.category.charAt(0).toUpperCase() + noticia.category.slice(1)}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {noticia.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
              <div className="flex items-center">
                <span className="mr-2">👤</span>
                <span>Por {noticia.author}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📅</span>
                <span>{noticia.date}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">⏱️</span>
                <span>Lectura: {noticia.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-black bg-opacity-70">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Inicio
            </Link>
            <span className="mx-2">→</span>
            <Link href="/noticias" className="hover:text-white transition">
              Noticias
            </Link>
            <span className="mx-2">→</span>
            <Link href={`/noticias/${noticia.category}`} className="hover:text-white transition">
              {noticia.category.charAt(0).toUpperCase() + noticia.category.slice(1)}
            </Link>
            <span className="mx-2">→</span>
            <span className="text-gray-500 truncate">
              {noticia.title.length > 30 ? noticia.title.substring(0, 30) + '...' : noticia.title}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3 animate-section opacity-0 transform translate-y-4 transition-all duration-700">
            <div className="bg-black bg-opacity-80 rounded-xl p-6 md:p-8 mb-8 shadow-lg">
              {/* Article Content */}
              <div className="prose prose-invert max-w-none">
                {noticia.content.map((section, index) => {
                  if (section.type === 'paragraph') {
                    return <p key={index} className="text-gray-300 mb-4">{section.text}</p>;
                  } else if (section.type === 'subtitle') {
                    return <h2 key={index} className="text-2xl font-bold text-white mt-6 mb-4">{section.text}</h2>;
                  } else if (section.type === 'image') {
                    return (
                      <figure key={index} className="my-6">
                        <img 
                          src={`/api${section.src}`} 
                          alt={section.caption} 
                          className="w-full rounded-lg"
                        />
                        <figcaption className="mt-2 text-sm text-center text-gray-400">{section.caption}</figcaption>
                      </figure>
                    );
                  } else if (section.type === 'quote') {
                    return (
                      <blockquote key={index} className="border-l-4 border-red-600 pl-4 my-6 italic text-gray-300">
                        <p>{section.text}</p>
                      </blockquote>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Rating */}
              <div className="mt-10 mb-6 flex items-center">
                <div className="bg-gray-900 rounded-xl p-4 inline-flex items-center">
                  <div className="text-4xl font-bold text-red-500 mr-3">{noticia.rating}</div>
                  <div className="flex flex-col">
                    <div className="text-gray-400 text-sm">Puntuación</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-8">
                <div className="text-white font-semibold mb-2">Etiquetas:</div>
                <div className="flex flex-wrap gap-2">
                  {noticia.tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      href={`/noticias/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm transition"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 border-t border-gray-800 pt-6">
                <div className="text-white font-semibold mb-3">Compartir:</div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
                  >
                    <span className="text-lg">𝕏</span>
                  </button>
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="bg-blue-800 hover:bg-blue-900 text-white p-2 rounded-full transition"
                  >
                    <span className="text-lg">f</span>
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                  >
                    <span className="text-lg">W</span>
                  </button>
                  <button 
                    onClick={() => handleShare('telegram')}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
                  >
                    <span className="text-lg">T</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section (Mock) */}
            <div className="bg-black bg-opacity-80 rounded-xl p-6 md:p-8 animate-section opacity-0 transform translate-y-4 transition-all duration-700">
              <h3 className="text-xl font-bold text-white mb-6">Comentarios (12)</h3>
              
              {/* Comment Form */}
              <div className="mb-8">
                <textarea 
                  placeholder="Deja tu comentario..." 
                  className="w-full bg-gray-900 text-white rounded-lg p-4 border border-gray-800 focus:border-red-600 focus:outline-none resize-none"
                  rows={4}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
                    Publicar comentario
                  </button>
                </div>
              </div>
              
              {/* Sample Comments */}
              <div className="space-y-6">
                {/* Comment 1 */}
                <div className="border-b border-gray-800 pb-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-red-800 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">👤</span>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-white font-bold">Roberto Mendez</h4>
                        <span className="text-gray-500 text-sm">Hace 2 horas</span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Estoy completamente de acuerdo con el análisis. Ya llevo 20 horas de juego y el nivel de detalle es increíble. La misión del tren en el capítulo 3 es una de las mejores experiencias que he tenido en un videojuego.
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <button className="text-gray-500 hover:text-red-500 text-sm flex items-center">
                          <span className="mr-1">👍</span> 8
                        </button>
                        <button className="text-gray-500 hover:text-red-500 text-sm flex items-center">
                          <span className="mr-1">💬</span> Responder
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reply */}
                  <div className="ml-12 mt-4 pl-4 border-l border-gray-800">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-md">👤</span>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-white font-bold">Alicia Torres</h4>
                          <span className="text-gray-500 text-sm">Hace 1 hora</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          ¡Todavía no he llegado a esa parte! Ahora tengo más ganas de seguir avanzando.
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <button className="text-gray-500 hover:text-red-500 text-sm flex items-center">
                            <span className="mr-1">👍</span> 3
                          </button>
                          <button className="text-gray-500 hover:text-red-500 text-sm flex items-center">
                            <span className="mr-1">💬</span> Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Comment 2 */}
                <div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-red-800 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">👤</span>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-white font-bold">Carlos Jiménez</h4>
                        <span className="text-gray-500 text-sm">Hace 5 horas</span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Creo que el análisis es demasiado generoso. El juego tiene bugs en las misiones secundarias y el rendimiento en PC podría ser mejor. Aunque estoy de acuerdo en que la historia y los gráficos son impresionantes.
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <button className="text-gray-500 hover:text-red-500 text-sm flex items-center">
                          <span className="mr-1">👍</span> 4
                        </button>
                        <button className="text-gray-500 hover:text-red-500 text-sm flex items-center">
                          <span className="mr-1">💬</span> Responder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Show More */}
              <div className="mt-6 text-center">
                <button className="text-red-500 hover:text-red-400 font-medium">
                  Ver más comentarios
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Author */}
            <div className="bg-black bg-opacity-80 rounded-xl p-6 mb-6 animate-section opacity-0 transform translate-y-4 transition-all duration-700">
              <h3 className="text-xl font-bold text-white mb-4">Sobre el autor</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-red-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">👤</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold">{noticia.author}</h4>
                  <p className="text-gray-400 text-sm">Editor Senior de Gaming Gear</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Especialista en juegos de mundo abierto y RPGs. Con más de 10 años de experiencia en el periodismo de videojuegos, sus análisis se caracterizan por su profundidad y atención al detalle.
              </p>
              <div className="mt-4">
                <button className="text-red-500 hover:text-red-400 text-sm font-medium">
                  Ver todos sus artículos →
                </button>
              </div>
            </div>
            
            {/* Related News */}
            <div className="bg-black bg-opacity-80 rounded-xl p-6 mb-6 animate-section opacity-0 transform translate-y-4 transition-all duration-700">
              <h3 className="text-xl font-bold text-white mb-4">Noticias relacionadas</h3>
              <div className="space-y-4">
                {noticia.relatedNews.map(related => (
                  <Link key={related.id} href={`/noticias/${related.id}`} className="block">
                    <div className="group flex items-start">
                      <img 
                        src={`/api${related.image}`} 
                        alt={related.title} 
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="ml-3">
                        <h4 className="text-white font-medium group-hover:text-red-400 transition line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-gray-400 text-xs mt-1">{related.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/noticias/juegos" className="text-red-500 hover:text-red-400 text-sm font-medium">
                  Ver más noticias de juegos →
                </Link>
              </div>
            </div>
            
            {/* Popular Games */}
            <div className="bg-black bg-opacity-80 rounded-xl p-6 mb-6 animate-section opacity-0 transform translate-y-4 transition-all duration-700">
              <h3 className="text-xl font-bold text-white mb-4">Juegos populares</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900 rounded-lg p-2 text-center">
                  <img 
                    src="/api/placeholder/120/120" 
                    alt="GTA VI" 
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <h4 className="text-white text-sm font-medium">GTA VI</h4>
                  <p className="text-red-500 text-xs">Próximamente</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-2 text-center">
                  <img 
                    src="/api/placeholder/120/120" 
                    alt="FIFA 26" 
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <h4 className="text-white text-sm font-medium">FIFA 26</h4>
                  <p className="text-yellow-500 text-xs">$70</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-2 text-center">
                  <img 
                    src="/api/placeholder/120/120" 
                    alt="Call of Duty" 
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <h4 className="text-white text-sm font-medium">COD: Modern Warfare</h4>
                  <p className="text-yellow-500 text-xs">$60</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-2 text-center">
                  <img 
                    src="/api/placeholder/120/120" 
                    alt="Cyberpunk 2078" 
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <h4 className="text-white text-sm font-medium">Cyberpunk 2078</h4>
                  <p className="text-green-500 text-xs">$45</p>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/tienda/juegos" className="text-red-500 hover:text-red-400 text-sm font-medium">
                  Ver tienda →
                </Link>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-black bg-opacity-80 rounded-xl p-6 animate-section opacity-0 transform translate-y-4 transition-all duration-700">
              <h3 className="text-xl font-bold text-white mb-4">Suscríbete</h3>
              <p className="text-gray-300 text-sm mb-4">
                Recibe las últimas noticias y ofertas especiales directamente en tu correo.
              </p>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full bg-gray-900 border border-gray-800 focus:border-red-600 rounded-lg py-2 px-4 text-white focus:outline-none mb-3"
              />
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition">
                Suscribirme
              </button>
            </div>
          </div>
        </div>
        
        {/* Back to News Button */}
        <div className="mt-10 mb-12 text-center">
          <Link 
            href="/noticias" 
            className="inline-flex items-center bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-6 py-3 rounded-lg transition border border-red-800 hover:border-red-600"
          >
            <span className="mr-2">←</span>
            Volver a todas las noticias
          </Link>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}