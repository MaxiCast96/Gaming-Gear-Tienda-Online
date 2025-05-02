import { useState } from 'react';

/**
 * Componente CarritoCompras - Página de carrito de compras para la tienda Gaming Gear
 *
 * Este componente renderiza la página de carrito de compras con la lista de productos 
 * seleccionados, resumen de costos, información de envío, datos de pago y un botón 
 * para completar la orden. Incluye también una alerta de confirmación.
 *
 * @returns {JSX.Element} Página completa de "Carrito de Compras"
 */
export default function CarritoCompras() {
  /**
   * Estado para los productos del carrito
   *
   * En una implementación real, estos productos vendrían de una API o 
   * estado global (Context, Redux, etc.) y no estarían hardcodeados.
   */
  const [productos] = useState([
    {
      id: 1,
      nombre: "Control PS5 Edición especial",
      precio: 75.99,
      imagen: "https://blog.es.playstation.com/tachyon/sites/14/2023/07/24bbaed190443ef0d278f3d5a0fe44af2279cd7b.png"
    },
    {
      id: 2,
      nombre: "Case PC Cooler Master MasterBox",
      precio: 89.99,
      imagen: "https://m.media-amazon.com/images/I/41Beo6Fur2L._AC_UF894,1000_QL80_.jpg"
    },
    {
      id: 3,
      nombre: "Grand Theft Auto V (Edición física)",
      precio: 14.99,
      imagen: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
    }
  ]);

  /**
   * Estado para controlar la visibilidad de la alerta de confirmación
   * @type {[boolean, Function]} Estado y función para actualizarlo
   */
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  
  /**
   * Cálculos del carrito
   * Subtotal: suma de precios de todos los productos
   * Envío: costo fijo de envío
   * Total: subtotal + envío
   */
  const subtotal = productos.reduce((total, producto) => total + producto.precio, 0);
  const envio = 4.99;
  const total = subtotal + envio;

  /**
   * Función para manejar el clic en "Completar Pedido"
   * Muestra la alerta de confirmación y redirecciona a la página principal después de 3 segundos
   */
  const handleCompletarPedido = () => {
    setMostrarAlerta(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-red-900 text-white relative overflow-hidden">
      {/* Alerta de confirmación de pedido completado */}
      {mostrarAlerta && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-red-800 to-red-950 p-8 rounded-lg shadow-2xl max-w-md w-full border border-red-500">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">¡Pedido Completado!</h2>
            <p className="text-center mb-6">Tu pedido ha sido procesado exitosamente. Gracias por confiar en nosotros.</p>
            <div className="text-center text-sm opacity-75">Serás redirigido en unos segundos...</div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex flex-col w-full h-full max-w-6xl mx-auto px-8 py-6">
        <h1 className="text-4xl font-bold mb-6">Tu orden:</h1>
        <hr className="border-white/20 mb-6" />
        <div className="flex flex-1 gap-8">
          {/* Lista de productos - Columna izquierda */}
          <div className="w-2/3 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Productos seleccionados</h2>
            <div className="space-y-6">
              {productos.map(producto => (
                <div key={producto.id} className="flex items-center gap-6 bg-red-950/30 p-4 rounded-lg">
                  <div className="w-24 h-24 bg-black/40 rounded-md overflow-hidden">
                    <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium">{producto.nombre}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">$ {producto.precio.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Resumen y datos - Columna derecha */}
          <div className="w-1/3 bg-red-950/40 rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-semibold mb-4">Resumen</h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío:</span>
                <span>$ {envio.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-white/20">
                <span>Total:</span>
                <span>$ {total.toFixed(2)}</span>
              </div>
            </div>
            <hr className="border-white/20 my-6" />
            <div className="mb-6 space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-2">Dirección de envío:</h3>
                <div className="bg-red-950/30 p-4 rounded-lg">
                  <p>Dirección de ejemplo</p>
                  <p>calle loca bien xdddddd</p>
                  <p>donde viven los SDLG</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Datos de pago:</h3>
                <div className="bg-red-950/30 p-4 rounded-lg">
                  <p><span className="font-medium">Titular:</span> Juan Pablo Lopez Capos</p>
                  <p><span className="font-medium">Tarjeta:</span> xxxxxxxxxxxx</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button 
                onClick={handleCompletarPedido}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Completar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
