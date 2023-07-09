// Selecting DOM elements
var questionElement = document.querySelector('#question');
var choiceElements = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
var timerText = document.querySelector('#timer');

// Game configuration variables
var GAME_TIME = 60;
var PENALTY = 10;

// Game state variables
var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var timeRemaining = GAME_TIME;

// Array of question objects
var questions = [
    {
        question: 'Which HTML tag is used to create a hyperlink?',
        choices: ['<a>', '<link>', '<h1>', '<p>'],
        answer: 0,
    },
    {
        question: 'Which CSS property is used to specify the font of an element?',
        choices: ['font-size', 'font-family', 'font-style', 'font-color'],
        answer: 1,
    },
    {
        question: 'Which data type is used to store whole numbers in Java?',
        choices: ['int', 'float', 'boolean','String'],
        correct: 0,
    },
    {
        question: 'How do you insert comments in Java code?',
        choices: ['/* This is a comment */', '# This is a comment', '// This is a comment', '(COMMENT HERE)'],
        answer: 2,
      },
      {
        question: 'Array indexes start with:',
        choices: ['1', '2', '-1', '0'],
        answer: 3,
      },
      {
        question: 'What does CSS stand for?',
        choices: ['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
        answer: 0,
      },
      {
        question: 'Which programming language is known as the "mother of all languages"?',
        choices: ['C', 'Java', 'Assembly', 'Fortran'],
        answer: 2,
      },
      {
        question: 'What is the output of the following code snippet? console.log(2 + "2");',
        choices: ['4', '22', 'NaN', 'Error'],
        answer: 1,
      },
      {
        question: 'What is the purpose of the "this" keyword in JavaScript?',
        choices: ['To refer to the current object', 'To create a new object', 'To import external code', 'To execute a function'],
        answer: 0,
      },
      {
        question: 'Which method is used to remove the last element from an array in JavaScript?',
        choices: ['pop()', 'shift()', 'splice()', 'slice()'],
        answer: 0,
      },
      {
        question: 'Which operator is used to concatenate two strings in JavaScript?',
        choices: ['+', '-', '*', '&'],
        answer: 0,
      }
    
];

var SCORE_POINTS = 100;
var MAX_QUESTIONS = questions.length;

/**
 * Initializes the quiz game.
 */
function initGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    startTimer();
}

/**
 * Displays a new question and its choices.
 */
function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        endGame();
        return;
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;

    choiceElements.forEach(function (choice, index) {
        choice.innerText = currentQuestion.choices[index];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

/**
 * Handles user's answer selection.
 * @param {Event} event The click event object
 */
function handleAnswerSelection(event) {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = event.target;
    var selectedAnswer = choiceElements.indexOf(selectedChoice);
    var isCorrect = selectedAnswer === currentQuestion.answer;

    if (isCorrect) {
        incrementScore(SCORE_POINTS);
    } else {
        decrementTime(PENALTY);
    }

    selectedChoice.classList.add(isCorrect ? 'correct' : 'incorrect');

    setTimeout(function () {
        selectedChoice.classList.remove('correct', 'incorrect');
        getNewQuestion();
    }, 1000);
}

/**
 * Increments the score by the specified amount and updates the score display.
 * @param {number} points The points to increment the score by
 */
function incrementScore(points) {
    score += points;
    scoreText.innerText = score;
}

/**
 * Decrements the remaining time by the specified amount and updates the timer display.
 * @param {number} penalty The penalty to subtract from the time
 */
function decrementTime(penalty) {
    timeRemaining = Math.max(0, timeRemaining - penalty);
    renderTime();
}

/**
 * Renders the remaining time on the timer display.
 */
function renderTime() {
    timerText.innerText = timeRemaining;
}

/**
 * Starts the timer countdown and ends the game when time runs out.
 */
function startTimer() {
    renderTime();
    var timerInterval = setInterval(function () {
        timeRemaining--;
        renderTime();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

/**
 * Ends the game and redirects to the end game page.
 */
function endGame() {
    localStorage.setItem('mostRecentScore', score);
    window.location.assign('end.html');
}

// Add event listeners to choice elements
choiceElements.forEach(function (choice) {
    choice.addEventListener('click', handleAnswerSelection);
});

// Initialize the game
initGame();
