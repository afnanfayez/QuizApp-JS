export function createQuestionElement(id, text) {
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("fade-in", "question");
  questionDiv.setAttribute("data-question-id", id);

  const counter = document.createElement("div");
  counter.className = "question-counter";
  counter.textContent = `Q${id}`;
  questionDiv.appendChild(counter);

  const questionText = document.createElement("div");
  questionText.className = "question-text";
  questionText.innerHTML = `<span class="question-number">Question ${id}:</span> ${text}`;
  questionDiv.appendChild(questionText);

  return questionDiv;
}

export function createOptionsContainer() {
  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";
  return optionsDiv;
}