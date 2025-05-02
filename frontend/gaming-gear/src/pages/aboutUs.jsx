import { useState, useEffect } from 'react';

/**
 * Componente AboutUs - Página "Sobre Nosotros" para la tienda Gaming Gear
 * 
 * Este componente renderiza la página con información sobre la empresa, misión,
 * visión, objetivos, productos y equipo. Incluye efectos visuales de animación
 * cuando el usuario hace scroll por las diferentes secciones.
 * 
 * @returns {JSX.Element} Página completa de "Sobre Nosotros"
 */
export default function AboutUs() {
  // Estado para rastrear qué sección está activa en el viewport
  const [activeSection, setActiveSection] = useState(null);

  /**
   * Efecto para detectar qué sección está visible en el viewport
   * Utiliza IntersectionObserver para monitorear las secciones visibles
   */
  useEffect(() => {
    // Configuración del observer para detectar cuando una sección es visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Cuando una sección es visible, actualiza el estado
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // La sección debe ser 60% visible para considerarse activa
    );

    // Selecciona todas las secciones y las observa
    const sections = document.querySelectorAll('.section-container');
    sections.forEach((section) => observer.observe(section));

    // Limpieza: deja de observar las secciones cuando el componente se desmonta
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  /**
   * Efecto para animar las secciones al hacer scroll
   * Añade la clase 'visible' a las secciones cuando entran en el viewport
   */
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section-container');
      sections.forEach((section) => {
        // Calcula si la sección está visible en el viewport
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        
        // Si la sección es visible, añade la clase para activar la animación
        if (isVisible) {
          section.classList.add('visible');
        }
      });
    };

    // Registra el manejador de eventos de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Ejecuta el handler al cargar inicialmente para animar secciones ya visibles
    handleScroll();
    
    // Limpieza: elimina el event listener cuando el componente se desmonta
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 w-full">
      {/* Cabecera de la página */}
      <div className="w-full bg-red-600 py-6 md:py-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white px-4">
          Sobre Nosotros
        </h1>
      </div>

      {/* Contenedor principal */}
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex-grow">
        
        {/* Sección de Bienvenida */}
        <div 
          id="welcome"
          className="section-container w-full max-w-10xl mx-auto mb-6 sm:mb-10 bg-black rounded-lg sm:rounded-xl border border-red-600 shadow-lg shadow-red-600/20 overflow-hidden transition-all duration-700 opacity-0 transform translate-y-8"
        >
          <div className="p-4 sm:p-6 md:p-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6 flex items-center justify-center flex-wrap">
              Bienvenidos a Gaming Gear 
            </h2>
            
            <p className="text-sm sm:text-base text-gray-300 mb-2 sm:mb-4">
              En <span className="text-red-500 font-semibold">Gaming Gear</span>, nos apasiona el mundo gamer y trabajamos para ofrecerte 
              videojuegos, hardware y accesorios de alta calidad a precios accesibles. 
              Nuestro equipo está formado por jugadores que entienden tus gustos y 
              atención de primera. ¡Tu siguiente nivel comienza aquí!
            </p>
          </div>
        </div>

        {/* Sección de Misión */}
        <div 
          id="mission"
          className="section-container w-full max-w-10xl mx-auto mb-6 sm:mb-10 bg-black rounded-lg sm:rounded-xl border border-red-600 shadow-lg shadow-red-600/20 overflow-hidden transition-all duration-700 opacity-0 transform translate-y-8"
        >
          <div className="p-4 sm:p-6 md:p-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6 flex items-center justify-center flex-wrap">
              Nuestra Misión
            </h2>
            
            <p className="text-sm sm:text-base text-gray-300">
              Democratizar el acceso a la mejor tecnología gamer, ofreciendo productos de calidad y un servicio a domicilio 
              eficiente para que disfrutes de tus juegos favoritos sin complicaciones.
            </p>
          </div>
        </div>

        {/* Sección de Visión */}
        <div 
          id="vision"
          className="section-container w-full max-w-10xl mx-auto mb-6 sm:mb-10 bg-black rounded-lg sm:rounded-xl border border-red-600 shadow-lg shadow-red-600/20 overflow-hidden transition-all duration-700 opacity-0 transform translate-y-8"
        >
          <div className="p-4 sm:p-6 md:p-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6 flex items-center justify-center flex-wrap">
              Nuestra Visión
            </h2>
            
            <p className="text-sm sm:text-base text-gray-300 mb-2">
              Ser la tienda gamer líder, reconocida por su <span className="font-semibold text-red-400">calidad</span>, <span className="font-semibold text-red-400">accesibilidad</span> y <span className="font-semibold text-red-400">excelente atención</span>.
            </p>
            <p className="text-sm sm:text-base text-gray-300">
              Queremos crear una comunidad apasionada e inclusiva, conectando jugadores y apoyando nuevos talentos en la industria.
            </p>
          </div>
        </div>

        {/* Sección de Objetivos */}
        <div 
          id="objectives"
          className="section-container w-full max-w-10xl mx-auto mb-6 sm:mb-10 bg-black rounded-lg sm:rounded-xl border border-red-600 shadow-lg shadow-red-600/20 overflow-hidden transition-all duration-700 opacity-0 transform translate-y-8"
        >
          <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6 text-center flex items-center justify-center flex-wrap">
              Nuestros Objetivos
            </h2>
            
            <ul className="text-sm sm:text-base text-gray-300 space-y-2 sm:space-y-4 max-w-4xl mx-auto">
              <li className="flex items-start">
                <span>Ampliar nuestra gama de productos con lo último en videojuegos y hardware.</span>
              </li>
              <li className="flex items-start">
                <span>Mejorar la experiencia de compra con una interfaz intuitiva y recomendaciones personalizadas.</span>
              </li>
              <li className="flex items-start">
                <span>Crear un programa de fidelización con recompensas y descuentos exclusivos.</span>
              </li>
              <li className="flex items-start">
                <span>Expandir nuestro servicio a domicilio con entregas rápidas y seguimiento en tiempo real.</span>
              </li>
              <li className="flex items-start">
                <span>Fomentar la comunidad gaming con eventos, torneos y colaboraciones con streamers.</span>
              </li>
              <li className="flex items-start">
                <span>Mantener precios accesibles y ofrecer opciones de financiamiento flexibles.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sección de Productos */}
        <div 
          id="products"
          className="section-container w-full max-w-10xl mx-auto mb-6 sm:mb-10 bg-black rounded-lg sm:rounded-xl border border-red-600 shadow-lg shadow-red-600/20 overflow-hidden transition-all duration-700 opacity-0 transform translate-y-8"
        >
          <div className="p-4 sm:p-6 md:p-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
              Nuestros Productos
            </h2>
            
            {/* Grid de categorías de productos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 text-center">
              <div className="p-2 sm:p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition duration-300">
                <div className="text-sm sm:text-base text-white">Videojuegos</div>
              </div>
              <div className="p-2 sm:p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition duration-300">
                <div className="text-sm sm:text-base text-white">Consolas</div>
              </div>
              <div className="p-2 sm:p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition duration-300">
                <div className="text-sm sm:text-base text-white">Hardware</div>
              </div>
              <div className="p-2 sm:p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition duration-300">
                <div className="text-sm sm:text-base text-white">Accesorios</div>
              </div>
              <div className="p-2 sm:p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition duration-300">
                <div className="text-sm sm:text-base text-white">Entrega a domicilio</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección del Equipo */}
        <div 
          id="team"
          className="section-container w-full max-w-10xl mx-auto mb-6 sm:mb-10 bg-black rounded-lg sm:rounded-xl border border-red-600 shadow-lg shadow-red-600/20 overflow-hidden transition-all duration-700 opacity-0 transform translate-y-8"
        >
          <div className="p-4 sm:p-6 md:p-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6 flex items-center justify-center flex-wrap">
              Nuestro Equipo
            </h2>
            
            {/* Grid de miembros del equipo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto">
              {/* Miembro 1 */}
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full bg-red-800 flex items-center justify-center mb-2 sm:mb-4">
                  {/* Placeholder para avatar/foto */}
                </div>
                <h3 className="text-sm sm:text-base text-white font-bold">Luis Fernando</h3>
                <p className="text-xs sm:text-sm text-red-400">Fundador & CEO</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">Gamer desde los 5 años, experto en FPS</p>
              </div>
              
              {/* Miembro 2 */}
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full bg-red-800 flex items-center justify-center mb-2 sm:mb-4">
                  {/* Placeholder para avatar/foto */}
                </div>
                <h3 className="text-sm sm:text-base text-white font-bold">Guillermo Chávez</h3>
                <p className="text-xs sm:text-sm text-red-400">Director de Operaciones</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">Especialista en logística y experiencia de cliente</p>
              </div>
              
              {/* Miembro 3 */}
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full bg-red-800 flex items-center justify-center mb-2 sm:mb-4">
                  {/* Placeholder para avatar/foto */}
                </div>
                <h3 className="text-sm sm:text-base text-white font-bold">Rafael Vargas</h3>
                <p className="text-xs sm:text-sm text-red-400">Técnico especialista</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">Maestro del hardware y las configuraciones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Términos y Condiciones */}
        <div 
          id="terms-button"
          className="section-container w-full max-w-10xl mx-auto mb-8 sm:mb-16 text-center transition-all duration-700 opacity-0 transform translate-y-8"
        >
          <div className="p-4 sm:p-6 bg-black rounded-lg sm:rounded-xl border border-red-600 shadow-lg shadow-red-600/20 overflow-hidden">
            <div className="flex flex-col items-center">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">¿Conoces nuestros términos y condiciones?</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-3 sm:mb-4">
                Antes de realizar tu compra, te invitamos a conocer nuestras políticas, garantías y condiciones de servicio.
              </p>
              <a 
                href="/terminos" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Ver Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        /* Cuando una sección se vuelve visible, se aplica esta animación */
        .section-container.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Ajustes responsivos para pantallas muy pequeñas */
        @media screen and (max-width: 360px) {
          h1 {
            font-size: 1.5rem;
          }
          h2 {
            font-size: 1.25rem;
          }
          p, li {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}