import { useState } from "react";

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "#10234",
      client: "Juan Pérez",
      date: "2025-02-01",
      status: "En proceso",
      completed: false,
      shipped: false
    },
    {
      id: "#10235",
      client: "María López",
      date: "2025-02-02",
      status: "Enviado",
      completed: false,
      shipped: true
    },
    {
      id: "#10236",
      client: "Carlos García",
      date: "2025-02-03",
      status: "Entregado",
      completed: true,
      shipped: true
    }
  ]);

  const handleMarkAsShipped = (orderId) => {
    setOrders(
      orders.map(order => 
        order.id === orderId 
          ? { ...order, status: "Enviado", shipped: true } 
          : order
      )
    );
  };

  const handleMarkAsDelivered = (orderId) => {
    setOrders(
      orders.map(order => 
        order.id === orderId 
          ? { ...order, status: "Entregado", completed: true } 
          : order
      )
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "En proceso":
        return <span className="bg-yellow-500 text-white py-1 px-2 rounded text-sm">En proceso</span>;
      case "Enviado":
        return <span className="bg-blue-500 text-white py-1 px-2 rounded text-sm">Enviado</span>;
      case "Entregado":
        return <span className="bg-green-500 text-white py-1 px-2 rounded text-sm">Entregado</span>;
      default:
        return <span className="bg-gray-500 text-white py-1 px-2 rounded text-sm">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-red-400">Gestión de Pedidos - Gaming Gear</h1>
        </header>

        <section>
          <h2 className="text-xl font-semibold mb-4">Lista de Pedidos</h2>
          
          <div className="overflow-x-auto bg-gray-900 rounded-lg shadow">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left">Pedido ID</th>
                  <th className="py-3 px-4 text-left">Cliente</th>
                  <th className="py-3 px-4 text-left">Fecha</th>
                  <th className="py-3 px-4 text-left">Estado</th>
                  <th className="py-3 px-4 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-800">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.client}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-2">
                        {!order.shipped && (
                          <button 
                            onClick={() => handleMarkAsShipped(order.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                          >
                            Marcar como Enviado
                          </button>
                        )}
                        {order.shipped && !order.completed && (
                          <button 
                            onClick={() => handleMarkAsDelivered(order.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                          >
                            Marcar como Entregado
                          </button>
                        )}
                        {order.completed && (
                          <button 
                            disabled
                            className="bg-gray-500 text-white py-1 px-2 rounded text-sm opacity-50 cursor-not-allowed"
                          >
                            Completado
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-8 text-center text-gray-400 text-sm">
          <p>PARA SALIR DE LA PANTALLA COMPLETA, PRESIONA [ESC]</p>
        </footer>
      </div>
    </div>
  );
}