import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Helper to safely get the API client
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment. Gemini features will be disabled or mocked.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeLegalText = async (text: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Erro: Chave de API não configurada. Não foi possível analisar o texto.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Você é um assistente jurídico sênior especializado em direito brasileiro. 
      Analise o seguinte texto jurídico (contrato, peça ou resumo de caso) e forneça:
      1. Um resumo executivo.
      2. Pontos de atenção ou riscos (Red Flags).
      3. Sugestões de melhoria.
      
      Texto: "${text}"`,
      config: {
        systemInstruction: "Responda de forma profissional, direta e em formato Markdown.",
        temperature: 0.3, // Low temperature for more analytical/factual output
      }
    });

    return response.text || "Não foi possível gerar uma análise.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Ocorreu um erro ao conectar com a inteligência artificial.";
  }
};

export const generateFinancialInsights = async (dataContext: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Erro: Chave de API não configurada.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Atue como um analista financeiro de um escritório de advocacia de alto padrão.
      Com base nos seguintes dados resumidos do mês, forneça um parágrafo de insight estratégico sobre o desempenho financeiro.
      Foque em lucratividade, inadimplência e metas.

      Dados: ${dataContext}`,
    });
    return response.text || "Sem insights disponíveis.";
  } catch (error) {
    return "Erro ao gerar insights financeiros.";
  }
};
