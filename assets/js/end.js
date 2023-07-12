// Selecting DOM elements
var usernameInput = document.querySelector('#username');
var saveScoreBtn = document.querySelector('#saveScoreBtn');
var finalScore = document.querySelector('#finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');

//get high scors from local storage, PARSE it into an array, then assigned into highScores
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// max amount of highscores to be displayed
var maxHighScores = 6;

// Display the most in large letters recent score
finalScore.innerText = mostRecentScore;

/* Disabling the saveScoreBtn until the user types something in the username input. */
usernameInput.addEventListener('keyup', function() {
    saveScoreBtn.disabled = !usernameInput.value;
});

/* Preventing the default action of the event. */
function saveHighScore(event) {
    event.preventDefault();

    /* Creating an object with the score and name. */
    var score = {
        score: mostRecentScore,
        name: usernameInput.value
    };

    // Pushing the score object to the highScores array
    highScores.push(score);

    /* Sorting the high scores in descending order based on the score value. */
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });

    /* Removing the last element of the array if it exceeds the maximum allowed high scores. */
    highScores.splice(maxHighScores);

    // Storing the updated highScores array in local storage.
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Redirecting user back to the index.html page
    window.location.assign('index.html');
}

// Adding a click event listener to the saveScoreBtn
saveScoreBtn.addEventListener('click', saveHighScore);
