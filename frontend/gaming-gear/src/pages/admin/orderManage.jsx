import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, X, Edit, Trash2, Plus, Package, Calendar, CreditCard, Truck } from 'lucide-react';

// Opciones predeterminadas para métodos de pago
const PAYMENT_METHODS = [
  { id: 'efectivo', name: 'Efectivo' },
  { id: 'tarjeta_credito', name: 'Tarjeta de Crédito' },
  { id: 'tarjeta_debito', name: 'Tarjeta de Débito' },
  { id: 'transferencia', name: 'Transferencia Bancaria' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'bitcoin', name: 'Bitcoin' },
  { id: 'otro', name: 'Otro' }
];

// Componente de Toast para notificaciones
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3 animate-slide-in`}>
      <Icon size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:bg-black hover:bg-opacity-20 rounded p-1">
        <X size={16} />
      </button>
    </div>
  );
};

// Modal para editar pedido
const EditModal = ({ order, isOpen, onSave, onClose, products }) => {
  const [formData, setFormData] = useState({
    fechaCompra: '',
    fechaEntregaEstimada: '',
    productosAEntregar: '',
    pago: ''
  });

  useEffect(() => {
    if (order) {
      setFormData({
        fechaCompra: order.fechaCompra ? new Date(order.fechaCompra).toISOString().split('T')[0] : '',
        fechaEntregaEstimada: order.fechaEntregaEstimada ? new Date(order.fechaEntregaEstimada).toISOString().split('T')[0] : '',
        productosAEntregar: order.productosAEntregar?._id || order.productosAEntregar || '',
        pago: order.pago || ''
      });
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4 text-red-400">Editar Pedido</h3>
        <div>
          <div className="mb-4">
            <label className="block mb-2">Fecha de Compra *</label>
            <input
              type="date"
              value={formData.fechaCompra}
              onChange={(e) => setFormData({...formData, fechaCompra: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Fecha de Entrega Estimada</label>
            <input
              type="date"
              value={formData.fechaEntregaEstimada}
              onChange={(e) => setFormData({...formData, fechaEntregaEstimada: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Producto</label>
            <select
              value={formData.productosAEntregar}
              onChange={(e) => setFormData({...formData, productosAEntregar: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-red-500"
            >
              <option value="">Seleccionar producto</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.nombre} - ${product.precio}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Método de Pago</label>
            <select
              value={formData.pago}
              onChange={(e) => setFormData({...formData, pago: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded focus:ring-2 focus:ring-red-500"
            >
              <option value="">Seleccionar método de pago</option>
              {PAYMENT_METHODS.map(payment => (
                <option key={payment.id} value={payment.id}>
                  {payment.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
            >
              Guardar
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Estado para el formulario de agregar pedido
  const [newOrder, setNewOrder] = useState({
    fechaCompra: '',
    fechaEntregaEstimada: '',
    productosAEntregar: '',
    pago: ''
  });

  // URL base de la API
  const API_BASE_URL = '/api';

  // Función para mostrar toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Función para obtener todos los pedidos
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error('Error al obtener pedidos');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      showToast('Error al cargar los pedidos', 'error');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener productos
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: value
    });
  };

  // Agregar nuevo pedido
  const handleAddOrder = async () => {
    // Validación básica
    if (!newOrder.fechaCompra) {
      showToast('La fecha de compra es obligatoria', 'error');
      return;
    }

    try {
      const orderData = {
        fechaCompra: newOrder.fechaCompra,
        fechaEntregaEstimada: newOrder.fechaEntregaEstimada || null,
        productosAEntregar: newOrder.productosAEntregar || null,
        pago: newOrder.pago || null
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Error al crear pedido');
      }

      showToast('Pedido agregado exitosamente');
      setNewOrder({
        fechaCompra: '',
        fechaEntregaEstimada: '',
        productosAEntregar: '',
        pago: ''
      });
      fetchOrders(); // Recargar la lista
    } catch (error) {
      showToast('Error al agregar pedido', 'error');
      console.error('Error:', error);
    }
  };

  // Eliminar pedido
  const handleDeleteOrder = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este pedido?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar pedido');
      }

      showToast('Pedido eliminado exitosamente');
      fetchOrders(); // Recargar la lista
    } catch (error) {
      showToast('Error al eliminar pedido', 'error');
      console.error('Error:', error);
    }
  };

  // Abrir modal de edición
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  // Guardar pedido editado
  const handleSaveEdit = async (formData) => {
    try {
      const orderData = {
        fechaCompra: formData.fechaCompra,
        fechaEntregaEstimada: formData.fechaEntregaEstimada || null,
        productosAEntregar: formData.productosAEntregar || null,
        pago: formData.pago || null
      };

      const response = await fetch(`${API_BASE_URL}/orders/${editingOrder._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar pedido');
      }

      showToast('Pedido actualizado exitosamente');
      setIsEditModalOpen(false);
      setEditingOrder(null);
      fetchOrders(); // Recargar la lista
    } catch (error) {
      showToast('Error al actualizar pedido', 'error');
      console.error('Error:', error);
    }
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  // Obtener estado del pedido basado en fechas
  const getOrderStatus = (order) => {
    const today = new Date();
    const entregaDate = order.fechaEntregaEstimada ? new Date(order.fechaEntregaEstimada) : null;
    
    if (!entregaDate) {
      return { status: 'Procesando', color: 'bg-yellow-500' };
    }
    
    if (today < entregaDate) {
      return { status: 'En camino', color: 'bg-blue-500' };
    } else if (today.toDateString() === entregaDate.toDateString()) {
      return { status: 'Entrega hoy', color: 'bg-orange-500' };
    } else {
      return { status: 'Entregado', color: 'bg-green-500' };
    }
  };

  // Obtener nombre del método de pago
  const getPaymentMethodName = (paymentId) => {
    const method = PAYMENT_METHODS.find(p => p.id === paymentId);
    return method ? method.name : 'Sin método asignado';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Edit Modal */}
      <EditModal
        order={editingOrder}
        isOpen={isEditModalOpen}
        onSave={handleSaveEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingOrder(null);
        }}
        products={products}
      />

      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-red-400 flex items-center">
            <Package className="mr-3" size={32} />
            Gestión de Pedidos - Gaming Gear
          </h1>
        </header>
        
        {/* Add Order Form */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700">
          <h2 className="text-xl font-bold mb-4 flex items-center text-red-400">
            <Plus className="mr-2" size={24} />
            Agregar Nuevo Pedido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Fecha de Compra *</label>
              <input
                type="date"
                name="fechaCompra"
                value={newOrder.fechaCompra}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Fecha de Entrega Estimada</label>
              <input
                type="date"
                name="fechaEntregaEstimada"
                value={newOrder.fechaEntregaEstimada}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Producto</label>
              <select
                name="productosAEntregar"
                value={newOrder.productosAEntregar}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
              >
                <option value="">Seleccionar producto</option>
                {products.map(product => (
                  <option key={product._id} value={product._id}>
                    {product.nombre} - ${product.precio}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Método de Pago</label>
              <select
                name="pago"
                value={newOrder.pago}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
              >
                <option value="">Seleccionar método de pago</option>
                {PAYMENT_METHODS.map(payment => (
                  <option key={payment.id} value={payment.id}>
                    {payment.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={handleAddOrder}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center font-semibold"
          >
            <Plus className="mr-2" size={20} />
            Crear Pedido
          </button>
        </div>
        
        {/* Orders List */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-red-400">Lista de Pedidos</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-750">
                    <th className="p-4 text-left text-gray-300">ID</th>
                    <th className="p-4 text-left text-gray-300">Fecha de Compra</th>
                    <th className="p-4 text-left text-gray-300">Entrega Estimada</th>
                    <th className="p-4 text-left text-gray-300">Producto</th>
                    <th className="p-4 text-left text-gray-300">Método de Pago</th>
                    <th className="p-4 text-left text-gray-300">Estado</th>
                    <th className="p-4 text-left text-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-gray-400">
                        <Package size={48} className="mx-auto mb-4 opacity-50" />
                        No hay pedidos disponibles
                      </td>
                    </tr>
                  ) : (
                    orders.map(order => {
                      const orderStatus = getOrderStatus(order);
                      return (
                        <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                          <td className="p-4">
                            <span className="font-mono text-sm text-gray-300">
                              #{order._id.slice(-8)}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-2 text-gray-400" />
                              {formatDate(order.fechaCompra)}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <Truck size={16} className="mr-2 text-gray-400" />
                              {formatDate(order.fechaEntregaEstimada)}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-gray-300">
                              {order.productosAEntregar?.nombre || 'Sin producto asignado'}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center text-gray-300">
                              <CreditCard size={16} className="mr-2 text-gray-400" />
                              {getPaymentMethodName(order.pago)}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${orderStatus.color}`}>
                              {orderStatus.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditOrder(order)}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm flex items-center transition-colors duration-200"
                              >
                                <Edit size={14} className="mr-1" />
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteOrder(order._id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm flex items-center transition-colors duration-200"
                              >
                                <Trash2 size={14} className="mr-1" />
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}