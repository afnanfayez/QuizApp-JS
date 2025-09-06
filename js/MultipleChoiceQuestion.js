import Question from "./question.js";

export default class MultipleChoiceQuestion extends Question {
  constructor(id, text, choices, correctAnswer) {
    super(id, text, choices, correctAnswer);
  }

  isCorrect(answers) {
    if (!Array.isArray(answers)) return false;
    return answers.length === this._correctAnswer.length &&
           answers.every(ans => this._correctAnswer.includes(ans));
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("question-card");

    const questionText = document.createElement("p");
    questionText.textContent = this._text;
    questionText.classList.add("question-text");
    container.appendChild(questionText);

    this._choices.forEach(choice => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = choice;
      input.dataset.qid = this._id;

      input.addEventListener("change", () => {
        const checkedInputs = Array.from(container.querySelectorAll("input:checked")).map(i => i.value);
        const event = new CustomEvent("answerSelected", {
          detail: { questionId: this._id, answers: checkedInputs, questionType: "multiple" }
        });
        document.dispatchEvent(event);
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      container.appendChild(label);
    });

    return container;
  }

  clearSelection() {
    const inputs = document.querySelectorAll(`input[type="checkbox"][data-qid="${this._id}"]`);
    inputs.forEach(input => input.checked = false);
  }

  setSelectedAnswers(answers) {
    const inputs = document.querySelectorAll(`input[type="checkbox"][data-qid="${this._id}"]`);
    inputs.forEach(input => input.checked = answers.includes(input.value));
  }
}
