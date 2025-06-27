import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, X, Edit, Trash2, Plus, Upload } from 'lucide-react';

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

// Componente para manejo de imágenes
const ImageUploader = ({ label, multiple = false, images = [], onImagesChange }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        if (multiple) {
          onImagesChange([...images, imageData]);
        } else {
          onImagesChange([imageData]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <label
          htmlFor={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="cursor-pointer flex flex-col items-center justify-center space-y-2 text-gray-400 hover:text-white transition-colors"
        >
          <Upload size={32} />
          <span className="text-sm">
            {multiple ? 'Seleccionar imágenes' : 'Seleccionar imagen'}
          </span>
        </label>
        
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-full h-20 object-cover rounded"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
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
    descripcion: '',
    imagenPrincipal: '',
    imagenesSecundarias: []
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        categoria: product.categoria || '',
        precio: product.precio || '',
        cantidad: product.cantidad || '',
        descripcion: product.descripcion || '',
        imagenPrincipal: product.imagenPrincipal || '',
        imagenesSecundarias: product.imagenesSecundarias || []
      });
    }
  }, [product]);

  const handleSubmit = () => {
    console.log('HandleSubmit ejecutado'); // Para debug
    
    // Validación básica
    if (!formData.nombre.trim()) {
      alert('El nombre del producto es obligatorio');
      return;
    }
    
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }
    
    if (!formData.imagenPrincipal) {
      alert('La imagen principal es obligatoria');
      return;
    }
    
    console.log('Validación pasada, llamando onSave'); // Para debug
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Editar Producto</h3>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-2">Nombre del Producto</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Categoría</label>
              <input
                type="text"
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Precio</label>
              <input
                type="number"
                value={formData.precio}
                onChange={(e) => setFormData({...formData, precio: e.target.value})}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Cantidad</label>
              <input
                type="number"
                value={formData.cantidad}
                onChange={(e) => setFormData({...formData, cantidad: e.target.value})}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                min="0"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full p-2 bg-gray-700 rounded h-24 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <ImageUploader
            label="Imagen Principal *"
            multiple={false}
            images={formData.imagenPrincipal ? [formData.imagenPrincipal] : []}
            onImagesChange={(images) => setFormData({...formData, imagenPrincipal: images[0] || ''})}
          />

          <ImageUploader
            label="Imágenes Secundarias"
            multiple={true}
            images={formData.imagenesSecundarias}
            onImagesChange={(images) => setFormData({...formData, imagenesSecundarias: images})}
          />

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-200"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors duration-200"
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
  
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    cantidad: '',
    descripcion: '',
    imagenPrincipal: '',
    imagenesSecundarias: []
  });

  const API_BASE_URL = 'http://localhost:4000/api';

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleAddProduct = async () => {
    if (!newProduct.nombre || !newProduct.precio || !newProduct.imagenPrincipal) {
      showToast('Nombre, precio e imagen principal son obligatorios', 'error');
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
          descripcion: newProduct.descripcion,
          imagenPrincipal: newProduct.imagenPrincipal,
          imagenesSecundarias: newProduct.imagenesSecundarias
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
        descripcion: '',
        imagenPrincipal: '',
        imagenesSecundarias: []
      });
      fetchProducts();
    } catch (error) {
      showToast('Error al agregar producto', 'error');
      console.error('Error:', error);
    }
  };

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
      fetchProducts();
    } catch (error) {
      showToast('Error al eliminar producto', 'error');
      console.error('Error:', error);
    }
  };

  const handleEditProduct = (product) => {
    console.log('Editando producto:', product); // Para debug
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (formData) => {
    console.log('Guardando cambios:', formData); // Para debug
    console.log('ID del producto:', editingProduct?._id); // Para debug
    
    if (!formData.imagenPrincipal) {
      showToast('La imagen principal es obligatoria', 'error');
      return;
    }

    if (!editingProduct?._id) {
      showToast('Error: No se encontró el ID del producto', 'error');
      return;
    }

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
          descripcion: formData.descripcion,
          imagenPrincipal: formData.imagenPrincipal,
          imagenesSecundarias: formData.imagenesSecundarias
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Error al actualizar producto: ${response.status}`);
      }

      showToast('Producto actualizado exitosamente');
      setIsEditModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      showToast('Error al actualizar producto', 'error');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <EditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onSave={handleSaveEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProduct(null);
        }}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-500 mb-8">Gestión de Productos - Gaming Gear</h1>
          
          <div className="bg-gray-800 p-6 rounded mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Plus className="mr-2" size={24} />
              Agregar Producto
            </h2>
            
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

            <ImageUploader
              label="Imagen Principal *"
              multiple={false}
              images={newProduct.imagenPrincipal ? [newProduct.imagenPrincipal] : []}
              onImagesChange={(images) => setNewProduct({...newProduct, imagenPrincipal: images[0] || ''})}
            />

            <ImageUploader
              label="Imágenes Secundarias"
              multiple={true}
              images={newProduct.imagenesSecundarias}
              onImagesChange={(images) => setNewProduct({...newProduct, imagenesSecundarias: images})}
            />
            
            <button
              onClick={handleAddProduct}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
            >
              <Plus className="mr-2" size={20} />
              Agregar Producto
            </button>
          </div>
          
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
                      <th className="p-4 text-left">Imagen</th>
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
                        <td colSpan="6" className="p-8 text-center text-gray-400">
                          No hay productos disponibles
                        </td>
                      </tr>
                    ) : (
                      products.map(product => (
                        <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-750">
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {product.imagenPrincipal ? (
                                <img
                                  src={product.imagenPrincipal}
                                  alt={product.nombre}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center">
                                  <Upload size={20} className="text-gray-400" />
                                </div>
                              )}
                              {product.imagenesSecundarias && product.imagenesSecundarias.length > 0 && (
                                <span className="text-xs bg-blue-600 px-1 py-0.5 rounded">
                                  +{product.imagenesSecundarias.length}
                                </span>
                              )}
                            </div>
                          </td>
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