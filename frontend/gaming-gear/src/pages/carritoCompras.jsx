import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Componente CarritoCompras - Página de carrito de compras para la tienda Gaming Gear
 *
 * Este componente renderiza la página de carrito de compras con la lista de productos 
 * seleccionados, resumen de costos, información de envío, datos de pago y un botón 
 * para completar la orden. Recibe los datos desde PantallaCheckout.
 *
 * @returns {JSX.Element} Página completa de "Carrito de Compras"
 */
export default function CarritoCompras() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extraer los datos del pedido desde el state de navegación
  const orderData = location.state?.orderData;

  /**
   * Estado para controlar la visibilidad de la alerta de confirmación
   */
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  
  /**
   * Estado para manejar la carga y posibles errores
   */
  const [loading, setLoading] = useState(false);

  /**
   * Estado para almacenar información del pedido creado
   */
  const [pedidoInfo, setPedidoInfo] = useState(null);

  // Verificar si hay datos del pedido, si no redirigir al checkout
  useEffect(() => {
    if (!orderData) {
      console.warn('No se encontraron datos del pedido, redirigiendo al checkout...');
      navigate('/checkout');
    }
  }, [orderData, navigate]);

  // Si no hay datos del pedido, mostrar mensaje de carga
  if (!orderData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Cargando información del pedido...</p>
        </div>
      </div>
    );
  }

  // Extraer información del orderData
  const { productos, datosPersonales, datosPago, montos, codigoDescuento } = orderData;

  /**
   * Función para manejar el clic en "Completar Pedido"
   * Envía el pedido al backend y maneja la respuesta
   */
  const handleCompletarPedido = async () => {
    setLoading(true);
    
    try {
      // Preparar los datos del pedido para enviar al backend
      const pedidoData = {
        productos: productos.map(producto => ({
          productId: producto.productId,
          name: producto.name,
          price: parseFloat(producto.price),
          quantity: parseInt(producto.quantity),
          image: producto.image
        })),
        datosPersonales: {
          nombreCompleto: datosPersonales.nombreCompleto,
          correoElectronico: datosPersonales.correoElectronico,
          direccion: datosPersonales.direccion,
          notasAdicionales: datosPersonales.notasAdicionales || ""
        },
        datosPago: {
          nombreTitular: datosPago.nombreTitular,
          numeroTarjeta: datosPago.numeroTarjeta.slice(-4), // Solo los últimos 4 dígitos para seguridad
          fechaVencimiento: datosPago.fechaVencimiento,
          cvv: datosPago.cvv
        },
        montos: {
          subtotal: montos.subtotal,
          descuento: montos.descuento || "0.00",
          envio: montos.envio,
          total: montos.total
        },
        codigoDescuento: codigoDescuento || ""
      };

      console.log('Enviando datos del pedido:', pedidoData);

      // Realizar la llamada al API
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Error al procesar el pedido');
      }

      console.log('Pedido creado exitosamente:', responseData);
      
      // Guardar información del pedido para mostrar en la alerta
      setPedidoInfo({
        pedidoId: responseData.pedidoId,
        fechaEntregaEstimada: responseData.fechaEntregaEstimada
      });

      // Mostrar alerta de confirmación
      setMostrarAlerta(true);
      
      // Redirigir después de 4 segundos
      setTimeout(() => {
        navigate('/');
      }, 4000);
      
    } catch (error) {
      console.error('Error al completar el pedido:', error);
      alert(`Error al procesar el pedido: ${error.message}. Por favor, intente nuevamente.`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Formatear fecha para mostrar
   */
  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
            <p className="text-center mb-4">Tu pedido ha sido procesado exitosamente. Gracias por confiar en nosotros.</p>
            
            {pedidoInfo && (
              <div className="bg-red-950/50 p-4 rounded-lg mb-4 text-sm">
                <p><strong>ID del pedido:</strong> {pedidoInfo.pedidoId}</p>
                {pedidoInfo.fechaEntregaEstimada && (
                  <p><strong>Entrega estimada:</strong> {formatearFecha(pedidoInfo.fechaEntregaEstimada)}</p>
                )}
              </div>
            )}
            
            <div className="text-center text-sm opacity-75">Serás redirigido en unos segundos...</div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex flex-col w-full h-full max-w-6xl mx-auto px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/checkout')}
            className="text-white hover:text-red-300 transition-colors"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-4xl font-bold">Tu orden:</h1>
        </div>
        
        <hr className="border-white/20 mb-6" />
        
        <div className="flex flex-1 gap-8">
          {/* Lista de productos - Columna izquierda */}
          <div className="w-2/3 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">
              Productos seleccionados ({productos.length} {productos.length === 1 ? 'artículo' : 'artículos'})
            </h2>
            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
              {productos.map(producto => (
                <div key={producto.productId} className="flex items-center gap-6 bg-red-950/30 p-4 rounded-lg">
                  <div className="w-24 h-24 bg-black/40 rounded-md overflow-hidden">
                    <img 
                      src={producto.image} 
                      alt={producto.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/96x96/gray/white?text=Sin+Imagen';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium">{producto.name}</h3>
                    <p className="text-gray-300">Cantidad: {producto.quantity}</p>
                    <p className="text-gray-300">Precio unitario: ${producto.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">
                      ${(producto.price * producto.quantity).toFixed(2)}
                    </p>
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
                <span>${montos.subtotal}</span>
              </div>
              
              {parseFloat(montos.descuento) > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Descuento:</span>
                  <span>-${montos.descuento}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Envío:</span>
                <span>${montos.envio}</span>
              </div>
              
              <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-white/20">
                <span>Total:</span>
                <span>${montos.total}</span>
              </div>
              
              {codigoDescuento && (
                <div className="text-sm text-green-400 mt-2">
                  Código aplicado: {codigoDescuento}
                </div>
              )}
            </div>

            <hr className="border-white/20 my-6" />
            
            <div className="mb-6 space-y-6">
              {/* Información personal */}
              <div>
                <h3 className="font-bold text-xl mb-2">Información personal:</h3>
                <div className="bg-red-950/30 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Nombre:</span> {datosPersonales.nombreCompleto}</p>
                  <p><span className="font-medium">Email:</span> {datosPersonales.correoElectronico}</p>
                </div>
              </div>

              {/* Dirección de envío */}
              <div>
                <h3 className="font-bold text-xl mb-2">Dirección de envío:</h3>
                <div className="bg-red-950/30 p-4 rounded-lg">
                  <p>{datosPersonales.direccion}</p>
                  {datosPersonales.notasAdicionales && (
                    <div className="mt-2 pt-2 border-t border-white/20">
                      <p className="text-sm"><span className="font-medium">Notas:</span> {datosPersonales.notasAdicionales}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Datos de pago */}
              <div>
                <h3 className="font-bold text-xl mb-2">Datos de pago:</h3>
                <div className="bg-red-950/30 p-4 rounded-lg">
                  <p><span className="font-medium">Titular:</span> {datosPago.nombreTitular}</p>
                  <p><span className="font-medium">Tarjeta:</span> ****{datosPago.numeroTarjeta}</p>
                  <p><span className="font-medium">Vencimiento:</span> {datosPago.fechaVencimiento}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={handleCompletarPedido}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-500 text-white py-4 px-6 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </div>
                ) : (
                  `Completar Pedido - $${montos.total}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}