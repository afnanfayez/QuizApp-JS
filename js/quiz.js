import SingleChoiceQuestion from "./SingleChoiceQuestion.js";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.js";
import Storage from "./storage.js";

export default class Quiz {
  constructor(storageInstance) {
    this._storage = storageInstance ;
    this._questions = [];
    this._userAnswers = {};
    this._passingScore = 70; 
  }

  addQuestion(question) {
    this._questions.push(question);
  }

  get questions() {
    return this._questions;
  }

  get userAnswers() {
    return this._userAnswers;
  }

  get totalQuestions() {
    return this._questions.length;
  }

  get passingScore() {
    return this._passingScore;
  }

  setAnswer(questionId, answer) {
    this._userAnswers[questionId] = answer;
    this._storage.save(this._userAnswers);
  }

  resetAnswers() {
    this._userAnswers = {};
    this._storage.clear();

    this._questions.forEach((question) => {
      question.clearSelection();
    });
  }

  _calculateScore() {
    let correctAnswers = 0;
    const results = [];

    this._questions.forEach((question) => {
      const userAnswer = this._userAnswers[question.id];

      const isCorrect = question.isCorrect(userAnswer);

      if (isCorrect) {
        correctAnswers++;
      }

      results.push({
        questionId: question.id,
        questionText: question.text,
        userAnswer,
        correctAnswer:
          question instanceof MultipleChoiceQuestion
            ? question.correctAnswers
            : question.correctAnswer,
        isCorrect,
      });
    });

    const percentage =
      this._questions.length > 0
        ? Math.round((correctAnswers / this._questions.length) * 100)
        : 0;

    return {
      correctAnswers,
      totalQuestions: this._questions.length,
      percentage,
      passed: percentage >= this._passingScore,
      results,
    };
  }

  submit() {
    const scoreData = this._calculateScore();

    this._storage.clear();

    return scoreData;
  }

  loadProgress() {
    const savedAnswers = this._storage.load();
    if (savedAnswers) {
      this._userAnswers = savedAnswers;

      Object.keys(savedAnswers).forEach((questionId) => {
        const question = this._questions.find((q) => q.id == questionId);
        const answer = savedAnswers[questionId];

        if (question && answer != null) {
          if (question instanceof SingleChoiceQuestion) {
            question.setSelectedAnswer(answer);
          } else if (
            question instanceof MultipleChoiceQuestion &&
            Array.isArray(answer)
          ) {
            question.setSelectedAnswers(answer);
          }
        }
      });

      return true;
    }

    return false;
  }
}