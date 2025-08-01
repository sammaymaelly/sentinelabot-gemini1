console.log("Chat iniciado!");

const loadingDiv = document.getElementById("loading");

if (loadingDiv) {
  // Simula resposta após 2 segundos
  setTimeout(() => {
    loadingDiv.innerHTML = "SentinelaBot pronto! Como posso te ajudar?";
    loadingDiv.style.fontWeight = "bold";
    loadingDiv.style.color = "#333";
  }, 2000);
} else {
  console.error("Elemento com id 'loading' não encontrado.");
}
