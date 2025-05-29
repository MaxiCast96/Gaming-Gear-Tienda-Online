import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CustomerSupportInterface() {
  const [accordionState, setAccordionState] = useState({
    pedido: false,
    direccion: false,
    devolucion: false
  });

  const toggleAccordion = (key) => {
    setAccordionState(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-red-500 mb-2">Soporte al Cliente - Gaming Gear</h1>
          <div className="h-1 w-32 bg-red-500 rounded"></div>
        </header>

        {/* Contact Form */}
        <section className="mb-10 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Contáctanos</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block mb-1 font-medium">Nombre:</label>
              <input
                id="nombre"
                type="text"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Correo Electrónico:</label>
              <input
                id="email"
                type="email"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Tu correo electrónico"
              />
            </div>

            <div>
              <label htmlFor="asunto" className="block mb-1 font-medium">Asunto:</label>
              <input
                id="asunto"
                type="text"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="El motivo de tu consulta"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block mb-1 font-medium">Mensaje:</label>
              <textarea
                id="mensaje"
                rows="5"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Escribe tu mensaje aquí"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Enviar
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Respuestas Automáticas</h2>
          <p className="text-gray-300 mb-6">A continuación, algunos temas frecuentes y respuestas automáticas que puedes revisar:</p>

          <div className="space-y-4">
            {/* Accordion Items */}
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <button 
                className="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                onClick={() => toggleAccordion('pedido')}
              >
                <span className="text-lg font-medium text-red-400">¿Cómo realizar un pedido?</span>
                {accordionState.pedido ? <ChevronUp size={20} /> : <ChevronDown size={20} /> }
              </button>
              {accordionState.pedido && (
                <div className="p-4 bg-gray-750 border-t border-gray-700">
                  <p>Para realizar un pedido, simplemente añade los productos al carrito y procede a pagar. El sistema te guiará a través del proceso de checkout donde podrás revisar tu pedido, seleccionar método de envío y realizar el pago de forma segura.</p>
                </div>
              )}
            </div>

            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <button 
                className="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                onClick={() => toggleAccordion('direccion')}
              >
                <span className="text-lg font-medium text-red-400">¿Puedo cambiar mi dirección de envío?</span>
                {accordionState.direccion ? <ChevronUp size={20} /> : <ChevronDown size={20} /> }
              </button>
              {accordionState.direccion && (
                <div className="p-4 bg-gray-750 border-t border-gray-700">
                  <p>Si necesitas cambiar la dirección de envío, por favor contacta con nosotros lo antes posible mediante este formulario. Ten en cuenta que solo podemos modificar la dirección si el pedido no ha sido procesado para envío.</p>
                </div>
              )}
            </div>

            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <button 
                className="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                onClick={() => toggleAccordion('devolucion')}
              >
                <span className="text-lg font-medium text-red-400">¿Cómo devolver un producto?</span>
                {accordionState.devolucion ? <ChevronUp size={20} /> : <ChevronDown size={20} /> }
              </button>
              {accordionState.devolucion && (
                <div className="p-4 bg-gray-750 border-t border-gray-700">
                  <p>Las devoluciones pueden hacerse dentro de los 30 días posteriores a la compra. Para iniciar una devolución, accede a tu cuenta, busca el pedido correspondiente y selecciona "Solicitar devolución". Te proporcionaremos una etiqueta de envío y las instrucciones necesarias.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Gaming Gear. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}