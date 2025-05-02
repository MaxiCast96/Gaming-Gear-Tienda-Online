import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { id: 1, name: 'Auriculares', image: 'https://i.blogs.es/086109/mejores-auriculares-gaming-guia-de-compra/1366_2000.jpg', slug: 'auriculares' },
    { id: 2, name: 'Teclados', image: 'https://img.pccomponentes.com/pcblog/385/diferencias-tipos-switch-teclado-7.jpg', slug: 'teclados' },
    { id: 3, name: 'Consolas', image: 'https://www.revistaeyn.com/binrepository/1200x675/0c0/0d0/none/26086/DQKT/mejores-consolas-2021_1478165_20220507134217.jpg', slug: 'consolas' },
    { id: 4, name: 'Ratones', image: 'https://rymportatiles.com.pe/cdn/shop/articles/ventajas-mouse-gamer.png?v=1700713750&width=800', slug: 'ratones' },
    { id: 5, name: 'Monitores', image: 'https://xanxogaming.com/wp-content/uploads/2023/01/Monitor-Guia-Banner.jpg', slug: 'monitores' },
    { id: 6, name: 'Accesorios para consola', image: 'https://www.nxp.jp/assets/images/en/blogs/BL-DEVELOPING-ACCESSORIES-1.jpg', slug: 'accesorios-consola' },
    { id: 7, name: 'Componentes de PC', image: 'https://i0.wp.com/www.parapcgamers.com/wp-content/uploads/2020/05/componentes-pc-gamer-2020.jpg?fit=770%2C422&ssl=1', slug: 'componentes-pc' },
    { id: 8, name: 'Mandos y controladores', image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/01/mandos-consola.jpg?tf=1200x1200', slug: 'mandos-controladores' },
    { id: 9, name: 'Streaming y Grabación', image: 'https://www.neolo.com/blog/wp-content/uploads/2022/05/streaming-para-radio-online-scaled.jpg', slug: 'streaming-grabacion' },
    { id: 10, name: 'Juegos', image: 'https://juegosdigitaleselsalvador.com/files/images/productos/1689984949-pack-de-6-juegos-accion-ps5-0.jpg', slug: 'juegos' },
  ];

  return (
    <div className="bg-red-900 py-12 px-10 flex flex-col min-h-screen w-full">
      <h2 className="text-white text-3xl font-bold text-center mb-10">Categorías</h2>
      
      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            to={`/categoria`} 
            key={category.id}
            className="block relative rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <div className="h-48 bg-indigo-900 rounded-lg overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold text-center px-2">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;