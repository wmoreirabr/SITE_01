
import React from 'react';
import { Icons } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column - Info */}
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-yellow mb-4 block">Fale Conosco</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-10 text-brand-blue">O acabamento perfeito começa aqui.</h1>
            
            <div className="space-y-12">
              <div className="border-l-4 border-brand-yellow pl-6">
                <h4 className="text-xs font-black uppercase text-brand-blue mb-4">Localização Principal</h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  R. Alan Kardec - Areal<br />
                  Angra dos Reis - RJ<br />
                  CEP 23932-710
                </p>
              </div>

              <div className="border-l-4 border-brand-blue pl-6">
                <h4 className="text-xs font-black uppercase text-brand-blue mb-4">Canais de Atendimento</h4>
                <div className="space-y-4">
                  <p className="text-lg text-gray-600 flex items-center gap-3">
                    <span className="text-brand-blue font-black">WhatsApp:</span> (24) 99974-9523
                  </p>
                  <p className="text-lg text-gray-600 flex items-center gap-3">
                    <span className="text-brand-blue font-black">Email:</span> vendas@reidosreis.com.br
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="https://wa.me/5524999749523" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-brand-blue text-brand-yellow px-10 py-5 rounded-xl font-black transition-all hover:-translate-y-1 hover:shadow-2xl border-2 border-brand-yellow shadow-xl"
                >
                  <Icons.WhatsApp />
                  Falar no WhatsApp Agora
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-brand-blue p-10 md:p-16 rounded-3xl border-4 border-brand-yellow shadow-2xl text-white">
            <h3 className="text-2xl font-bold mb-8">Solicite um Orçamento</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs font-black uppercase text-brand-yellow mb-2 block">Nome Completo</label>
                <input 
                  type="text" 
                  placeholder="Seu nome"
                  className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-yellow transition-all text-white placeholder-white/30"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-brand-yellow mb-2 block">Celular / WhatsApp</label>
                <input 
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-yellow transition-all text-white placeholder-white/30"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-brand-yellow mb-2 block">Seu Projeto</label>
                <textarea 
                  rows={4}
                  placeholder="Conte-nos o que você precisa..."
                  className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-yellow transition-all resize-none text-white placeholder-white/30"
                ></textarea>
              </div>
              <button 
                className="w-full bg-brand-yellow text-brand-blue font-black py-5 rounded-xl uppercase tracking-widest text-xs hover:bg-white transition-all shadow-lg"
              >
                Enviar Solicitação ao Rei
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
