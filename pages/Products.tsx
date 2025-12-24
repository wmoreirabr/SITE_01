
import React from 'react';
import { PRODUCTS } from '../constants';
import { useChat } from '../components/Layout';

const Products: React.FC = () => {
  const { openChat } = useChat();

  return (
    <div className="bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <header className="mb-20">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-yellow mb-4 block text-center">Coleções Premium</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-center text-brand-blue">Nossos Revestimentos</h1>
          <div className="w-24 h-1 bg-brand-yellow mx-auto mt-6"></div>
        </header>

        {/* Grid 2 columns mobile/desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-12 md:gap-y-20">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-200 mb-6 relative border border-gray-100 shadow-lg">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-yellow text-brand-blue px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded shadow-md border border-brand-blue">
                    {product.application}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-1 block">
                  {product.category}
                </span>
                <h3 className="text-sm md:text-lg font-bold tracking-tight mb-2 text-brand-blue group-hover:text-blue-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center p-16 bg-brand-blue rounded-3xl border-4 border-brand-yellow shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Procurando algo específico?</h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">Temos mais de 2.000 modelos em nosso catálogo físico em Angra dos Reis. Fale com um consultor agora.</p>
          <button 
            onClick={openChat}
            className="inline-block bg-brand-yellow text-brand-blue px-12 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl"
          >
            Falar com Especialista
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
