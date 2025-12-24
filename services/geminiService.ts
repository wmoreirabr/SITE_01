
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types.ts";

const SYSTEM_INSTRUCTION = `
Você é o Consultor Especialista da "Rei dos Reis Revestimentos" em Angra dos Reis.
Sua missão: ajudar na escolha de porcelanatos, louças, metais e granitos.
Localização: Bairro Areal, Angra dos Reis.
Respostas curtas (2 frases) e foco em levar o cliente para o WhatsApp (24) 99974-9523.
`;

export const sendMessageToGemini = async (history: Message[], userInput: string): Promise<string> => {
  try {
    // Inicialização direta conforme regras da documentação
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // A API Gemini 3 exige que o histórico comece com 'user'.
    // Removemos a primeira mensagem (que é a saudação do robô).
    const contents = history
      .slice(1) 
      .map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

    // Se o histórico estiver vazio após o filtro, enviamos apenas a mensagem atual
    const finalPayload = contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: userInput }] }];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: finalPayload,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Pode repetir? Não consegui processar agora.";

  } catch (error: any) {
    console.error("Erro na IA:", error);
    // Mensagem amigável padrão para instabilidades de conexão ou chave
    return "Tive uma instabilidade na conexão. Para não te fazer esperar, você pode falar com um especialista agora no WhatsApp: (24) 99974-9523.";
  }
};
