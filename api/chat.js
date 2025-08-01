document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const inputField = document.getElementById('userInput');
  const message = inputField.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  inputField.value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message })
    });

    const data = await response.json();
    if (response.ok && data.text) {
      appendMessage(data.text, 'bot');
    } else {
      appendMessage('Desculpe, a IA não respondeu corretamente.', 'bot');
    }
  } catch (error) {
    console.error(error);
    appendMessage('Erro ao conectar com a IA.', 'bot');
  }
}

function appendMessage(text, sender) {
  const chatWindow = document.getElementById('chat-window');
  const messageElem = document.createElement('div');
  messageElem.className = `message ${sender}`;
  messageElem.textContent = text;
  chatWindow.appendChild(messageElem);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
