const OPENAI_API_KEY = "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";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Mensagem inválida" });
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Você é o SentinelaBot, um assistente que responde perguntas com clareza e simpatia.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(200).json({ response: "Desculpe, a IA não respondeu corretamente." });
    }

    return res.status(200).json({ response: reply });
  } catch (error) {
    console.error("Erro ao obter resposta da IA:", error);
    return res.status(500).json({ response: "Erro interno ao processar a resposta da IA." });
  }
}
