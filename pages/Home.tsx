
import React from 'react';
import { useChat } from '../components/Layout.tsx';

const Home: React.FC = () => {
  const { openChat } = useChat();

  return (
    <div className="relative">
      {/* Hero Section - Focado em acessibilidade */}
      <section className="relative min-h-[85dvh] flex items-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Casa bonita e reformada" 
            className="w-full h-full object-cover scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.4em] uppercase bg-brand-yellow text-brand-blue rounded-full">
              O Melhor Preço de Angra dos Reis
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
              Sua casa linda <br />
              <span className="text-brand-yellow italic">do seu jeito.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 font-light leading-relaxed max-w-xl">
              Na <strong>Rei dos Reis</strong>, você encontra tudo para sua reforma com o preço que cabe no seu bolso e facilidade no pagamento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openChat}
                className="bg-brand-yellow text-brand-blue px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95"
              >
                Pedir Orçamento
              </button>
              <a 
                href="#showroom"
                className="px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest text-white border-2 border-white/30 hover:bg-white/10 transition-all text-center"
              >
                Ver Promoções
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Expertise Section - Foco em Pronta Entrega e Localização */}
      <section id="showroom" className="py-24 bg-white mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            <div className="relative group order-2 lg:order-1 max-w-2xl mx-auto lg:mx-0 w-full">
              <div className="absolute -inset-4 bg-brand-yellow/10 rounded-3xl blur-2xl group-hover:bg-brand-yellow/20 transition-all duration-700"></div>
              <div className="relative aspect-square md:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-light">
                <img 
                  src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxm8dHoZYU02TmT49azD0wNOTXCpjbbA3cBGEFl2w_wsVei47KYbKFWtwY-VQh5CxucYQdVUofds_w9IjDsKOzleXM4yK86V2wIWuBUBUU5GCWbIl-VDryYwYmfnWp_bPx1gD3X=s680-w680-h510-rw" 
                  alt="Nossa loja no Areal" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-brand-blue text-white p-6 md:p-10 rounded-2xl shadow-2xl border-4 border-brand-yellow z-20">
                <p className="text-3xl md:text-5xl font-black text-brand-yellow mb-1 tracking-tighter">TEMOS TUDO</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Levou, Chegou! Entrega Rápida</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight text-brand-blue">
                Muita variedade <br className="hidden md:block" /> e o melhor atendimento.
              </h2>
              <p className="text-gray-500 leading-relaxed text-base md:text-lg mb-8">
                Estamos aqui no Areal para facilitar sua vida. Temos o maior estoque da região com pisos, pias e gabinetes para você reformar sem dor de cabeça e gastando pouco.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {['Entrega no mesmo dia', 'Preço Justo', 'Muita Opção', 'Loja no Areal'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-brand-blue text-sm">
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-brand-yellow text-brand-blue rounded-full text-[10px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={openChat}
                className="text-brand-blue font-black uppercase tracking-widest text-xs border-b-4 border-brand-yellow pb-2 hover:text-brand-yellow transition-all inline-block"
              >
                Falar com um Vendedor
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
