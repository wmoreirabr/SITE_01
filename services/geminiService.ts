
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types.ts";

const SYSTEM_INSTRUCTION = `
Você é o "Consultor de Luxo" da Rei dos Reis Revestimentos em Angra dos Reis. 
Sua especialidade: Porcelanatos premium, pedras naturais e acabamentos de alto padrão.

DIRETRIZES DE PERSONALIDADE:
- Tom: Elegante, técnico mas acessível, e extremamente prestativo.
- Localização: Valorize que estamos no Areal, Angra dos Reis.
- Objetivo principal: Identificar a necessidade (sala, piscina, banheiro) e convidar o cliente para ver as amostras físicas no showroom ou falar com um vendedor no WhatsApp (24) 99974-9523.

REGRAS DE RESPOSTA:
- Use no máximo 2 parágrafos curtos.
- Nunca dê preços exatos (diga que variam por metragem e estoque).
- Se o cliente perguntar algo que você não sabe, direcione para o WhatsApp.
`;

export const sendMessageToGemini = async (history: Message[], userInput: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Filtra o histórico para garantir que comece com 'user' e alterne corretamente
    // Ignoramos a primeira saudação fixa do bot se ela for o único item
    const chatHistory = history
      .filter((msg, index) => !(index === 0 && msg.role === 'model'))
      .map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

    // Se após o filtro não houver histórico, usamos apenas a entrada atual
    const contents = chatHistory.length > 0 ? chatHistory : [{ role: 'user', parts: [{ text: userInput }] }];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
      },
    });

    const text = response.text;
    if (!text) throw new Error("Resposta vazia da IA");
    
    return text;

  } catch (error: any) {
    console.error("Erro na consultoria virtual:", error);
    return "Peço desculpas, tive uma pequena instabilidade. Para um atendimento imediato e técnico, por favor, chame nossa equipe no WhatsApp: (24) 99974-9523.";
  }
};
