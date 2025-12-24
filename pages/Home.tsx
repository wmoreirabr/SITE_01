
import React from 'react';
import { useChat } from '../components/Layout.tsx';

const Home: React.FC = () => {
  const { openChat } = useChat();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=2000" 
            alt="Interior elegante com porcelanato" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-blue/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
              A base do seu <br /> próximo <span className="text-brand-yellow">projeto.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 font-light leading-relaxed">
              Curadoria exclusiva de revestimentos que unem durabilidade e sofisticação para ambientes extraordinários. Sua casa merece o <span className="text-brand-yellow font-bold">Rei.</span>
            </p>
            <button 
              onClick={openChat}
              className="bg-brand-yellow text-brand-blue px-8 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0 border-2 border-brand-blue"
            >
              Quero entender qual piso é ideal para mim
            </button>
          </div>
        </div>
      </section>

      {/* Featured Quote Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-yellow mb-6 block bg-brand-blue px-3 py-1 w-fit">Sobre Nós</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-tight text-brand-blue">
                Design que transcende tendências, qualidade que atravessa gerações.
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                Na Rei dos Reis Revestimentos, não vendemos apenas materiais de acabamento. Proporcionamos a consultoria técnica necessária para que sua escolha seja perfeita, funcional e atemporal. Nossa tradição desde 2001 em Angra dos Reis garante sua tranquilidade.
              </p>
            </div>
            <div className="flex-1 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-brand-yellow/10">
              <img 
                src="https://lh3.googleusercontent.com/p/AF1QipP5phj6eBOXfPWQdpOBtAoEiItKP0pQf58k032f=s680-w680-h510-rw" 
                alt="Showroom Rei dos Reis Revestimentos" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
