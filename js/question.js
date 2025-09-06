export default class Question {
  constructor(id, text, choices, correctAnswer) {
    this._id = id;
    this._text = text;
    this._choices = choices;
    this._correctAnswer = correctAnswer;
  }

  isCorrect(answer) {
    throw new Error("isCorrect must be implemented in subclass");
  }

  render() {
    throw new Error("render must be implemented in subclass");
  }
}
