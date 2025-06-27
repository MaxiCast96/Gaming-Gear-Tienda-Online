import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que la ruta sea correcta

/**
 * Componente PantallaCheckout
 *
 * Este componente representa la página de pago (checkout) de una tienda en línea.
 * Permite al usuario introducir sus datos de dirección, información de pago y
 * visualizar un resumen de los productos en su carrito.
 * Los datos de nombre y correo se obtienen automáticamente del JWT.
 */
export default function PantallaCheckout() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  // Estados para el carrito
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Estado para almacenar todos los datos del formulario (sin nombre y correo)
  const [formData, setFormData] = useState({
    direccion: '',
    notasAdicionales: '',
    nombreTitular: '',
    numeroTarjeta: '',
    fechaVencimiento: '',
    cvc: '',
    codigoDescuento: ''
  });

  // Nuevo estado para manejar los errores de validación de cada campo
  const [errors, setErrors] = useState({});

  // Estado para el descuento aplicado
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);

  // Efecto para cargar el carrito al montar el componente
  useEffect(() => {
    const fetchCart = async () => {
      if (loading) return;

      if (!isAuthenticated || !user?.id) {
        navigate('/login');
        return;
      }

      try {
        setCartLoading(true);
        setCartError(null);

        const response = await fetch(`http://localhost:4000/api/cart/client/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${document.cookie.split('authToken=')[1]?.split(';')[0]}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const products = data.productos || [];

        if (products.length === 0) {
          navigate('/cart');
          return;
        }

        setCartItems(products);
      } catch (err) {
        console.error('Error al obtener el carrito:', err);
        setCartError(err.message || 'Error al cargar el carrito');
        setCartItems([]);
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, user, loading, navigate]);

  // Cálculo de totales
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const envio = 4.99;
  const totalConDescuento = subtotal - descuentoAplicado;
  const total = totalConDescuento + envio;

  /**
   * Maneja los cambios en los campos del formulario
   * Limpia el error del campo correspondiente al escribir.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Limpiar el error cuando el usuario comienza a escribir en el campo
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  /**
   * Valida un campo específico al perder el foco (onBlur)
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    // Validaciones específicas para cada campo
    switch (name) {
      case 'direccion':
        if (!value.trim()) newErrors.direccion = 'La dirección es obligatoria.';
        break;
      case 'nombreTitular':
        if (!value.trim()) newErrors.nombreTitular = 'El nombre del titular es obligatorio.';
        break;
      case 'numeroTarjeta':
        // Remover espacios para la validación
        const cardNumber = value.replace(/\s/g, '');
        if (!cardNumber.trim()) newErrors.numeroTarjeta = 'El número de tarjeta es obligatorio.';
        else if (cardNumber.length < 13 || !/^\d+$/.test(cardNumber)) newErrors.numeroTarjeta = 'Ingrese un número de tarjeta válido (al menos 13 dígitos).';
        break;
      case 'fechaVencimiento':
        const monthYearRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!value.trim()) newErrors.fechaVencimiento = 'La fecha de vencimiento es obligatoria.';
        else if (!monthYearRegex.test(value)) {
          newErrors.fechaVencimiento = 'Formato MM/AA inválido. Ej: 12/25';
        } else {
          const [month, year] = value.split('/').map(Number);
          const currentYear = new Date().getFullYear() % 100; // Obtener los dos últimos dígitos del año actual
          const currentMonth = new Date().getMonth() + 1; // getMonth() es 0-index

          if (year < currentYear || (year === currentYear && month < currentMonth)) {
            newErrors.fechaVencimiento = 'La tarjeta ha expirado.';
          }
        }
        break;
      case 'cvc':
        if (!value.trim()) newErrors.cvc = 'El CVC es obligatorio.';
        else if (!/^\d{3,4}$/.test(value)) newErrors.cvc = 'CVC inválido (3 o 4 dígitos numéricos).';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  /**
   * Valida todo el formulario.
   * Retorna true si es válido, false en caso contrario y actualiza el estado `errors`.
   */
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Campos obligatorios (sin nombre y correo)
    const requiredFields = [
      'direccion', 'nombreTitular', 'numeroTarjeta', 'fechaVencimiento', 'cvc'
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `Este campo es obligatorio.`;
        isValid = false;
      }
    });

    // Validaciones específicas
    const cardNumber = formData.numeroTarjeta.replace(/\s/g, '');
    if (formData.numeroTarjeta && (cardNumber.length < 13 || !/^\d+$/.test(cardNumber))) {
      newErrors.numeroTarjeta = 'Ingrese un número de tarjeta válido (al menos 13 dígitos numéricos).';
      isValid = false;
    }

    const monthYearRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (formData.fechaVencimiento && !monthYearRegex.test(formData.fechaVencimiento)) {
      newErrors.fechaVencimiento = 'Formato MM/AA inválido. Ej: 12/25';
      isValid = false;
    } else if (formData.fechaVencimiento) {
      const [month, year] = formData.fechaVencimiento.split('/').map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.fechaVencimiento = 'La tarjeta ha expirado.';
        isValid = false;
      }
    }

    if (formData.cvc && !/^\d{3,4}$/.test(formData.cvc)) {
      newErrors.cvc = 'CVC inválido (3 o 4 dígitos numéricos).';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Maneja el envío del formulario - ahora redirige a CarritoCompras en lugar de insertar en BD
   */
  const handleSubmit = async () => {
    if (!validateForm()) {
      // Si la validación falla, desplazar la vista al primer error si es necesario
      const firstErrorField = Object.keys(errors).find(key => errors[key]);
      if (firstErrorField) {
        document.getElementsByName(firstErrorField)[0]?.focus();
      }
      return;
    }

    setProcessingPayment(true);

    try {
      // Preparar los datos del pedido para enviar a CarritoCompras
      const orderData = {
        clientId: user.id,
        productos: cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        datosPersonales: {
          nombreCompleto: user?.nombre || user?.name || user?.email || 'Usuario', // Obtenido del JWT
          correoElectronico: user?.email || user?.correo || '', // Obtenido del JWT
          direccion: formData.direccion,
          notasAdicionales: formData.notasAdicionales
        },
        datosPago: {
          nombreTitular: formData.nombreTitular,
          numeroTarjeta: formData.numeroTarjeta.slice(-4), // Solo últimos 4 dígitos por seguridad
          fechaVencimiento: formData.fechaVencimiento
        },
        montos: {
          subtotal: subtotal.toFixed(2),
          descuento: descuentoAplicado.toFixed(2),
          envio: envio.toFixed(2),
          total: total.toFixed(2)
        },
        codigoDescuento: formData.codigoDescuento || null
      };

      console.log('Datos del pedido preparados:', orderData);

      // Navegar a CarritoCompras con los datos del pedido
      navigate('/delivery', { state: { orderData } });

    } catch (error) {
      console.error('Error al preparar el pedido:', error);
      alert('Error al procesar la información. Por favor, intente nuevamente.');
    } finally {
      setProcessingPayment(false);
    }
  };

  /**
   * Aplica un código de descuento al total
   */
  const aplicarDescuento = async () => {
    if (!formData.codigoDescuento.trim()) {
      alert('Por favor, ingrese un código de descuento');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/discount/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('authToken=')[1]?.split(';')[0]}`
        },
        body: JSON.stringify({
          codigo: formData.codigoDescuento,
          subtotal: subtotal
        })
      });

      if (response.ok) {
        const discountData = await response.json();
        setDescuentoAplicado(discountData.descuento);
        alert(`¡Código aplicado! Descuento: $${discountData.descuento.toFixed(2)}`);
      } else {
        alert('Código de descuento inválido o expirado');
      }
    } catch (error) {
      console.error('Error al aplicar descuento:', error);
      // Código de ejemplo para pruebas (eliminar en producción)
      if (formData.codigoDescuento.toUpperCase() === 'DESCUENTO10') {
        const descuento = subtotal * 0.1;
        setDescuentoAplicado(descuento);
        alert(`¡Código aplicado! Descuento: $${descuento.toFixed(2)}`);
      } else {
        alert('Código de descuento inválido');
      }
    }
  };

  // Loading state
  if (cartLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Cargando información del carrito...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (cartError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-900 text-red-400">
        <div className="text-center">
          <p className="mb-4">Error: {cartError}</p>
          <button
            onClick={() => navigate('/cart')}
            className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Volver al carrito
          </button>
        </div>
      </div>
    );
  }

  // Helper para renderizar los campos del formulario con sus errores
  const renderInputField = (label, name, type, placeholder = '', maxLength = '', isRequired = false) => (
    <div className="mb-3">
      <label className="block mb-1 text-gray-300">{label}{isRequired && ' *'}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className={`w-full p-2 rounded text-black ${errors[name] ? 'border-2 border-red-500' : 'border border-gray-300'}`}
        placeholder={placeholder}
        maxLength={maxLength}
        required={isRequired}
      />
      {errors[name] && <p className="text-red-400 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-red-900 p-4 flex justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Sección izquierda: Formulario de información de pago */}
        <div className="bg-black text-white rounded-3xl p-6 w-full md:w-1/2 shadow-lg">
          <h2 className="text-2xl mb-4 font-bold text-red-400">Información de Pago</h2>
          <div>
            {/* Datos personales - Mostrar datos del JWT */}
            <h3 className="text-xl mb-3 border-b border-red-800 pb-2">Datos Personales</h3>
            
            {/* Mostrar nombre y correo del JWT como información no editable */}
            <div className="mb-3">
              <label className="block mb-1 text-gray-300">Nombre completo</label>
              <div className="w-full p-2 rounded bg-gray-600 text-gray-300 border border-gray-500">
                {user?.nombre || user?.name || user?.email || 'Usuario'}
              </div>
              <p className="text-xs text-gray-400 mt-1">Obtenido de tu cuenta</p>
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-gray-300">Correo Electrónico</label>
              <div className="w-full p-2 rounded bg-gray-600 text-gray-300 border border-gray-500">
                {user?.email || user?.correo || 'No disponible'}
              </div>
              <p className="text-xs text-gray-400 mt-1">Obtenido de tu cuenta</p>
            </div>

            {renderInputField('Dirección', 'direccion', 'text', 'Calle, número, ciudad, país', '', true)}

            <div className="mb-5">
              <label className="block mb-1 text-gray-300">Notas adicionales (opcional):</label>
              <textarea
                name="notasAdicionales"
                value={formData.notasAdicionales}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black h-20 resize-none border border-gray-300"
                placeholder="Instrucciones especiales de entrega..."
              />
            </div>

            {/* Información de la tarjeta */}
            <h3 className="text-xl mb-3 border-b border-red-800 pb-2">Información de la Tarjeta</h3>
            {renderInputField('Nombre del titular', 'nombreTitular', 'text', 'Como aparece en la tarjeta', '', true)}
            {renderInputField('Número de Tarjeta', 'numeroTarjeta', 'text', '1234 5678 9012 3456', '19', true)}

            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                {renderInputField('Fecha de vencimiento', 'fechaVencimiento', 'text', 'MM/AA', '5', true)}
              </div>
              <div className="w-1/2">
                {renderInputField('CVC', 'cvc', 'text', '123', '4', true)}
              </div>
            </div>

            {/* Botón de continuar */}
            <div className="text-center mt-6">
              <button
                onClick={handleSubmit}
                disabled={processingPayment}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-500 text-white py-3 px-8 rounded-full transition-colors duration-200 text-lg font-semibold shadow-md"
              >
                {processingPayment ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </div>
                ) : (
                  `Continuar con el pago $${total.toFixed(2)}`
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sección derecha: Resumen de la orden */}
        <div className="w-full md:w-1/2 text-white bg-black rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl border-b border-red-800 pb-2 mb-4 font-bold text-red-400">Tu Orden</h2>

          {/* Lista de productos en el carrito */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map(item => (
              <div key={item.productId} className="flex items-center bg-red-800 p-3 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-gray-800 mr-4 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64x64/gray/white?text=Sin+Imagen';
                    }}
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-300">
                    Cantidad: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de costos */}
          <div className="border-t border-red-800 pt-4">
            <div className="flex justify-between mb-2 text-lg">
              <span className="font-medium">Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} artículos):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {descuentoAplicado > 0 && (
              <div className="flex justify-between mb-2 text-green-400 text-lg">
                <span className="font-medium">Descuento aplicado:</span>
                <span>-${descuentoAplicado.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between mb-2 text-lg">
              <span className="font-medium">Envío:</span>
              <span>${envio.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-2xl mb-6 border-t border-red-800 pt-2 text-red-300">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Campo para código de descuento */}
            <div className="flex justify-end mt-4">
              <div className="flex w-full max-w-xs">
                <input
                  type="text"
                  name="codigoDescuento"
                  placeholder="Código de descuento"
                  value={formData.codigoDescuento}
                  onChange={handleInputChange}
                  className="p-2 rounded-l text-black flex-grow border border-gray-300"
                />
                <button
                  onClick={aplicarDescuento}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-r transition-colors duration-200"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}