import { useState } from 'react';

/**
 * Componente TerminosCondiciones
 * 
 * Este componente muestra una página de términos y condiciones con secciones
 * desplegables que el usuario puede expandir o contraer interactivamente.
 */
export default function TerminosCondiciones() {
  // Estado para controlar qué sección está activamente expandida (null si ninguna)
  const [activeSection, setActiveSection] = useState(null);

  /**
   * Función para navegar a la página de inicio
   * Normalmente se utilizaría con React Router
   */
  const navigateToHome = () => {
    // Redirigir a la página de inicio
    window.location.href = '/';
  };

  /**
   * Array con las secciones de términos y condiciones
   * Cada sección tiene un id, título y contenido
   */
  const secciones = [
    {
      id: 1,
      titulo: 'Introducción',
      contenido: 'Bienvenido a Gaming Gear. Al acceder a nuestro sitio web y realizar compras, aceptas nuestros términos y condiciones.'
    },
    {
      id: 2,
      titulo: 'Uso del Sitio',
      contenido: 'Este sitio es para uso personal y no comercial. No puedes copiar, modificar o distribuir el contenido sin permiso.'
    },
    {
      id: 3,
      titulo: 'Compras y Pagos',
      contenido: 'Los productos deben pagarse en su totalidad antes del envío. Nos reservamos el derecho de rechazar cualquier compra sospechosa.'
    },
    {
      id: 4,
      titulo: 'Envíos y Devoluciones',
      contenido: 'Garantizamos envíos rápidos, pero los tiempos pueden variar según la ubicación. Las devoluciones solo aplican a productos en su estado original.'
    },
    {
      id: 5,
      titulo: 'Privacidad',
      contenido: 'Respetamos tu privacidad. Consulta nuestra política de privacidad para más detalles sobre cómo protegemos tu información.'
    }
  ];

  /**
   * Función para alternar la visibilidad de una sección
   * Si la sección ya está activa, la cierra (null)
   * Si está cerrada, la abre (establece su id como activa)
   * 
   * @param {number} id - El identificador de la sección a alternar
   */
  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-800">
      {/* Cabecera de la página */}
      <header className="bg-red-900 text-white py-10 text-center shadow-lg w-full">
        <h1 className="text-5xl font-bold">Términos y Condiciones</h1>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow p-8 md:p-12 w-full">
        {/* Contenedor de las secciones acordeón */}
        <div className="w-full mx-auto bg-gray-800 rounded-lg overflow-hidden">
          {/* Iteramos sobre cada sección para crear el acordeón */}
          {secciones.map((seccion) => (
            <div 
              key={seccion.id}
              className="mb-8 overflow-hidden rounded-lg border-2 border-gray-700 transition-all duration-300 w-full"
            >
              {/* Botón para expandir/contraer cada sección */}
              <button
                className="w-full text-left px-10 py-6 bg-gray-900 hover:bg-gray-800 transition-colors duration-200 flex justify-between items-center"
                onClick={() => toggleSection(seccion.id)}
                aria-expanded={activeSection === seccion.id}
                aria-controls={`section-content-${seccion.id}`}
              >
                <h2 className="text-3xl font-semibold">
                  <span className="text-red-500 mr-4">{seccion.id}.</span>
                  <span className="text-white">{seccion.titulo}</span>
                </h2>
                {/* Símbolo de expansión/contracción (+ o -) */}
                <span className="text-red-500 text-3xl">
                  {activeSection === seccion.id ? '−' : '+'}
                </span>
              </button>
              
              {/* Contenido de la sección (visible/oculto según estado) */}
              <div 
                id={`section-content-${seccion.id}`}
                className={`bg-black text-gray-300 transition-all duration-300 ${
                  activeSection === seccion.id ? 'max-h-96 px-10 py-8' : 'max-h-0 overflow-hidden p-0'
                }`}
              >
                <p className="leading-relaxed text-xl">{seccion.contenido}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botón para volver al inicio */}
        <div className="flex justify-center mt-12 gap-8">
          <button 
            onClick={navigateToHome}
            className="px-12 py-4 bg-red-600 text-white text-xl rounded-md shadow-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
          >
            Volver al inicio
          </button>
        </div>
      </main>
    </div>
  );
}