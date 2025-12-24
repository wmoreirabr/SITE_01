
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Porcelanato Premium Polido",
    category: "Porcelanato",
    application: "Interno",
    image: "https://images.unsplash.com/photo-1613974155104-629432657e4e?auto=format&fit=crop&q=80&w=800",
    description: "Brilho intenso e durabilidade para salas e suítes."
  },
  {
    id: 2,
    name: "Gabinete Suspenso Minimalista",
    category: "Gabinetes",
    application: "Área Molhada",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    description: "Design moderno em MDF naval para banheiros sofisticados."
  },
  {
    id: 3,
    name: "Bancada em Granito São Gabriel",
    category: "Pias e Granitos",
    // Fix: Updated "Cozinha" to "Área Molhada" to comply with Product application type constraints
    application: "Área Molhada",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=800",
    description: "Pia esculpida com acabamento refinado e alta resistência."
  },
  {
    id: 4,
    name: "Torneira Gourmet Black Matte",
    category: "Metais",
    // Fix: Updated "Cozinha" to "Área Molhada" to comply with Product application type constraints
    application: "Área Molhada",
    image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?auto=format&fit=crop&q=80&w=800",
    description: "Flexibilidade e controle com acabamento preto fosco."
  },
  {
    id: 5,
    name: "Vaso Sanitário Monobloco",
    category: "Louças",
    application: "Área Molhada",
    image: "https://images.unsplash.com/photo-1585559605806-a97e497556f8?auto=format&fit=crop&q=80&w=800",
    description: "Tecnologia de descarga ultra-eficiente e design curvo."
  },
  {
    id: 6,
    name: "Revestimento Rústico Urban",
    category: "Revestimento",
    application: "Externo",
    image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&q=80&w=800",
    description: "Ideal para fachadas e áreas gourmet com toque industrial."
  }
];

export const Icons = {
  Chat: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
  ),
  Close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  WhatsApp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  )
};
