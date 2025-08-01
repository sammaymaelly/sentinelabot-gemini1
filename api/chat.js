// /api/chat.js (versão definitiva com contexto e suporte Gemini-Pro v1)

const API_KEY = "AIzaSyCBuWvTJLdn_glwACK7weWY0lwDLBW8vbo";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Mensagem inválida" });
  }

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.6,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
          stopSequences: [],
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: 4,
          },
        ],
      }),
    });

    const data = await response.json();

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!reply) {
      return res.status(200).json({ response: "Desculpe, a IA não respondeu corretamente." });
    }

    return res.status(200).json({ response: reply });
  } catch (error) {
    console.error("Erro ao obter resposta da IA:", error);
    return res.status(500).json({ response: "Erro interno ao processar a resposta da IA." });
  }
}
