import { useState } from 'react';

export default function ResenasProducto() {
  const [filtro, setFiltro] = useState('todas');
  
  const estadisticas = {
    promedio: 4.7,
    total: 5,
    distribucion: [
      { estrellas: 5, porcentaje: 80, cantidad: 80 },
      { estrellas: 4, porcentaje: 15, cantidad: 15 },
      { estrellas: 3, porcentaje: 3, cantidad: 3 },
      { estrellas: 2, porcentaje: 1, cantidad: 1 },
      { estrellas: 1, porcentaje: 1, cantidad: 1 }
    ]
  };
  
  const resenas = [
    {
      id: 1,
      usuario: 'Usuario1',
      fecha: '15 Feb 2025',
      estrellas: 5,
      comentario: '¡Excelente producto! Me encantó la calidad y el servicio. 10/10 👍'
    },
    {
      id: 2,
      usuario: 'Usuario2',
      fecha: '12 Feb 2025',
      estrellas: 4,
      comentario: 'Muy bueno, pero la entrega tardó un poco.'
    },
    {
      id: 3,
      usuario: 'Usuario3',
      fecha: '10 Feb 2025',
      estrellas: 3,
      comentario: 'El producto está bien, pero esperaba mejor embalaje.'
    }
  ];
  
  // Filtrar reseñas basado en el filtro seleccionado
  const resenasFiltradas = filtro === 'todas' 
    ? resenas 
    : resenas.filter(resena => resena.estrellas === parseInt(filtro));
  
  // Renderizar estrellas
  const renderEstrellas = (cantidad) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className="text-red-500 text-lg">
        {i < cantidad ? '★' : '☆'}
      </span>
    ));
  };
  
  return (
    <div className="min-h-screen bg-red-900 p-4 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Reseñas del Producto</h1>
        
        {/* Calificación General */}
        <div className="mb-6">
          <h2 className="text-xl mb-2">Calificación General</h2>
          <div className="flex items-center mb-2">
            <div className="flex text-red-500 text-2xl mr-2">
              {renderEstrellas(Math.round(estadisticas.promedio))}
            </div>
            <span className="text-sm text-gray-300">
              {estadisticas.promedio} de {estadisticas.total}
            </span>
          </div>
          
          {/* Distribución de estrellas */}
          <div className="mb-4">
            {estadisticas.distribucion.map((item) => (
              <div key={item.estrellas} className="flex items-center mb-1">
                <span className="w-20 text-sm">{item.estrellas} estrellas</span>
                <div className="flex-grow bg-gray-800 h-4 rounded overflow-hidden mx-2">
                  <div 
                    className="bg-red-600 h-full" 
                    style={{ width: `${item.porcentaje}%` }}
                  ></div>
                </div>
                <span className="w-8 text-right text-sm">{item.porcentaje}%</span>
              </div>
            ))}
          </div>
          
          {/* Filtro */}
          <div className="flex items-center">
            <span className="mr-2 text-sm">Filtrar por:</span>
            <button 
              className={`px-3 py-1 text-xs rounded ${filtro === 'todas' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setFiltro('todas')}
            >
              Todas
            </button>
            {[5, 4, 3, 2, 1].map((num) => (
              <button 
                key={num}
                className={`ml-2 px-3 py-1 text-xs rounded ${filtro === num.toString() ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => setFiltro(num.toString())}
              >
                {num} ★
              </button>
            ))}
          </div>
        </div>
        
        {/* Lista de reseñas */}
        <div>
          {resenasFiltradas.length > 0 ? (
            resenasFiltradas.map((resena) => (
              <div key={resena.id} className="border-t border-gray-700 py-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    {renderEstrellas(resena.estrellas)}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {resena.usuario} - {resena.fecha}
                  </div>
                </div>
                <p className="text-gray-300">{resena.comentario}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-400">
              No hay reseñas con este filtro.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}