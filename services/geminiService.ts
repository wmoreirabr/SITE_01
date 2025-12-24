
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
    // A chave DEVE vir de process.env.API_KEY conforme as regras.
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      console.error("ERRO CRÍTICO: API_KEY não encontrada em process.env.API_KEY");
      return "O sistema de chat está sem chave de acesso configurada. Por favor, verifique se a API_KEY foi adicionada corretamente no painel do Netlify.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    /**
     * REGRAS DE CONTEÚDO (Gemini API):
     * 1. O histórico deve ser um array de objetos { role, parts: [{ text }] }.
     * 2. O primeiro item DEVE ser do papel 'user'.
     * 3. Os papéis DEVEM alternar: user -> model -> user -> model...
     */
    
    // Removemos a saudação inicial do bot do histórico enviado para a API,
    // pois a API exige que o primeiro turno seja obrigatoriamente do usuário.
    const validHistory = history.filter((msg, index) => {
      if (index === 0 && msg.role === 'model') return false;
      return true;
    });

    // Mapeamos para o formato exigido pela SDK
    const contents = validHistory.map(msg => ({
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
        topK: 40,
        // Mantemos thinkingBudget em 0 para respostas de chat rápidas e econômicas
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    if (!response.text) {
      return "Entendi sua dúvida, mas tive um problema ao gerar a resposta. Pode tentar perguntar de outra forma ou nos chamar no WhatsApp (24) 99974-9523?";
    }
    
    return response.text;

  } catch (error: any) {
    console.error("Erro na comunicação com Gemini:", error);
    
    // Tratamento amigável de erros comuns
    if (error.message?.includes("429")) {
      return "Muitas pessoas estão consultando agora! Aguarde um instante ou fale com um humano no WhatsApp: (24) 99974-9523";
    }
    
    if (error.message?.includes("API key") || error.message?.includes("403") || error.message?.includes("401")) {
      return "Minha chave de inteligência parece inválida ou expirou. Por favor, use o WhatsApp para atendimento imediato: (24) 99974-9523.";
    }

    // Retorna o erro detalhado para ajudar na correção
    return `Tive uma dificuldade técnica (${error.message || 'Erro de Rede'}). Para não atrasar seu projeto, fale conosco no WhatsApp: (24) 99974-9523.`;
  }
};
