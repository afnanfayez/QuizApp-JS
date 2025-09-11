import { createQuestionElement, createOptionsContainer } from "./create.js";
import Question from './question.js';

export default class SingleChoiceQuestion extends Question {
  constructor(id, text, options, correctAnswer) {
    super(id, text, options, correctAnswer);
  }

  isCorrect(userAnswer) {
    return userAnswer === this._correctAnswer;
  }

  render() {
    const questionElement = createQuestionElement(this._id, this._text);
    const optionsContainer = createOptionsContainer();

    this._options.forEach((option, index) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question_${this._id}`;
      input.value = option;
      input.id = `q${this._id}_option${index}`;

      const label = document.createElement("label");
      label.htmlFor = `q${this._id}_option${index}`;
      label.textContent = option;

      input.addEventListener("change", () => {
        const allOptions = questionElement.querySelectorAll(".option");
        allOptions.forEach((opt) => opt.classList.remove("selected"));

        optionDiv.classList.add("selected");

        const event = new CustomEvent("answerSelected", {
          detail: {
            questionId: this._id,
            answer: option,
            questionType: "single",
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

  setSelectedAnswer(answer) {
    const input = document.querySelector(
      `input[name="question_${this._id}"][value="${answer}"]`
    );
    if (input) {
      input.checked = true;
      input.dispatchEvent(new Event("change"));
    }
  }
}
