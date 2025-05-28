import { useState } from 'react';

export default function DashboardGamingGear() {
  // Estado para controlar la vista en dispositivos móviles
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Datos de resumen
  const summaryData = {
    ventasTotales: 25345,
    pedidosPendientes: 15,
    clientesActivos: 320
  };
  
  // Datos de ventas recientes
  const recentSales = [
    { id: '#4521', fecha: '2025-02-26', total: 120, estado: 'Pendiente' },
    { id: '#4520', fecha: '2025-02-25', total: 140, estado: 'Enviado' },
    { id: '#4519', fecha: '2025-02-24', total: 55, estado: 'Entregado' }
  ];
  
  // Datos de stock
  const stockData = [
    { producto: 'Teclado Mecánico', cantidad: 45 },
    { producto: 'Ratón Gaming', cantidad: 30 },
    { producto: 'Auriculares RGB', cantidad: 12 }
  ];
  
  // Función para obtener la clase de color según el estado
  const getStatusClass = (status) => {
    switch(status) {
      case 'Pendiente':
        return 'bg-yellow-500';
      case 'Enviado':
        return 'bg-blue-500';
      case 'Entregado':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 bg-black`}>
        <div className="p-4">
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Dashboard</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Gestión de Productos</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Gestión de Usuarios</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Gestión de Pedidos</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Soporte al Cliente</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Panel de Notificaciones</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Configuración</div>
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
          <h1 className="text-2xl font-bold text-red-500 mb-8">Dashboard de Administrador - Gaming Gear</h1>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded text-center">
              <h2 className="text-lg mb-2">Ventas Totales</h2>
              <p className="text-2xl text-red-500">${summaryData.ventasTotales}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded text-center">
              <h2 className="text-lg mb-2">Pedidos Pendientes</h2>
              <p className="text-2xl text-red-500">{summaryData.pedidosPendientes}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded text-center">
              <h2 className="text-lg mb-2">Clientes Activos</h2>
              <p className="text-2xl text-red-500">{summaryData.clientesActivos}</p>
            </div>
          </div>
          
          {/* Recent Sales */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Ventas Recientes</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-800 rounded">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-4 text-left">Pedido</th>
                    <th className="p-4 text-left">Fecha</th>
                    <th className="p-4 text-left">Total</th>
                    <th className="p-4 text-left">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map(sale => (
                    <tr key={sale.id} className="border-b border-gray-700">
                      <td className="p-4">{sale.id}</td>
                      <td className="p-4">{sale.fecha}</td>
                      <td className="p-4">${sale.total}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded text-white text-sm ${getStatusClass(sale.estado)}`}>
                          {sale.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Stock Management */}
          <div>
            <h2 className="text-xl font-bold mb-4">Gestión de Stock</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-800 rounded">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-4 text-left">Producto</th>
                    <th className="p-4 text-left">Cantidad</th>
                    <th className="p-4 text-left">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-4">{item.producto}</td>
                      <td className="p-4">{item.cantidad}</td>
                      <td className="p-4">
                        <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm">
                          Actualizar
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