export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Mensagem não fornecida' });
  }

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCBuWvTJLdn_glwACK7weWY0lwDLBW8vbo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
              role: 'user',
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const resposta =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não entendi.';

    res.status(200).json({ response: resposta });
  } catch (error) {
    console.error('Erro ao obter resposta da IA:', error);
    res.status(500).json({ response: 'Erro ao obter resposta da IA.' });
  }
}
