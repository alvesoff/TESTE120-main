const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  tryAgainBtn = document.querySelector(".content button"),
  wordsTypedTag = document.querySelector(".words span b"),
  translationText = document.getElementById("translation-text");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = 0,
  wordsTyped = 0,
  isTyping = false;

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);

  // Carregar texto para digitar
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });

  // Exibir tradução correspondente
  translationText.innerText = translations[ranIndex];

  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  
  if (charIndex < characters.length) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex]?.classList.add("active");

    // Contar palavras digitadas
    let typedWords = inpField.value.trim().split(/\s+/).length;
    wordsTypedTag.innerText = typedWords;
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timer);
  }
}

function nextParagraph() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = 0;
  isTyping = false;
  inpField.value = "";
}

function resetGame() {
  nextParagraph(); // Chama a função que carrega a próxima frase
  // Não reseta o contador de palavras digitadas
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
