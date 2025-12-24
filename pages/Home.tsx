
import React from 'react';
import { useChat } from '../components/Layout.tsx';

const Home: React.FC = () => {
  const { openChat } = useChat();

  return (
    <div className="relative">
      {/* Hero Section - Focado em não esconder o CTA principal */}
      <section className="relative min-h-[85dvh] flex items-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Interior de luxo" 
            className="w-full h-full object-cover scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.4em] uppercase bg-brand-yellow text-brand-blue rounded-full">
              Excelência em Angra dos Reis
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
              Revestindo o seu <br />
              <span className="text-brand-yellow italic">Sucesso.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 font-light leading-relaxed max-w-xl">
              Há mais de duas décadas, o <strong>Rei dos Reis</strong> define o padrão de luxo para as residências mais sofisticadas da região.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openChat}
                className="bg-brand-yellow text-brand-blue px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95"
              >
                Consultar Especialista
              </button>
              <a 
                href="#showroom"
                className="px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest text-white border-2 border-white/30 hover:bg-white/10 transition-all text-center"
              >
                Conhecer Loja
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Expertise Section - Imagem Substituída e Layout Ajustado */}
      <section id="showroom" className="py-24 bg-white mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Window Adjust: Container de Imagem com proteção contra corte */}
            <div className="relative group order-2 lg:order-1 max-w-2xl mx-auto lg:mx-0 w-full">
              <div className="absolute -inset-4 bg-brand-yellow/10 rounded-3xl blur-2xl group-hover:bg-brand-yellow/20 transition-all duration-700"></div>
              <div className="relative aspect-square md:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-light">
                <img 
                  src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxm8dHoZYU02TmT49azD0wNOTXCpjbbA3cBGEFl2w_wsVei47KYbKFWtwY-VQh5CxucYQdVUofds_w9IjDsKOzleXM4yK86V2wIWuBUBUU5GCWbIl-VDryYwYmfnWp_bPx1gD3X=s680-w680-h510-rw" 
                  alt="Showroom Rei dos Reis Revestimentos em Angra" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Badge ajustado para não cobrir CTAs no mobile */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-brand-blue text-white p-6 md:p-10 rounded-2xl shadow-2xl border-4 border-brand-yellow z-20">
                <p className="text-3xl md:text-5xl font-black text-brand-yellow mb-1 tracking-tighter">ESTOQUE</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Pronta Entrega em Angra</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight text-brand-blue">
                Qualidade real, <br className="hidden md:block" /> pronta para o seu projeto.
              </h2>
              <p className="text-gray-500 leading-relaxed text-base md:text-lg mb-8">
                Localizados estrategicamente no bairro Areal, oferecemos o maior showroom de pronta entrega de Angra dos Reis. Porcelanatos, granitos e louças que você pode ver e tocar antes de decidir.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {['Logística em Angra', 'Consultoria Técnica', 'Marcas Premium', 'Showroom no Areal'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-brand-blue text-sm">
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-brand-yellow text-brand-blue rounded-full text-[10px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              {/* Botão com margem extra para não ser escondido por elementos flutuantes */}
              <button 
                onClick={openChat}
                className="text-brand-blue font-black uppercase tracking-widest text-xs border-b-4 border-brand-yellow pb-2 hover:text-brand-yellow transition-all inline-block"
              >
                Agendar Visita ao Showroom
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes subtle-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default Home;
