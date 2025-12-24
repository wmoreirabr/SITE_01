
import React, { useState, createContext, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from '../constants';
import Chatbot from './Chatbot';

interface ChatContextType {
  openChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};

interface LayoutProps {
  children: React.ReactNode;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Produtos', path: '/produtos' },
    { label: 'Contato', path: '/contato' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-brand-blue/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tighter uppercase flex items-center gap-2 group">
          <span className="text-brand-blue group-hover:text-blue-700 transition-colors">Rei dos Reis</span>
          <span className="text-brand-yellow font-black">Revestimentos</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-bold transition-all hover:text-brand-blue relative py-1 ${
                location.pathname === item.path ? 'text-brand-blue' : 'text-gray-400'
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-yellow"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-blue" onClick={() => setIsOpen(!isOpen)}>
          <Icons.Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-brand-blue/10 px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-bold ${
                location.pathname === item.path ? 'text-brand-blue' : 'text-gray-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase tracking-tighter">
            <span className="text-white">Rei dos Reis</span> <span className="text-brand-yellow">Revestimentos</span>
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            Desde 2001 transformando lares em Angra dos Reis com porcelanatos, louças e metais de alto padrão. Qualidade que você sente sob seus pés.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 uppercase text-brand-yellow">Contato</h4>
          <ul className="text-sm text-gray-300 space-y-2 font-medium">
            <li>(24) 99974-9523</li>
            <li>R. Alan Kardec - Areal, Angra dos Reis - RJ</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 uppercase text-brand-yellow">Atendimento</h4>
          <ul className="text-sm text-gray-300 space-y-2 font-medium">
            <li>Segunda a Sexta: 08:00 - 18:00</li>
            <li>Sábado: 08:00 - 13:00</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>© 2024 Rei dos Reis Revestimentos. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-yellow transition-colors">Privacidade</a>
          <a href="#" className="hover:text-brand-yellow transition-colors">Termos</a>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ChatContext.Provider value={{ openChat: () => setIsChatOpen(true) }}>
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />

        {/* Floating Chat Trigger */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-brand-yellow text-brand-blue p-5 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center group border-2 border-brand-blue"
          aria-label="Abrir Chat"
        >
          <Icons.Chat />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-300 text-xs font-bold whitespace-nowrap uppercase tracking-widest">
            Falar com Especialista
          </span>
        </button>

        <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </ChatContext.Provider>
  );
};

export default Layout;
