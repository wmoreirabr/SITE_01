
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
      text: 'Olá! Sou o consultor virtual do Rei dos Reis. Em qual ambiente você está trabalhando hoje? (Ex: Sala, Banheiro, Área Externa)' 
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
    const currentMessages = [...messages, userMsg];
    
    setMessages(currentMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToGemini(currentMessages, text);
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Desculpe, tive um pequeno problema técnico na conexão. Que tal continuarmos pelo WhatsApp? (24) 99974-9523' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-brand-blue/30 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative bg-white text-brand-blue w-full md:w-1/3 min-w-[320px] max-w-full md:border-l-4 border-brand-yellow flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-500 ease-out">
        
        {/* Header */}
        <div className="px-6 py-6 flex items-center justify-between bg-brand-blue text-white shadow-lg">
          <div>
            <h3 className="text-lg font-bold tracking-tight">Consultor Rei dos Reis</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-brand-yellow font-black uppercase tracking-widest">Online Agora</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-brand-yellow"
          >
            <Icons.Close />
          </button>
        </div>

        {/* Messages area */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6 bg-brand-light"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm border ${
                  msg.role === 'user' 
                    ? 'bg-brand-blue text-white rounded-br-none font-medium border-brand-blue' 
                    : 'bg-white text-brand-blue rounded-bl-none border-gray-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl rounded-bl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-6 border-t border-gray-100 bg-white pb-10 md:pb-6">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ex: Procuro piso para sala..."
              className="w-full bg-brand-light border-2 border-gray-100 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-blue transition-all pr-12 text-brand-blue placeholder-gray-400"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-3 p-2 bg-brand-yellow text-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-all disabled:opacity-50"
            >
              <Icons.Send />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest font-bold">
            Atendimento via Inteligência Artificial
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
