
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types.ts";

const SYSTEM_INSTRUCTION = `
Você é o "Consultor de Luxo" da Rei dos Reis Revestimentos em Angra dos Reis. 
Sua especialidade: Porcelanatos premium, pedras naturais e acabamentos de alto padrão.

DIRETRIZES:
- Localização: Estamos no bairro Areal, Angra dos Reis.
- Objetivo: Identificar a necessidade e levar o cliente para o WhatsApp (24) 99974-9523 ou showroom.
- Regra: Respostas curtas (máx 2 parágrafos), tom elegante e técnico.
- Não dê preços exatos.
`;

export const sendMessageToGemini = async (history: Message[], userInput: string): Promise<string> => {
  try {
    // Instancia o SDK com a chave atual do ambiente
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Limpa o histórico para o formato da API: remove saudação inicial do bot e alterna corretamente
    // A API de chat exige que o histórico comece com 'user'
    const validHistory = history.filter((msg, index) => !(index === 0 && msg.role === 'model'));
    
    // O histórico para a API não deve incluir a última mensagem enviada agora
    const historyToPass = validHistory.slice(0, -1).map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: historyToPass as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage({ message: userInput });
    const text = result.text;
    
    if (!text) throw new Error("Resposta vazia");
    return text;

  } catch (error: any) {
    console.error("Erro Gemini:", error);
    
    // Tratamento de erro específico para seleção de chave
    if (error.message?.includes("Requested entity was not found")) {
      return "CHAVE_REQUERIDA"; // Sinalizador para o componente disparar o seletor
    }
    
    return "Peço desculpas. Tivemos uma breve instabilidade técnica. Por favor, entre em contato direto pelo WhatsApp: (24) 99974-9523.";
  }
};
