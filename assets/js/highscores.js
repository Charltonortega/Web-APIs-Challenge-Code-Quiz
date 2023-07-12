// Selecting DOM elements
var highScoresList = document.querySelector('#highScoresList');
var clearScoresButton = document.querySelector('#clear-scores-button');

// adds eventlistener, removees high scores from local storage then reloads the page to update.
clearScoresButton.addEventListener('click', function() {
    localStorage.removeItem('highScores');
    location.reload();
});

// Populate the highScoresList element with high scores
function populateHighScores() {
    // retrieves the highcore from local storage and generates a list for each user score./ 
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    var highScoreHTML = '';
    //create loop to populate the list
    for (var i = 0; i < highScores.length; i++) {
        var score = highScores[i];

        //adds the score to the list
        highScoreHTML += `<li class="high-score">${score.name} - ${score.score}</li>`;
    }
    //assigns the values to the list
    highScoresList.innerHTML = highScoreHTML;
}
// calls function to populate high scores in quiz
populateHighScores();
