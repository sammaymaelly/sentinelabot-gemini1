export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt ausente" });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyCBuWvTJLdn_glwACK7weWY0lwDLBW8vbo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        })
      }
    );

    const result = await response.json();

    const reply =
      result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Desculpe, a IA não respondeu corretamente.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Erro na Gemini:", error);
    return res.status(500).json({ error: "Erro interno ao gerar resposta." });
  }
}
