// Selecting DOM elements

var highScoresList = document.querySelector('#highScoresList')
var highScores = JSON.parse(localStorage.getItem('highScores')) || []
var clearScoresButton = document.querySelector('#clear-scores-button');

clearScoresButton.addEventListener('click', function() {
    localStorage.removeItem('highScores');
    location.reload();
});
// Generating HTML for each high score and populating the highScoresList element
highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')

