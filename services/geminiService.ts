
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types.ts";

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
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key não encontrada em process.env.API_KEY");
      return "Estou com um problema de configuração. Por favor, tente falar conosco pelo WhatsApp (24) 99974-9523.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // A API do Gemini exige que o histórico comece com 'user' e alterne.
    // Como nossa primeira mensagem no chat UI é uma saudação 'model', precisamos filtrá-la
    // para que a requisição seja válida.
    const validContents = history
      .filter((msg, index) => {
        // Se a primeira mensagem for do modelo, ignoramos ela para a API
        if (index === 0 && msg.role === 'model') return false;
        return true;
      })
      .map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

    // Adiciona a pergunta atual do usuário
    validContents.push({ 
      role: 'user', 
      parts: [{ text: userInput }] 
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: validContents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Resposta vazia da API");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini API Error Details:", error);
    
    // Mensagem amigável baseada no erro
    if (error.message?.includes("API key")) {
      return "Erro de autenticação. Por favor, verifique se a chave da API está correta.";
    }
    
    return "Tive uma pequena falha de conexão agora. Que tal falarmos pelo WhatsApp (24) 99974-9523?";
  }
};
