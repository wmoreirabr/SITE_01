
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types.ts";

const SYSTEM_INSTRUCTION = `
Você é o Consultor Especialista da "Rei dos Reis Revestimentos" em Angra dos Reis.
Sua missão: ajudar na escolha de porcelanatos, louças, metais e granitos.

DIRETRIZES:
- Localização: Bairro Areal, Angra dos Reis.
- Tom: Profissional, prestativo e focado em vendas.
- Respostas curtas: Máximo 2 a 3 frases.
- Objetivo: Qualificar o interesse do cliente (Ambiente -> Tipo de Obra -> Estilo).
- Conversão: Se o cliente parecer decidido ou tiver dúvidas técnicas complexas, direcione para o WhatsApp (24) 99974-9523.
`;

export const sendMessageToGemini = async (history: Message[], userInput: string): Promise<string> => {
  try {
    // Inicialização direta conforme diretrizes da SDK
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    /**
     * CONSTRUÇÃO DO CONTEÚDO:
     * A API exige alternância estrita entre 'user' e 'model'.
     * O histórico já contém a última mensagem do usuário enviada pelo componente.
     */
    const contents = history
      .filter((msg, index) => {
        // Regra 1: O primeiro turno deve ser obrigatoriamente do usuário.
        // Pulamos a saudação inicial estática do modelo.
        if (index === 0 && msg.role === 'model') return false;
        return true;
      })
      .map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        topK: 40
      }
    });

    const text = response.text;
    if (!text) throw new Error("Resposta vazia da API");
    
    return text;

  } catch (error: any) {
    console.error("Erro detalhado no Chatbot:", error);
    
    // Tratamento de erros amigável para o usuário
    if (error.message?.includes("API_KEY") || error.message?.includes("403")) {
      return "Estou passando por uma atualização técnica. Por favor, fale diretamente com nosso time no WhatsApp: (24) 99974-9523.";
    }
    
    throw error;
  }
};
