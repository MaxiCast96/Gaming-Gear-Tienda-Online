import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  // Datos de usuario de ejemplo (en producción estos vendrían de una API o Context)
  const userData = {
    name: 'Sample_Name',
    email: 'usuario@example.com',
    address: 'Calle Falsa 123, Ciudad, País',
    paymentMethod: 'Tarjeta de Crédito',
    phone: '+123 456 7890',
    registrationDate: '01/01/2023',
    profileImage: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
    purchaseHistory: [
      { id: 1, product: 'Producto 1', date: '10/02/2025', status: 'Entregado', price: 50.00 },
      { id: 2, product: 'Producto 2', date: '15/02/2025', status: 'Enviado', price: 25.00 },
      { id: 3, product: 'Producto 3', date: '18/02/2025', status: 'Pendiente', price: 30.00 },
    ],
    wishlist: [
      { id: 1, product: 'Producto A' },
      { id: 2, product: 'Producto B' },
      { id: 3, product: 'Producto C' },
    ]
  };

  // Función para determinar el color del estado del pedido
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Entregado':
        return 'bg-green-500';
      case 'Enviado':
        return 'bg-blue-500';
      case 'Pendiente':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-red-900 py-10 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg overflow-hidden text-white">
        {/* Cabecera del perfil */}
        <div className="text-center py-8 border-b border-gray-700">
          <img 
            src={userData.profileImage} 
            alt="Profile" 
            className="w-20 h-20 mx-auto rounded-full mb-4" 
          />
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-sm text-gray-300 mt-2">
            Bienvenido a tu perfil de GamingGear. Aquí puedes gestionar tus datos, revisar tus pedidos y configurar tus preferencias.
          </p>
        </div>

        {/* Información de Usuario */}
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-red-500 border-b border-red-500 pb-1">
            Información de Usuario
          </h3>
          
          <div className="space-y-3">
            <div className="border-b border-gray-700 pb-2">
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
            <div className="border-b border-gray-700 pb-2">
              <p><strong>Dirección:</strong> {userData.address}</p>
            </div>
            <div className="border-b border-gray-700 pb-2">
              <p><strong>Método de Pago:</strong> {userData.paymentMethod}</p>
            </div>
            <div className="border-b border-gray-700 pb-2">
              <p><strong>Teléfono:</strong> {userData.phone}</p>
            </div>
            <div className="border-b border-gray-700 pb-2">
              <p><strong>Fecha de Registro:</strong> {userData.registrationDate}</p>
            </div>
          </div>
        </div>

        {/* Historial de Compras */}
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-red-500 border-b border-red-500 pb-1">
            Historial de Compras
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-red-600">
                  <th className="p-3">Producto</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {userData.purchaseHistory.map((purchase) => (
                  <tr key={purchase.id} className="border-b border-gray-700">
                    <td className="p-3">{purchase.product}</td>
                    <td className="p-3">{purchase.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs text-white ${getStatusBadgeClass(purchase.status)}`}>
                        {purchase.status}
                      </span>
                    </td>
                    <td className="p-3">${purchase.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lista de Deseos */}
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-red-500 border-b border-red-500 pb-1">
            Lista de Deseos
          </h3>
          
          <ul className="space-y-2">
            {userData.wishlist.map((item) => (
              <li key={item.id} className="border-b border-gray-700 pb-2">
                • {item.product}
              </li>
            ))}
          </ul>
        </div>

        {/* Configuración de Cuenta */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4 text-red-500 border-b border-red-500 pb-1">
            Configuración de Cuenta
          </h3>
          
          <div className="flex flex-wrap gap-3">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300">
              Editar Información
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300">
              Cambiar Contraseña
            </button>
            <button onClick={() => window.location.href = '/login'} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;