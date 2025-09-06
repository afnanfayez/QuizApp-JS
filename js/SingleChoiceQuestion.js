import Question from "./question.js";

export default class SingleChoiceQuestion extends Question {
  constructor(id, text, choices, correctAnswer) {
    super(id, text, choices, correctAnswer);
  }

  isCorrect(answer) {
    return this._correctAnswer.includes(answer);
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
      input.type = "radio";
      input.name = `question-${this._id}`;
      input.value = choice;

      input.addEventListener("change", () => {
        const event = new CustomEvent("answerSelected", {
          detail: { questionId: this._id, answer: choice, questionType: "single" }
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
    const inputs = document.querySelectorAll(`input[name="question-${this._id}"]`);
    inputs.forEach(input => input.checked = false);
  }

  setSelectedAnswer(answer) {
    const inputs = document.querySelectorAll(`input[name="question-${this._id}"]`);
    inputs.forEach(input => input.checked = input.value === answer);
  }
}
