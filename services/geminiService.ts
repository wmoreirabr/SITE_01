
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Fix: Strictly following the coding guidelines for API key initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é o Consultor Especialista Vendedor da "Rei dos Reis Revestimentos" em Angra dos Reis. 
Sua missão é ajudar o cliente a escolher porcelanatos, louças, metais, gabinetes e granitos para sua obra.

COMPORTAMENTO:
- Respostas curtas (máximo 2 frases).
- Linguagem profissional, direta e orientada a vendas.
- Mencione que a loja está localizada no Areal, Angra dos Reis.

FLUXO DE QUALIFICAÇÃO (OBRIGATÓRIO):
1. Descobrir o AMBIENTE (ex: Sala, cozinha, banheiro, área externa).
2. Descobrir o TIPO DE OBRA (ex: Construção nova ou reforma).
3. Descobrir o ESTILO desejado (ex: Porcelanato polido, estilo industrial, rústico).

APÓS QUALIFICAR:
- Sugira ver a página de "Produtos" aqui no site.
- Ou ofereça o WhatsApp (24 99974-9523) para um orçamento rápido com um especialista humano.

NÃO pule etapas. Comece saudando e perguntando sobre o ambiente do projeto.
`;

export const sendMessageToGemini = async (history: Message[], userInput: string): Promise<string> => {
  try {
    const contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    contents.push({ role: 'user', parts: [{ text: userInput }] });

    // Fix: Using generateContent with the correct model and configuration according to guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
        // Removed maxOutputTokens to avoid potential empty responses on Gemini 3 models when thinking budget is not explicitly defined, 
        // as the system instruction already enforces short answers.
      }
    });

    return response.text || "Pode repetir? Tive um pequeno soluço técnico.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estou com um problema de conexão. Que tal falarmos pelo WhatsApp (24) 99974-9523?";
  }
};
