import { useState, useEffect } from 'react';

const OrderHistory = () => {
  const navigate = (path) => {
    // Simulamos la navegación para el ejemplo
    console.log(`Navegando a: ${path}`);
    window.location.href = path;
  };
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:4000/api/orders', {
          headers: {
            'Authorization': `Bearer ${document.cookie.split('authToken=')[1]?.split(';')[0]}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data || []);
      } catch (err) {
        console.error('Error al obtener pedidos:', err);
        setError(err.message || 'Error al cargar el historial de pedidos');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (estado) => {
    const colors = {
      'pendiente': 'bg-yellow-500',
      'procesando': 'bg-blue-500',
      'enviado': 'bg-purple-500',
      'entregado': 'bg-green-500',
      'cancelado': 'bg-red-500'
    };
    return colors[estado] || 'bg-gray-500';
  };

  const getStatusText = (estado) => {
    const texts = {
      'pendiente': 'Pendiente',
      'procesando': 'Procesando',
      'enviado': 'Enviado',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
    };
    return texts[estado] || estado;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Función para obtener el total del pedido de forma segura
  const getOrderTotal = (order) => {
    // Opción 1: Si el total está en order.montos.total
    if (order.montos && order.montos.total !== undefined) {
      return order.montos.total;
    }
    // Opción 2: Si el total está directamente en order.total
    if (order.total !== undefined) {
      return order.total;
    }
    // Opción 3: Calcular el total basado en los productos
    if (order.productos && Array.isArray(order.productos)) {
      return order.productos.reduce((sum, producto) => {
        return sum + (producto.price * producto.quantity);
      }, 0).toFixed(2);
    }
    // Si no se puede determinar, retornar 0
    return 0;
  };

  // Función para obtener montos de forma segura
  const getOrderAmounts = (order) => {
    const defaultAmounts = {
      subtotal: 0,
      descuento: 0,
      envio: 0,
      total: getOrderTotal(order)
    };

    if (order.montos) {
      return {
        subtotal: order.montos.subtotal || defaultAmounts.subtotal,
        descuento: order.montos.descuento || defaultAmounts.descuento,
        envio: order.montos.envio || defaultAmounts.envio,
        total: order.montos.total || defaultAmounts.total
      };
    }

    return defaultAmounts;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-950 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Cargando historial de pedidos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-950 text-red-400">
        <div className="text-center">
          <p className="text-xl mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-700 hover:bg-red-600 text-white py-2 px-6 rounded-full transition-all duration-300"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-red-950 py-8">
      <div className="w-full max-w-4xl">
        <div className="bg-red-900 p-4 mb-4 rounded-t-lg">
          <h1 className="text-white text-2xl font-bold text-center">Historial de Pedidos</h1>
        </div>

        <div className="bg-red-800 p-6 rounded-b-lg">
          {orders.length === 0 ? (
            <div className="bg-red-200 p-8 rounded-lg text-center">
              <p className="text-red-900 text-lg mb-4">No tienes pedidos registrados</p>
              <button
                onClick={() => navigate('/')}
                className="bg-red-700 hover:bg-red-600 text-white py-2 px-6 rounded-full transition-all duration-300"
              >
                Ir a comprar
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const amounts = getOrderAmounts(order);
                
                return (
                  <div key={order._id} className="bg-red-200 rounded-lg overflow-hidden">
                    {/* Encabezado del pedido */}
                    <div 
                      className="p-4 cursor-pointer hover:bg-red-300 transition-colors duration-200"
                      onClick={() => toggleOrderDetails(order._id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              Pedido #{order._id.slice(-8)}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {order.fechaCompra ? formatDate(order.fechaCompra) : 'Fecha no disponible'}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(order.estado || 'pendiente')}`}>
                            {getStatusText(order.estado || 'pendiente')}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-800">
                              ${amounts.total}
                            </div>
                            <div className="text-sm text-gray-600">
                              {order.productos ? order.productos.length : 0} producto(s)
                            </div>
                          </div>
                          <div className="transform transition-transform duration-200">
                            <svg 
                              className={`w-6 h-6 text-gray-600 ${expandedOrder === order._id ? 'rotate-180' : ''}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detalles del pedido (expandible) */}
                    {expandedOrder === order._id && (
                      <div className="border-t border-red-300 p-4 bg-red-100">
                        {/* Productos */}
                        {order.productos && order.productos.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Productos:</h4>
                            <div className="space-y-3">
                              {order.productos.map((producto, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                                  <div className="flex items-center">
                                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center mr-4">
                                      {producto.image ? (
                                        <img 
                                          src={producto.image} 
                                          alt={producto.name} 
                                          className="w-full h-full object-cover" 
                                        />
                                      ) : (
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                      )}
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-gray-800">{producto.name || 'Producto sin nombre'}</h5>
                                      <p className="text-sm text-gray-600">Cantidad: {producto.quantity || 1}</p>
                                      <p className="text-sm text-gray-600">Precio unitario: ${producto.price || 0}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-gray-800">
                                      ${((producto.price || 0) * (producto.quantity || 1)).toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Información del pedido */}
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Datos personales */}
                          {order.datosPersonales && (
                            <div className="bg-white p-4 rounded-lg">
                              <h4 className="text-lg font-semibold text-gray-800 mb-3">Datos de entrega:</h4>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Nombre:</span> {order.datosPersonales.nombreCompleto || 'No especificado'}</p>
                                <p><span className="font-medium">Email:</span> {order.datosPersonales.correoElectronico || 'No especificado'}</p>
                                <p><span className="font-medium">Dirección:</span> {order.datosPersonales.direccion || 'No especificada'}</p>
                                {order.datosPersonales.notasAdicionales && (
                                  <p><span className="font-medium">Notas:</span> {order.datosPersonales.notasAdicionales}</p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Resumen de montos */}
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Resumen de pago:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>${amounts.subtotal}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Descuento:</span>
                                <span>-${amounts.descuento}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Envío:</span>
                                <span>${amounts.envio}</span>
                              </div>
                              <div className="border-t pt-2 flex justify-between font-semibold">
                                <span>Total:</span>
                                <span>${amounts.total}</span>
                              </div>
                            </div>
                            {order.codigoDescuento && (
                              <div className="mt-3 text-sm">
                                <span className="font-medium">Código de descuento:</span> {order.codigoDescuento}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Fechas importantes */}
                        <div className="mt-6 bg-white p-4 rounded-lg">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">Información de entrega:</h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Fecha de compra:</span>
                              <p>{order.fechaCompra ? formatDate(order.fechaCompra) : 'Fecha no disponible'}</p>
                            </div>
                            {order.fechaEntregaEstimada && (
                              <div>
                                <span className="font-medium">Entrega estimada:</span>
                                <p>{formatDate(order.fechaEntregaEstimada)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Botón para volver */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-red-700 hover:bg-red-600 text-white py-3 px-8 rounded-full text-lg font-medium shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            Continuar comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;