// Selecting DOM elements
var quizQuestionElement = document.querySelector('#question');
var answerChoiceElements = Array.from(document.querySelectorAll('.choice-text'));
var progressIndicatorElement = document.querySelector('#progressText');
var playerScoreElement = document.querySelector('#score');
var progressBarElement = document.querySelector('#progressBarFull');
var countdownTimerElement = document.querySelector('#timer');

// Game configuration variables
var totalQuizTime = 60;
var incorrectAnswerPenalty = 10;

// Game state variables
var activeQuestion = {};
var answerSubmissionOpen = true;
var playerScore = 0;
var questionIndex = 0;
var unansweredQuestions = [];
var remainingTime = totalQuizTime;

// Array of question objects 
var quizQuestions = [
    {
        // Question 1
        question: 'Which HTML tag is used to create a hyperlink?',
        choices: ['<a>', '<link>', '<h1>', '<p>'],
        answer: 0,
    },
    {// Question 2
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

var pointsPerCorrectAnswer = 100;
var maximumNumberOfQuestions = quizQuestions.length;


//  Starts the countdown timer and ends the game when time runs out.
function initiateCountdown() {
    displayRemainingTime();
    var countdownInterval = setInterval(function () {
        remainingTime--;
        displayRemainingTime();

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            endQuiz();
        }
    }, 1000);
}

//  Updates the timer display with the remaining time.

function displayRemainingTime() {
    countdownTimerElement.innerText = remainingTime;
}


//  This function reduces the remaining time by the specified penalty and updates the timer display.
//  10 seconds is subtracted from the time
 
function applyTimePenalty(penalty) {
    remainingTime = Math.max(0, remainingTime - penalty);
    displayRemainingTime();
}


//This function ncreases the player score by the specified amount and updates the score display.
//100points will be added to player score per correct selection.

function updatePlayerScore(points) {
    playerScore += points;
    playerScoreElement.innerText = playerScore;
}

// Processes the player's answer selection.

function submitAnswer(event) {
    if (!answerSubmissionOpen) return;

    answerSubmissionOpen = false;
    var selectedChoiceElement = event.target;
    var selectedAnswerIndex = answerChoiceElements.indexOf(selectedChoiceElement);
    var isCorrectAnswer = selectedAnswerIndex === activeQuestion.answer;
// If the answer is correct, the selected choice element is removed from the list of unanswered questions.  
    if (isCorrectAnswer) {
        updatePlayerScore(pointsPerCorrectAnswer);
    } else {
        applyTimePenalty(incorrectAnswerPenalty);
    }

// If the answer is correct, the selected choice element is added to the list of unanswered questions.
    selectedChoiceElement.classList.add(isCorrectAnswer ? 'correct' : 'incorrect');
// The selected choice element is removed from the list of unanswered questions.
    setTimeout(function () {
        selectedChoiceElement.classList.remove('correct', 'incorrect');
        serveNextQuestion();
    }, 1000);
}

// This function serves the next question.
function serveNextQuestion() {
    if (unansweredQuestions.length === 0 || questionIndex >= maximumNumberOfQuestions) {
        endQuiz();
        return;
    }
// Update the progress indicator
    questionIndex++;
    progressIndicatorElement.innerText = `Question ${questionIndex} of ${maximumNumberOfQuestions}`;
    progressBarElement.style.width = `${(questionIndex / maximumNumberOfQuestions) * 100}%`;
// Set the active question
    var randomQuestionIndex = Math.floor(Math.random() * unansweredQuestions.length);
    activeQuestion = unansweredQuestions[randomQuestionIndex];
    quizQuestionElement.innerText = activeQuestion.question;
// Set the answer choices
    answerChoiceElements.forEach(function (choice, index) {
        choice.innerText = activeQuestion.choices[index];
    });
// Reset the answer submission
    unansweredQuestions.splice(randomQuestionIndex, 1);
    answerSubmissionOpen = true;
}

// This function resets the game.
function endQuiz() {
    localStorage.setItem('mostRecentScore', playerScore);
    window.location.assign('end.html');
}

// This function starts the game
function startQuiz() {
    questionIndex = 0;
    playerScore = 0;
    unansweredQuestions = [...quizQuestions];
    serveNextQuestion();
    initiateCountdown();
}

// Selecting DOM elements
answerChoiceElements.forEach(function (choice) {
    choice.addEventListener('click', submitAnswer);
});

// Start the game
startQuiz();
