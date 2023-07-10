// Selecting DOM elements
var username = document.querySelector('#username');
var saveScoreBtn = document.querySelector('#saveScoreBtn');
var finalScore = document.querySelector('#finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var MAX_HIGH_SCORES = 6;

finalScore.innerText = mostRecentScore;

/* Disabling the saveScoreBtn until the user types something in the username input. */
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

/* Preventing the default action of the event. */
saveHighScore = e => {
    e.preventDefault();

    /* Creating an object with the score and name. */
    var score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);

    /* Sorting the high scores in descending order. */
    highScores.sort((a, b) => {
        return b.score - a.score;
    });

    /* Removing the last element of the array if it exceeds the maximum allowed high scores. */
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
};
