
import React from 'react';
import { PRODUCTS } from '../constants';
import { useChat } from '../components/Layout';

const Products: React.FC = () => {
  const { openChat } = useChat();

  return (
    <div className="bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-12 md:mb-20">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-yellow mb-4 block text-center">Para sua Construção</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-center text-brand-blue">Tudo para sua Obra</h1>
          <div className="w-16 md:w-24 h-1 bg-brand-yellow mx-auto mt-6"></div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-200 mb-6 relative border border-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-yellow text-brand-blue px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded shadow-md border border-brand-blue/20">
                    {product.application}
                  </span>
                </div>
              </div>
              <div className="px-2 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-1 block">
                  {product.category}
                </span>
                <h3 className="text-base md:text-lg font-bold tracking-tight mb-2 text-brand-blue group-hover:text-blue-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                  {product.description}
                </p>
                <button 
                  onClick={openChat}
                  className="w-full py-3 bg-brand-blue/5 text-brand-blue text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-brand-yellow hover:text-brand-blue transition-all"
                >
                  Ver Preço no Chat
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-32 text-center p-8 md:p-16 bg-brand-blue rounded-3xl border-4 border-brand-yellow shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Não achou o que procurava?</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto text-sm md:text-base">Temos muito mais opções na nossa loja física. Fale com a gente agora e descubra como economizar.</p>
            <button 
              onClick={openChat}
              className="inline-block bg-brand-yellow text-brand-blue px-12 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl"
            >
              Falar com um Vendedor
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Products;
