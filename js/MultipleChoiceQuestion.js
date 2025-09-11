import { createQuestionElement, createOptionsContainer } from "./create.js";
import Question from './question.js';

export default class MultipleChoiceQuestion extends Question {
  constructor(id, text, options, correctAnswers) {
    super(id, text, options, correctAnswers);
    this._correctAnswers = Array.isArray(correctAnswers)
      ? correctAnswers
      : [correctAnswers];
  }

  get correctAnswers() {
    return this._correctAnswers;
  }

  isCorrect(userAnswers) {
    return (
      userAnswers.length === this._correctAnswers.length &&
      userAnswers.every((answer) => this._correctAnswers.includes(answer))
    );
  }

  render() {
    const questionElement = createQuestionElement(this._id, this._text);
    const optionsContainer = createOptionsContainer();

    this._options.forEach((option, index) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "option";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = `question_${this._id}`;
      input.value = option;
      input.id = `q${this._id}_option${index}`;

      const label = document.createElement("label");
      label.htmlFor = `q${this._id}_option${index}`;
      label.textContent = option;

      input.addEventListener("change", () => {
        if (input.checked) {
          optionDiv.classList.add("selected");
        } else {
          optionDiv.classList.remove("selected");
        }

        const selectedAnswers = this.getSelectedAnswers();

        const event = new CustomEvent("answerSelected", {
          detail: {
            questionId: this._id,
            answers: selectedAnswers,
            questionType: "multiple",
          },
        });
        document.dispatchEvent(event);
      });

      optionDiv.appendChild(input);
      optionDiv.appendChild(label);
      optionsContainer.appendChild(optionDiv);
    });

    questionElement.appendChild(optionsContainer);
    return questionElement;
  }

  getSelectedAnswers() {
    const selectedInputs = document.querySelectorAll(
      `input[name="question_${this._id}"]:checked`
    );
    return Array.from(selectedInputs).map((input) => input.value);
  }

  clearSelection() {
    const inputs = document.querySelectorAll(
      `input[name="question_${this._id}"]`
    );
    inputs.forEach((input) => {
      input.checked = false;
    });

    const questionElement = document.querySelector(
      `[data-question-id="${this._id}"]`
    );
    if (questionElement) {
      const options = questionElement.querySelectorAll(".option");
      options.forEach((option) => option.classList.remove("selected"));
    }
  }

  setSelectedAnswers(answers) {
    if (!Array.isArray(answers)) {
      return;
    }

    answers.forEach((answer) => {
      const input = document.querySelector(
        `input[name="question_${this._id}"][value="${answer}"]`
      );
      if (input) {
        input.checked = true;
        input.dispatchEvent(new Event("change"));
      }
    });
  }
}
