document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

function output(input) {
  let resposta;
  let text = input.toLowerCase().trim();

  if (comparar(perguntas, respostas, text)) { 
    resposta = comparar(perguntas, respostas, text);
  } else {
    resposta = alternativas[Math.floor(Math.random() * alternativas.length)];
  }
  addChat(input, resposta);
}

function comparar(perguntasArray, respostasArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < perguntasArray.length; x++) {
    for (let y = 0; y < perguntasArray[x].length; y++) {
      if (perguntasArray[x][y] === string) {
        let respostas = respostasArray[x];
        reply = respostas[Math.floor(Math.random() * respostas.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}

function addChat(input, resposta) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Analisando...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  setTimeout(() => {
    botText.innerText = `${resposta}`;
  }, 2000)
}