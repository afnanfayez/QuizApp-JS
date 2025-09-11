import Storage from "./storage.js";
import SingleChoiceQuestion from "./SingleChoiceQuestion.js";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.js";
import Quiz from './quiz.js';

const questionsContainer = document.getElementById("questions-container");
const resetBtn = document.getElementById("reset-btn");
const submitBtn = document.getElementById("submit-btn");
const resultsContainer = document.getElementById("results-container");
const scoreText = document.getElementById("score-text");
const passFailText = document.getElementById("pass-fail-text");
const newQuizBtn = document.getElementById("new-quiz-btn");

const storage = new Storage("quizApp");
const quiz = new Quiz(storage);

function initializeApp() {
  setupQuestions();
  renderQuestions();
  setupEventListeners();
  quiz.loadProgress();
}

function setupQuestions() {
  const questions = [
    new SingleChoiceQuestion(1, "What is the capital city of Italy?", ["Rome", "Paris", "Berlin", "Madrid"], "Rome"),
    new MultipleChoiceQuestion(2, "Which of the following are programming languages?", ["Python", "HTML", "Java", "CSS", "C++"], ["Python","Java","C++"]),
    new SingleChoiceQuestion(3, "Which planet is closest to the Sun?", ["Venus","Mercury","Earth","Mars","Jupiter"], "Mercury"),
    new MultipleChoiceQuestion(4, "Which animals can fly?", ["Bat","Penguin","Eagle","Ostrich"], ["Bat","Eagle"]),
    new SingleChoiceQuestion(5, "Who painted the Mona Lisa?", ["Leonardo da Vinci","Michelangelo","Raphael","Van Gogh"], "Leonardo da Vinci"),
    new MultipleChoiceQuestion(6, "Select the primary colors:", ["Red","Green","Blue","Yellow"], ["Red","Blue","Yellow"]),
    new SingleChoiceQuestion(7, "What is the freezing point of water?", ["0°C","100°C","-10°C","50°C"], "0°C"),
    new MultipleChoiceQuestion(8, "Which of the following are planets in our solar system?", ["Earth","Pluto","Mars","Sun","Venus","Moon"], ["Earth","Mars","Venus"]),
    new SingleChoiceQuestion(9, "Which language runs in the browser?", ["Python","JavaScript","C++","Java"], "JavaScript"),
    new MultipleChoiceQuestion(10, "Select the numbers that are even:", ["1","2","3","4","5"], ["2","4"])
  ];

  questions.forEach((question) => quiz.addQuestion(question));
}

function renderQuestions() {
  // clear before render
  questionsContainer.innerHTML = "";
  quiz.questions.forEach((question) => {
    const questionElement = question.render();
    questionsContainer.appendChild(questionElement);
  });
}

function setupEventListeners() {
  document.addEventListener("answerSelected", handleAnswerSelection);

  resetBtn.addEventListener("click", handleReset);

  submitBtn.addEventListener("click", handleSubmit);

  if (newQuizBtn) {
    newQuizBtn.addEventListener("click", handleNewQuiz);
  }
}

function handleAnswerSelection(event) {
  const { questionId, answer, answers, questionType } = event.detail;

  if (questionType === "single") {
    quiz.setAnswer(questionId, answer);
  } else if (questionType === "multiple") {
    quiz.setAnswer(questionId, answers);
  }
}

function handleReset() {
  quiz.resetAnswers();
}

function handleSubmit() {
  const results = quiz.submit();
  displayResults(results);
}

function handleNewQuiz() {
  storage.clear();
  quiz.resetAnswers();

  resultsContainer.classList.add("hidden");
  questionsContainer.classList.remove("hidden");

  renderQuestions();
}

function displayResults(results) {
  const { correctAnswers, totalQuestions, percentage, passed } = results;

  scoreText.textContent = `You scored ${correctAnswers} out of ${totalQuestions} (${percentage}%)`;

  passFailText.textContent = passed
    ? "Congrats! You Passed!"
    : "Sorry, you did not pass.";
  passFailText.className = `pass-fail-text ${passed ? "passed" : "failed"}`;

  questionsContainer.classList.add("hidden");
  resultsContainer.classList.remove("hidden");
  resultsContainer.classList.add("fade-in");
}

document.addEventListener("DOMContentLoaded", initializeApp);
