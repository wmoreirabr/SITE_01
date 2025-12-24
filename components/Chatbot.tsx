
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants.tsx';
import { Message } from '../types.ts';
import { sendMessageToGemini } from '../services/geminiService.ts';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'Bem-vindo ao atendimento personalizado Rei dos Reis. Sou seu consultor virtual e estou aqui para auxiliar na escolha técnica do seu revestimento. Para começar, em qual ambiente você está focando agora?' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: 'user', text };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(updatedMessages, text);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Sentimos muito, mas nossa linha direta digital está instável. Por favor, fale com nosso especialista sênior no (24) 99974-9523.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end items-end md:items-center md:p-6">
      <div className="absolute inset-0 bg-brand-blue/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full md:w-[450px] flex flex-col h-[95dvh] md:h-[85vh] max-h-[900px] shadow-2xl rounded-t-3xl md:rounded-3xl overflow-hidden animate-in slide-in-from-bottom md:slide-in-from-right duration-500 ease-out border border-brand-yellow/20">
        
        {/* Header - Compactado para Mobile */}
        <div className="px-6 py-8 md:px-8 md:py-10 bg-brand-blue text-white relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-yellow mb-1">Showroom Virtual</p>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">Consultor de Projetos</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Icons.Close />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 bg-brand-light/30">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-brand-blue text-white rounded-br-none' 
                  : 'bg-white text-brand-blue border border-gray-100 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 px-5 py-3.5 rounded-2xl rounded-bl-none flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Action Area */}
        <div className="p-6 md:p-8 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="relative flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua dúvida..."
              className="flex-grow bg-brand-light border-2 border-transparent focus:border-brand-yellow/30 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="p-3.5 bg-brand-blue text-brand-yellow rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30 shadow-lg"
            >
              <Icons.Send />
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <a 
              href="https://wa.me/5524999749523" 
              target="_blank"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-blue/50 hover:text-brand-blue transition-colors"
            >
              <Icons.WhatsApp /> Falar com Atendente Humano
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
