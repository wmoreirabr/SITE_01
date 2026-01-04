
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants.tsx';
import { Message } from '../types.ts';
import { sendMessageToGemini } from '../services/geminiService.ts';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

// Fixed: The 'aistudio' property is already defined on the Window interface with type 'AIStudio' in this environment.
// We use the existing type name and augment the AIStudio interface to avoid the 'Subsequent property declarations' error.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'Oi! Sou o assistente da Rei dos Reis. Como posso te ajudar a deixar sua casa linda gastando pouco hoje?' 
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

    // Fixed: Safe access to window.aistudio using the augmented AIStudio type
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
    }

    const userMsg: Message = { role: 'user', text };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(updatedMessages, text);
      
      if (response === "CHAVE_REQUERIDA") {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: 'Para eu te passar as melhores ofertas, preciso que ative sua chave de acesso clicando no botão que vai aparecer.' 
        }]);
        if (window.aistudio) await window.aistudio.openSelectKey();
      } else {
        setMessages(prev => [...prev, { role: 'model', text: response }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Opa, deu um errinho aqui. Me chama no WhatsApp (24) 99974-9523 que a gente conversa melhor!' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end items-end md:items-center">
      <div className="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full md:w-[480px] flex flex-col h-[94dvh] md:h-[85vh] md:max-h-[800px] md:mr-6 shadow-[0_0_60px_rgba(0,0,0,0.3)] rounded-t-[2.5rem] md:rounded-[2rem] overflow-hidden animate-in slide-in-from-bottom md:slide-in-from-right duration-500 ease-out">
        
        <div className="px-6 py-8 md:px-10 bg-brand-blue text-white flex-shrink-0 relative border-b border-brand-yellow/10">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-brand-yellow mb-1">Dúvidas sobre Obra</p>
              <h3 className="text-xl font-bold tracking-tight">Atendimento Prático</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Icons.Close />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 md:p-10 space-y-8 bg-brand-light/50 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] px-6 py-4 rounded-3xl shadow-sm text-sm leading-relaxed ${
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
              <div className="bg-white border border-gray-100 px-6 py-4 rounded-3xl flex gap-1.5 items-center shadow-sm">
                <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div className="h-4"></div>
        </div>

        <div className="p-6 md:p-10 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="relative flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="O que você precisa hoje?"
              className="flex-grow bg-brand-light border-2 border-transparent focus:border-brand-yellow/40 rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all placeholder-brand-blue/30"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="p-4 bg-brand-blue text-brand-yellow rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30 shadow-lg border-2 border-brand-yellow/20"
            >
              <Icons.Send />
            </button>
          </div>
          <div className="mt-4 flex flex-col items-center gap-2">
            <a 
              href="https://wa.me/5524999749523" 
              target="_blank"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-blue/40 hover:text-brand-blue transition-colors"
            >
              <Icons.WhatsApp /> Chamar no Zap (24) 99974-9523
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
