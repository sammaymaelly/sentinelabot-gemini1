export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt ausente" });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCBuWvTJLdn_glwACK7weWY0lwDLBW8vbo`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const result = await geminiRes.json();

    const reply =
      result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      result?.candidates?.[0]?.content?.text?.trim() ||
      "Desculpe, a IA não respondeu.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Erro ao consultar a API Gemini:", error);
    return res.status(500).json({ error: "Erro interno ao gerar resposta." });
  }
}
