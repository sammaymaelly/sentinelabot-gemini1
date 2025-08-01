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
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCBuWvTJLdn_glwACK7weWY0lwDLBW8vbo",
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

    // ⚠️ Debug: envia estrutura inteira para entender se resposta veio vazia
    if (!result?.candidates || !result.candidates[0]) {
      return res.status(200).json({
        reply: "A IA não respondeu. Estrutura da resposta: " + JSON.stringify(result, null, 2)
      });
    }

    const reply =
      result.candidates[0].content?.parts?.[0]?.text?.trim() ||
      "Resposta não encontrada.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return res.status(500).json({ error: "Erro interno ao gerar resposta." });
  }
}
