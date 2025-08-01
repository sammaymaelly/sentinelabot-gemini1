console.log("Chat iniciado!");

const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  addMessage("Pensando...", "bot");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });

    const data = await res.json();
    const resposta = data.reply || "Desculpe, não entendi.";

    // remove o "Pensando..." anterior
    const pensou = chatWindow.querySelector(".bot:last-child");
    if (pensou?.innerText === "Pensando...") {
      pensou.remove();
    }

    addMessage(resposta, "bot");
  } catch (error) {
    console.error(error);
    addMessage("Erro ao obter resposta da IA.", "bot");
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

addMessage("SentinelaBot pronto! Como posso te ajudar?", "bot");
