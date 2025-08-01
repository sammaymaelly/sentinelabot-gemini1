// /api/chat.js - Backend (Vercel Functions)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Mensagem inválida.' });
  }

  try {
    const apiKey = "AIzaSyCBuWvTJLdn_glwACK7weWY0lwDLBW8vbo";

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      const text = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ text });
    } else {
      return res.status(500).json({ error: 'A IA não respondeu corretamente.' });
    }
  } catch (error) {
    console.error("Erro ao chamar API Gemini:", error);
    return res.status(500).json({ error: 'Erro interno ao chamar a IA.' });
  }
}
