import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente PantallaCheckout
 * 
 * Este componente representa la página de pago (checkout) de una tienda en línea.
 * Permite al usuario introducir sus datos personales, información de pago y
 * visualizar un resumen de los productos en su carrito.
 */
export default function PantallaCheckout() {
  // Hook para navegar programáticamente entre rutas
  const navigate = useNavigate();
  
  // Estado para almacenar todos los datos del formulario
  const [formData, setFormData] = useState({
    // Datos personales
    nombreCompleto: '',
    correoElectronico: '',
    direccion: '',
    notasAdicionales: '',
    
    // Datos de la tarjeta
    nombreTitular: '',
    numeroTarjeta: '',
    fechaVencimiento: '',
    cvc: '',
    
    // Código de descuento
    codigoDescuento: ''
  });

  // Array de productos en el carrito (en una aplicación real, esto vendría de un estado global o contexto)
  const productos = [
    {
      id: 1,
      nombre: 'Control PS5 Edición especial',
      precio: 75.99,
      imagen: 'https://blog.es.playstation.com/tachyon/sites/14/2023/07/24bbaed190443ef0d278f3d5a0fe44af2279cd7b.png'
    },
    {
      id: 2,
      nombre: 'Case PC Coolermaster',
      precio: 89.99,
      imagen: 'https://m.media-amazon.com/images/I/41Beo6Fur2L._AC_UF894,1000_QL80_.jpg'
    },
    {
      id: 3,
      nombre: 'Grand Theft Auto V',
      precio: 14.99,
      imagen: 'https://www.hydroscand.co.uk/media/catalog/product/placeholder/default/image-placeholder-base.png'
    }
  ];

  // Cálculo de totales
  // Sumamos todos los precios de los productos para obtener el subtotal
  const subtotal = productos.reduce((total, producto) => total + producto.precio, 0);
  // Costo fijo de envío
  const envio = 4.99;
  // Total final (subtotal + envío)
  const total = subtotal + envio;

  /**
   * Maneja los cambios en los campos del formulario
   * Actualiza el estado formData con los nuevos valores
   * 
   * @param {Event} e - Evento del cambio en el input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,  // Mantenemos los valores actuales
      [name]: value // Actualizamos solo el campo modificado
    });
  };

  /**
   * Maneja el envío del formulario de pago
   * En una aplicación real, aquí se enviarían los datos a un servidor
   */
  const handleSubmit = () => {
    console.log('Datos de pago enviados:', formData);
    // Navega a la página de entrega después de procesar el pago
    navigate('/delivery');
  };

  /**
   * Aplica un código de descuento al total
   * En una aplicación real, verificaría el código contra una base de datos
   */
  const aplicarDescuento = () => {
    console.log('Aplicando código de descuento:', formData.codigoDescuento);
    // Aquí iría la lógica para verificar y aplicar el descuento al total
  };

  return (
    <div className="min-h-screen bg-red-900 p-4 flex justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* 
          Sección izquierda: Formulario de información de pago 
          En móviles ocupa todo el ancho, en escritorio ocupa la mitad
        */}
        <div className="bg-black text-white rounded-3xl p-6 w-full md:w-1/2">
          <h2 className="text-2xl mb-4">Información de pago:</h2>
          <div>
            {/* Campo: Nombre completo */}
            <div className="mb-3">
              <label className="block mb-1">Nombre completo:</label>
              <input
                type="text"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            
            {/* Campo: Correo electrónico */}
            <div className="mb-3">
              <label className="block mb-1">Correo Electrónico:</label>
              <input
                type="email"
                name="correoElectronico"
                value={formData.correoElectronico}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            
            {/* Campo: Dirección */}
            <div className="mb-3">
              <label className="block mb-1">Dirección:</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            
            {/* Campo: Notas adicionales */}
            <div className="mb-5">
              <label className="block mb-1">Notas adicionales (opcional):</label>
              <input
                type="text"
                name="notasAdicionales"
                value={formData.notasAdicionales}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            
            {/* Subsección: Información de la tarjeta */}
            <h3 className="text-xl mb-3">Información de la tarjeta:</h3>
            
            {/* Campo: Nombre del titular */}
            <div className="mb-3">
              <label className="block mb-1">Nombre del titular:</label>
              <input
                type="text"
                name="nombreTitular"
                value={formData.nombreTitular}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            
            {/* Campo: Número de tarjeta */}
            <div className="mb-3">
              <label className="block mb-1">Número de Tarjeta:</label>
              <input
                type="text"
                name="numeroTarjeta"
                value={formData.numeroTarjeta}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            
            {/* Campos: Fecha de vencimiento y CVC (en fila) */}
            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                <label className="block mb-1">Fecha de vencimiento:</label>
                <input
                  type="text"
                  name="fechaVencimiento"
                  placeholder="MM/AA"
                  value={formData.fechaVencimiento}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded text-black"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1">CVC:</label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded text-black"
                />
              </div>
            </div>
            
            {/* Botón de pago */}
            <div className="text-center">
              <button 
                onClick={handleSubmit}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-8 rounded-full transition-colors duration-200"
              >
                Proceder con el pago
              </button>
            </div>
          </div>
        </div>
        
        {/* 
          Sección derecha: Resumen de la orden 
          En móviles ocupa todo el ancho, en escritorio ocupa la mitad
        */}
        <div className="w-full md:w-1/2 text-white">
          <h2 className="text-2xl border-b border-red-800 pb-2 mb-4">Tu orden:</h2>
          
          {/* Lista de productos en el carrito */}
          <div className="space-y-4 mb-6">
            {productos.map(producto => (
              <div key={producto.id} className="flex items-center">
                {/* Imagen del producto */}
                <div className="w-20 h-20 bg-gray-800 mr-4 rounded overflow-hidden">
                  <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
                </div>
                {/* Nombre del producto */}
                <div className="flex-grow">
                  <h3 className="text-xl">{producto.nombre}</h3>
                </div>
                {/* Precio del producto */}
                <div className="text-right">
                  <p className="text-lg">$ {producto.precio.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumen de costos */}
          <div className="border-t border-red-800 pt-4">
            {/* Subtotal */}
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>$ {subtotal.toFixed(2)}</span>
            </div>
            {/* Costo de envío */}
            <div className="flex justify-between mb-2">
              <span>Envío:</span>
              <span>$ {envio.toFixed(2)}</span>
            </div>
            {/* Total */}
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total:</span>
              <span>$ {total.toFixed(2)}</span>
            </div>
            
            {/* Campo para código de descuento */}
            <div className="flex justify-end">
              <div className="flex">
                <input
                  type="text"
                  name="codigoDescuento"
                  placeholder="Código de descuento"
                  value={formData.codigoDescuento}
                  onChange={handleInputChange}
                  className="p-2 rounded-l text-black w-40"
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