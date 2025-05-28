import { useState } from 'react';
import { Bell, Package, Tag, Gift, Clock, X } from 'lucide-react';

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'pedido',
      title: 'Pedido #4532',
      description: 'ha sido confirmado y está en proceso de envío.',
      time: '1h',
      read: false
    },
    {
      id: 2,
      type: 'oferta',
      title: '¡20% de descuento en productos seleccionados!',
      description: 'Aprovecha esta oferta válida hasta el 28 de febrero.',
      time: '3h',
      read: false
    },
    {
      id: 3,
      type: 'promocion',
      title: 'Promoción especial',
      description: 'Compra uno y lleva otro con un 50% de descuento en todos los accesorios.',
      time: '5h',
      read: false
    },
    {
      id: 4,
      type: 'pedido',
      title: 'Pedido #4531',
      description: 'ha sido entregado exitosamente.',
      time: '1d',
      read: false
    },
    {
      id: 5,
      type: 'oferta',
      title: '¡Compra dos y lleva el tercero gratis!',
      description: 'Oferta limitada en accesorios de gaming.',
      time: '2d',
      read: false
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'pedido':
        return <Package className="text-blue-400" />;
      case 'oferta':
        return <Tag className="text-green-400" />;
      case 'promocion':
        return <Gift className="text-purple-400" />;
      default:
        return <Bell className="text-gray-400" />;
    }
  };

  const getHeaderColor = (type) => {
    switch(type) {
      case 'pedido':
        return 'text-blue-400';
      case 'oferta':
        return 'text-green-400';
      case 'promocion':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bell size={28} className="text-red-500" />
            <h1 className="text-3xl font-bold text-red-500">Panel de Notificaciones - Gaming Gear</h1>
          </div>
          <div className="h-1 w-60 bg-red-500 rounded"></div>
        </header>

        {/* Notifications Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Notificaciones Recientes</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                Marcar todas como leídas
              </button>
              <button className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                Borrar todo
              </button>
            </div>
          </div>

          {/* Notification Cards */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`bg-gray-800 rounded-lg overflow-hidden border-l-4 ${
                  notification.type === 'pedido' ? 'border-blue-400' : 
                  notification.type === 'oferta' ? 'border-green-400' : 
                  'border-purple-400'
                } ${notification.read ? 'opacity-70' : ''}`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-700 rounded-full">
                        {getIcon(notification.type)}
                      </div>
                      <div>
                        <h3 className={`font-medium text-lg ${getHeaderColor(notification.type)}`}>
                          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </h3>
                        <p className="font-semibold text-white">
                          {notification.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 flex items-center">
                        <Clock size={14} className="mr-1" /> {notification.time}
                      </span>
                      <button 
                        onClick={() => removeNotification(notification.id)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300">{notification.description}</p>
                  <div className="mt-3 flex justify-end">
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm text-gray-300 hover:text-white underline"
                      >
                        Marcar como leída
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State (shown when no notifications) */}
          {notifications.length === 0 && (
            <div className="bg-gray-800 rounded-lg p-10 text-center">
              <Bell size={48} className="mx-auto text-gray-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">No tienes notificaciones</h3>
              <p className="text-gray-400">Las notificaciones aparecerán aquí cuando haya actualizaciones importantes.</p>
            </div>
          )}
        </section>

        {/* Settings Section */}
        <section className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuración de Notificaciones</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notificaciones de pedidos</h3>
                <p className="text-sm text-gray-400">Recibe actualizaciones sobre el estado de tus pedidos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Ofertas y promociones</h3>
                <p className="text-sm text-gray-400">Entérate de descuentos y ofertas especiales</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notificaciones por email</h3>
                <p className="text-sm text-gray-400">Recibe notificaciones también por correo electrónico</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm py-4">
          <p>© {new Date().getFullYear()} Gaming Gear. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}