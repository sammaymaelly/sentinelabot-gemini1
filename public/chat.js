console.log("Chat iniciado!");

const loadingDiv = document.getElementById("loading");
const outputDiv = document.getElementById("output");
const input = document.getElementById("userInput");

// Mostra mensagem inicial depois de 1s
if (loadingDiv) {
  setTimeout(() => {
    loadingDiv.innerHTML = "SentinelaBot pronto! Como posso te ajudar?";
  }, 1000);
} else {
  console.error("Elemento com id 'loading' não encontrado.");
}

// ✅ Define a função no escopo global (necessário para funcionar com onclick no HTML)
function sendMessage() {
  const pergunta = input.value.trim();
  if (!pergunta) return;

  outputDiv.innerHTML = `<strong>Você:</strong> ${pergunta}<br><em>SentinelaBot:</em> pensando...`;

  setTimeout(() => {
    outputDiv.innerHTML = `<strong>Você:</strong> ${pergunta}<br><em>SentinelaBot:</em> Esta é uma resposta simulada para: "${pergunta}"`;
    input.value = "";
  }, 1500);
}
