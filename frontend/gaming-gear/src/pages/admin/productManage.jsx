import { useState } from 'react';

export default function GamingGearAdmin() {
  // Estado para el producto a agregar
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    description: ''
  });

  // Lista de productos inicial
  const [products, setProducts] = useState([
    { id: 1, name: 'Teclado Mecánico', price: 120, stock: 45 },
    { id: 2, name: 'Ratón Gaming', price: 80, stock: 30 },
    { id: 3, name: 'Auriculares RGB', price: 55, stock: 12 }
  ]);

  // Estado para controlar la vista en dispositivos móviles
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  // Agregar un nuevo producto
  const handleAddProduct = (e) => {
    if (e) e.preventDefault();
    
    // Validación básica
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      return;
    }
    
    const productToAdd = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', price: '', stock: '', description: '' });
  };

  // Eliminar un producto
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 bg-black`}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-2">
            <div className="py-2 px-4 bg-gray-800 rounded">Gestión de Productos</div>
            <div className="py-2 px-4 hover:bg-gray-800 rounded">Gestión de Usuarios</div>
            <div className="py-2 px-4 hover:bg-gray-800 rounded">Gestión de Pedidos</div>
            <div className="py-2 px-4 hover:bg-gray-800 rounded">Soporte al Cliente</div>
            <div className="py-2 px-4 hover:bg-gray-800 rounded">Panel de Notificaciones</div>
            <div className="py-2 px-4 hover:bg-gray-800 rounded">Configuración</div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Gaming Gear Admin</h1>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-500 mb-8">Gestión de Productos - Gaming Gear</h1>
          
          {/* Add Product Form */}
          <div className="bg-gray-800 p-6 rounded mb-8">
            <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
            <div>
              <div className="mb-4">
                <label className="block mb-2">Nombre del Producto</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Ej: Teclado Mecánico"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Ej: 100"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Cantidad en Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Ej: 50"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Descripción</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded h-32"
                  placeholder="Descripción del producto"
                ></textarea>
              </div>
              
              <button
                onClick={handleAddProduct}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Agregar Producto
              </button>
            </div>
          </div>
          
          {/* Product List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-800 rounded">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-4 text-left">Producto</th>
                    <th className="p-4 text-left">Precio</th>
                    <th className="p-4 text-left">Stock</th>
                    <th className="p-4 text-left">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-gray-700">
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">${product.price}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4 flex space-x-2">
                        <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm">
                          Editar
                        </button>
                        <button 
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}