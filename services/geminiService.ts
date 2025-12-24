
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
    // Busca a chave de forma robusta
    const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
    
    if (!apiKey) {
      console.error("ERRO: API_KEY não configurada. Verifique as variáveis de ambiente no Netlify.");
      return "Estou em modo de manutenção técnica. Por favor, fale diretamente com nossos especialistas pelo WhatsApp: (24) 99974-9523.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    /**
     * REGRAS DE OURO DA API GEMINI:
     * 1. O histórico (contents) deve ser um array de objetos { role, parts }.
     * 2. O primeiro item DEVE ser 'user'.
     * 3. Os papéis DEVEM alternar: user -> model -> user -> model.
     */
    
    // Filtramos o histórico para garantir a alternância e o início correto
    const validContents = [];
    
    // Se houver histórico, processamos
    history.forEach((msg) => {
      // Ignora a primeira mensagem se ela for do modelo (saudação inicial estática)
      // Isso garante que a primeira mensagem no 'contents' seja do usuário
      if (validContents.length === 0 && msg.role === 'model') return;
      
      validContents.push({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      });
    });

    // Adiciona a mensagem atual do usuário (sempre por último)
    validContents.push({
      role: 'user',
      parts: [{ text: userInput }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: validContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        topK: 40
      }
    });

    const text = response.text;
    if (!text) throw new Error("A API retornou uma resposta vazia.");
    
    return text;

  } catch (error: any) {
    console.group("Erro na Conexão com o Chatbot");
    console.error("Mensagem:", error.message);
    console.error("Detalhes:", error);
    console.groupEnd();

    if (error.message?.includes("403") || error.message?.includes("API key")) {
      return "Minha chave de acesso expirou ou é inválida. Por favor, avise o administrador ou use o WhatsApp (24) 99974-9523.";
    }

    return "Tive um pequeno tropeço na conexão. Pode repetir ou prefere falar pelo WhatsApp (24) 99974-9523?";
  }
};
