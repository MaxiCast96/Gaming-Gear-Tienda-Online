import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Razer Nari Ultimate",
      price: 150.00,
      rating: 4,
      image: "https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png"
    },
    {
      id: 2,
      name: "SteelSeries Apex Pro Gen 3",
      price: 210.00,
      rating: 4,
      image: "https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png"
    },
    {
      id: 3,
      name: "Shure MV7 USB",
      price: 110.00,
      rating: 4,
      image: "https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png"
    }
  ]);

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const checkout = () => {
    // Navegar a la página de garantías
    navigate('/garantias');
  };
  
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  
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
                <div key={item.id} className="bg-red-200 mb-4 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-24 h-24 bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, index) => (
                          <svg 
                            key={index} 
                            className={`w-5 h-5 ${index < item.rating ? "text-yellow-500" : "text-gray-400"}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-lg font-bold text-gray-800 mb-2">${item.price.toFixed(2)} US</div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-full text-sm transition-all duration-300"
                    >
                      Eliminar
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-800 hover:text-red-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              
              <div className="flex flex-col items-center mt-8">
                <div className="bg-red-200 rounded-lg py-3 px-6 mb-4">
                  <div className="text-lg font-bold text-gray-800">Total: ${totalAmount} US</div>
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