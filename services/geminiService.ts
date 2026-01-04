import { GoogleGenAI } from "@google/genai";
import { Message } from "../types.ts";

const SYSTEM_INSTRUCTION = `
Você é o "Consultor Amigo" da Rei dos Reis Revestimentos em Angra dos Reis. 
Seu foco é o público B e C que busca reformar ou construir com economia e qualidade.

DIRETRIZES:
- Proibido usar: "alto padrão", "exclusividade", "luxo", "premium", "sofisticado".
- Use termos como: "preço justo", "sua casa bonita", "durabilidade", "melhor custo-benefício", "variedade", "pronta entrega".
- Localização: Estamos no bairro Areal, Angra dos Reis. Destaque que somos vizinhos e a entrega é rápida.
- Objetivo: Ajudar o cliente a encontrar o que cabe no bolso dele e levar para o WhatsApp (24) 99974-9523.
- Regra: Respostas diretas, prestativas e simples.
`;

export const sendMessageToGemini = async (history: Message[], userInput: string): Promise<string> => {
  try {
    // Correct initialization as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Format history: Gemini chat history must start with a 'user' turn.
    // Filter out the initial bot greeting and map to the required structure.
    const chatHistory = history
      .filter((msg, index) => !(index === 0 && msg.role === 'model'))
      .slice(0, -1) // Remove the last user input as it's sent via sendMessage
      .map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: chatHistory as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message: userInput });
    
    // Use .text property directly as per extracting text guidelines
    const text = response.text;
    
    if (!text) throw new Error("Empty response from model");
    return text;

  } catch (error: any) {
    console.error("Erro Gemini:", error);
    
    // Handling specific error codes or messages if necessary
    if (error.message?.includes("Requested entity was not found") || error.status === 404) {
      return "CHAVE_REQUERIDA";
    }
    
    return "Oi! Tivemos um probleminha no sistema. Pode me chamar direto no WhatsApp para eu te ajudar? É o (24) 99974-9523.";
  }
};