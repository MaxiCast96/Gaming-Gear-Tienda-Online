import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, X, Edit, Trash2, Plus } from 'lucide-react';

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

// Modal para editar producto
const EditModal = ({ product, isOpen, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    cantidad: '',
    descripcion: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        categoria: product.categoria || '',
        precio: product.precio || '',
        cantidad: product.cantidad || '',
        descripcion: product.descripcion || ''
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4">Editar Producto</h3>
        <div>
          <div className="mb-4">
            <label className="block mb-2">Nombre del Producto</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Categoría</label>
            <input
              type="text"
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Precio</label>
            <input
              type="number"
              value={formData.precio}
              onChange={(e) => setFormData({...formData, precio: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Cantidad</label>
            <input
              type="number"
              value={formData.cantidad}
              onChange={(e) => setFormData({...formData, cantidad: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded h-24"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Guardar
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function GamingGearAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Estado para el formulario de agregar producto
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    cantidad: '',
    descripcion: ''
  });

  // URL base de la API (ajusta según tu configuración)
  const API_BASE_URL = '/api'; // Cambia por tu URL

  // Función para mostrar toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Función para obtener todos los productos
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      showToast('Error al cargar los productos', 'error');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  // Agregar nuevo producto
  const handleAddProduct = async () => {
    // Validación básica
    if (!newProduct.nombre || !newProduct.precio) {
      showToast('Nombre y precio son obligatorios', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: newProduct.nombre,
          categoria: newProduct.categoria,
          precio: parseFloat(newProduct.precio),
          cantidad: parseInt(newProduct.cantidad) || 0,
          descripcion: newProduct.descripcion
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear producto');
      }

      
      showToast('Producto agregado exitosamente');
      setNewProduct({
        nombre: '',
        categoria: '',
        precio: '',
        cantidad: '',
        descripcion: ''
      });
      fetchProducts(); // Recargar la lista
    } catch (error) {
      showToast('Error al agregar producto', 'error');
      console.error('Error:', error);
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }

      showToast('Producto eliminado exitosamente');
      fetchProducts(); // Recargar la lista
    } catch (error) {
      showToast('Error al eliminar producto', 'error');
      console.error('Error:', error);
    }
  };

  // Abrir modal de edición
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // Guardar producto editado
  const handleSaveEdit = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          categoria: formData.categoria,
          precio: parseFloat(formData.precio),
          cantidad: parseInt(formData.cantidad) || 0,
          descripcion: formData.descripcion
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar producto');
      }

      showToast('Producto actualizado exitosamente');
      setIsEditModalOpen(false);
      setEditingProduct(null);
      fetchProducts(); // Recargar la lista
    } catch (error) {
      showToast('Error al actualizar producto', 'error');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
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
        product={editingProduct}
        isOpen={isEditModalOpen}
        onSave={handleSaveEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProduct(null);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-500 mb-8">Gestión de Productos - Gaming Gear</h1>
          
          {/* Add Product Form */}
          <div className="bg-gray-800 p-6 rounded mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Plus className="mr-2" size={24} />
              Agregar Producto
            </h2>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block mb-2">Nombre del Producto *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={newProduct.nombre}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ej: Teclado Mecánico"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2">Categoría</label>
                  <input
                    type="text"
                    name="categoria"
                    value={newProduct.categoria}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ej: Periféricos"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2">Precio *</label>
                  <input
                    type="number"
                    name="precio"
                    value={newProduct.precio}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ej: 100"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2">Cantidad en Stock</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={newProduct.cantidad}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ej: 50"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Descripción</label>
                <textarea
                  name="descripcion"
                  value={newProduct.descripcion}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded h-24 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Descripción del producto"
                />
              </div>
              
              <button
                onClick={handleAddProduct}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
              >
                <Plus className="mr-2" size={20} />
                Agregar Producto
              </button>
            </div>
          </div>
          
          {/* Product List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-800 rounded">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-4 text-left">Producto</th>
                      <th className="p-4 text-left">Categoría</th>
                      <th className="p-4 text-left">Precio</th>
                      <th className="p-4 text-left">Stock</th>
                      <th className="p-4 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-gray-400">
                          No hay productos disponibles
                        </td>
                      </tr>
                    ) : (
                      products.map(product => (
                        <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-750">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{product.nombre}</div>
                              {product.descripcion && (
                                <div className="text-sm text-gray-400 truncate max-w-xs">
                                  {product.descripcion}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-gray-300">{product.categoria || 'Sin categoría'}</td>
                          <td className="p-4 font-medium">${product.precio}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-sm ${
                              product.cantidad > 10 ? 'bg-green-600' : 
                              product.cantidad > 0 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}>
                              {product.cantidad || 0}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditProduct(product)}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm flex items-center transition-colors duration-200"
                              >
                                <Edit size={14} className="mr-1" />
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product._id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm flex items-center transition-colors duration-200"
                              >
                                <Trash2 size={14} className="mr-1" />
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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