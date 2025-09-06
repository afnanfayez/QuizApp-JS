import SingleChoiceQuestion from "./SingleChoiceQuestion.js";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.js";

export default class Quiz {
  constructor(storage) {
    this._storage = storage;
    this._questions = [];
    this._userAnswers = this._storage.load();
    this._passingScore = 70;
  }

  addQuestion(question) {
    this._questions.push(question);
  }

  setAnswer(questionId, answer) {
    this._userAnswers[questionId] = answer;
    this._storage.save(this._userAnswers);
  }

  resetAnswers() {
    this._userAnswers = {};
    this._storage.clear();
    this._questions.forEach(q => q.clearSelection());
  }

  _calculateScore() {
    let correctAnswers = 0;
    this._questions.forEach(q => {
      const userAnswer = this._userAnswers[q._id];
      if (q.isCorrect(userAnswer)) correctAnswers++;
    });
    const totalQuestions = this._questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = percentage >= this._passingScore;
    return { correctAnswers, totalQuestions, percentage, passed };
  }

  submit() {
    const results = this._calculateScore();
    this._storage.clear();
    return results;
  }

  loadProgress() {
    this._questions.forEach(q => {
      const savedAnswer = this._userAnswers[q._id];
      if (!savedAnswer) return;
      if (q instanceof MultipleChoiceQuestion) {
        q.setSelectedAnswers(savedAnswer);
      } else {
        q.setSelectedAnswer(savedAnswer);
      }
    });
  }
}
