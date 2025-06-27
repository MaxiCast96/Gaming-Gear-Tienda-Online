import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure this path is correct

const Cart = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth(); // Get user and auth state
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState(null);
  const [updatingQuantity, setUpdatingQuantity] = useState({}); // Estado para manejar actualizaciones de cantidad

  useEffect(() => {
    const fetchCart = async () => {
      if (loading) return; // Wait for auth context to load

      if (!isAuthenticated || !user?.id) { // Use user.id as the client identifier
        setCartItems([]);
        setCartLoading(false);
        return;
      }

      try {
        setCartLoading(true);
        setCartError(null);
        // Assuming your API can fetch a cart by client ID
        const response = await fetch(`http://localhost:4000/api/cart/client/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${document.cookie.split('authToken=')[1]?.split(';')[0]}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setCartItems(data.productos || []); // Ensure products array exists
      } catch (err) {
        console.error('Error al obtener el carrito:', err);
        setCartError(err.message || 'Error al cargar el carrito');
        setCartItems([]);
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, user, loading]); // Depend on auth state and user data

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setUpdatingQuantity(prev => ({ ...prev, [productId]: true }));

      // Obtener el carrito actual
      let currentCart = await fetch(`http://localhost:4000/api/cart/client/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${document.cookie.split('authToken=')[1]?.split(';')[0]}`
        }
      }).then(res => res.json());

      if (!currentCart || !currentCart._id) {
        setCartError('No se encontró el carrito para actualizar.');
        return;
      }

      // Actualizar la cantidad en el backend
      const response = await fetch(`http://localhost:4000/api/cart/${currentCart._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('authToken=')[1]?.split(';')[0]}`
        },
        body: JSON.stringify({ 
          productId: productId,
          quantity: newQuantity
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar cantidad');
      }

      // Actualizar el estado local
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.productId === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      setCartError(error.message || 'Error al actualizar cantidad.');
    } finally {
      setUpdatingQuantity(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Función para manejar cambio de cantidad con validación
  const handleQuantityChange = (productId, newQuantity, maxStock = 999) => {
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      updateQuantity(productId, newQuantity);
    }
  };

  const removeFromCart = async (productIdToRemove) => {
    // Assuming cartItems[0]._id is the cart's main ID
    // You might need to adjust this if your backend handles cart deletion differently
    if (!cartItems || cartItems.length === 0) return;

    try {
        const cartId = cartItems.cartId || user.cartId; // Assuming you have a cart ID stored, or can fetch it
        // Or if your backend supports deleting by productId and clientId directly without a cart ID, adjust URL
        
        // Find the specific cart entry that holds this product if your cart is structured to hold multiple products in one document
        // For simplicity, we are sending the current cart document's ID (cartItems._id) and the productId to remove.
        const cartDocumentId = cartItems.length > 0 ? cartItems[0].cartId : null; // You need a way to get the actual cart document ID

        // If you don't have a direct cart document ID and want to delete based on user and product, your backend API needs to support it.
        // For now, assuming the Cart component will fetch the cart by client ID, and then we will update it.
        // The delete endpoint uses /:id for the cart document ID, and accepts productId in the body to remove an item.
        let currentCart = await fetch(`http://localhost:4000/api/cart/client/${user.id}`, {
            headers: {
                'Authorization': `Bearer ${document.cookie.split('authToken=')[1]?.split(';')[0]}`
            }
        }).then(res => res.json());

        if (!currentCart || !currentCart._id) {
            setCartError('No se encontró el carrito para eliminar el producto.');
            return;
        }

        const response = await fetch(`http://localhost:4000/api/cart/${currentCart._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('authToken=')[1]?.split(';')[0]}`
            },
            body: JSON.stringify({ productId: productIdToRemove }) // Send the product ID to remove
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al eliminar producto del carrito');
        }

        // Update local state after successful deletion
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productIdToRemove));
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        setCartError(error.message || 'Error al eliminar producto.');
    }
  };

  const checkout = () => {
    // You would typically clear the cart on the backend after a successful checkout.
    // For now, it navigates to guarantees.
    navigate('/garantias');
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  if (cartLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-950 text-white">
        Cargando carrito...
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-950 text-red-400">
        Error: {cartError}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-950">
      <div className="w-full max-w-3xl">
        <div className="bg-red-900 p-4 mb-4 rounded-t-lg">
          <h1 className="text-white text-2xl font-bold text-center">Shopping Cart</h1>
        </div>

        <div className="bg-red-800 p-6 rounded-b-lg">
          {cartItems.length === 0 ? (
            <div className="bg-red-200 p-8 rounded-lg text-center">
              <p className="text-red-900 text-lg">Tu carrito está vacío</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 bg-red-700 hover:bg-red-600 text-white py-2 px-6 rounded-full transition-all duration-300"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.productId} className="bg-red-200 mb-4 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    {/* Información del producto */}
                    <div className="flex items-center flex-1">
                      <div className="w-24 h-24 bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-700">Precio unitario: ${item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex flex-col items-center mx-6">
                      <label className="block text-sm font-medium text-gray-800 mb-2">Cantidad:</label>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1 || updatingQuantity[item.productId]}
                          className="w-8 h-8 rounded-full bg-red-700 hover:bg-red-600 disabled:bg-gray-400 disabled:text-gray-600 text-white flex items-center justify-center transition-all duration-200"
                        >
                          {updatingQuantity[item.productId] ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                          ) : (
                            '-'
                          )}
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="999"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1)}
                          disabled={updatingQuantity[item.productId]}
                          className="w-16 h-8 text-center bg-white border border-gray-300 rounded text-gray-800 disabled:bg-gray-100"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          disabled={updatingQuantity[item.productId]}
                          className="w-8 h-8 rounded-full bg-red-700 hover:bg-red-600 disabled:bg-gray-400 disabled:text-gray-600 text-white flex items-center justify-center transition-all duration-200"
                        >
                          {updatingQuantity[item.productId] ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                          ) : (
                            '+'
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Precio total y botón eliminar */}
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-gray-800 mb-2">
                        ${(item.price * item.quantity).toFixed(2)} US
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-full text-sm transition-all duration-300 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-col items-center mt-8">
                <div className="bg-red-200 rounded-lg py-3 px-6 mb-4">
                  <div className="text-lg font-bold text-gray-800">Total: ${totalAmount} US</div>
                  <div className="text-sm text-gray-600">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)} artículo(s) en total
                  </div>
                </div>
                <button
                  onClick={checkout}
                  className="bg-red-700 hover:bg-red-600 text-white py-3 px-8 rounded-full text-lg font-medium shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  Pagar Ahora
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;