export default class Question {
  constructor(id, text, options, correctAnswer) {
    this._id = id;
    this._text = text;
    this._options = options;
    this._correctAnswer = correctAnswer;
  }

  get id() {
    return this._id;
  }

  get text() {
    return this._text;
  }

  get options() {
    return this._options;
  }

  get correctAnswer() {
    return this._correctAnswer;
  }

  isCorrect(userAnswer) {
    throw new Error("isCorrect() must be implemented in subclass");
  }

  render() {
    throw new Error("render() must be implemented in subclass");
  }
}
