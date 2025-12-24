
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
    // Inicializa a IA conforme as diretrizes obrigatórias
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Filtramos o histórico para garantir que o primeiro turno seja sempre 'user'
    // A saudação inicial do bot (índice 0) é ignorada no envio para a API
    const contents = history
      .filter((msg, index) => {
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
      },
    });

    const text = response.text;
    if (!text) throw new Error("A IA retornou uma resposta vazia.");
    
    return text;

  } catch (error: any) {
    console.error("Erro na API Gemini:", error);
    
    // Se for erro de chave (403/401), avisamos no chat de forma clara
    if (error.message?.includes("API_KEY") || error.message?.includes("403") || error.message?.includes("401")) {
      return "Estou com uma instabilidade técnica na minha chave de IA. Por favor, fale com nossos especialistas no WhatsApp: (24) 99974-9523 para um atendimento imediato!";
    }

    throw error;
  }
};
