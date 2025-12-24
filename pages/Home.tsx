
import React from 'react';
import { useChat } from '../components/Layout.tsx';

const Home: React.FC = () => {
  const { openChat } = useChat();

  return (
    <div className="relative">
      {/* Hero Section - Ajustado para Dynamic Viewport Height */}
      <section className="relative min-h-[90dvh] flex items-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Interior de luxo" 
            className="w-full h-full object-cover scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.4em] uppercase bg-brand-yellow text-brand-blue rounded-full">
              Exclusividade em Angra dos Reis
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
              Onde o <br />
              <span className="text-brand-yellow italic">Design</span> encontra <br />
              a Tradição.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 font-light leading-relaxed max-w-xl">
              Há mais de duas décadas, o <strong>Rei dos Reis</strong> define o padrão de excelência para as residências mais sofisticadas da região.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openChat}
                className="bg-brand-yellow text-brand-blue px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0"
              >
                Consultar Especialista
              </button>
              <a 
                href="#sobre"
                className="px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest text-white border-2 border-white/30 hover:bg-white/10 transition-all text-center"
              >
                Conhecer Showroom
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Expertise Section */}
      <section id="sobre" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-4 bg-brand-yellow/20 rounded-2xl blur-2xl group-hover:bg-brand-yellow/30 transition-all duration-700"></div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=1200" 
                  alt="Amostras de materiais premium" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-blue text-white p-6 md:p-10 rounded-2xl shadow-2xl border-4 border-brand-yellow">
                <p className="text-4xl md:text-5xl font-black text-brand-yellow mb-1">20+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest">Anos em Angra</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight text-brand-blue">
                Curadoria que <br className="hidden md:block" /> transforma espaços.
              </h2>
              <p className="text-gray-500 leading-relaxed text-base md:text-lg mb-8">
                Cada peça em nosso showroom é selecionada por critérios rigorosos de estética e durabilidade. Somos parceiros do seu arquiteto para garantir que cada detalhe seja impecável.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {['Logística em Angra', 'Consultoria Técnica', 'Marcas Líderes', 'Showroom no Areal'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-brand-blue text-sm">
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-brand-yellow text-brand-blue rounded-full text-[10px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={openChat}
                className="text-brand-blue font-black uppercase tracking-widest text-xs border-b-4 border-brand-yellow pb-1 hover:text-brand-yellow transition-all"
              >
                Agendar Visita Técnica
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes subtle-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Home;
