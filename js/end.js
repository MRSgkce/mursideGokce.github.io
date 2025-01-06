
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore') || 0; // default 0 if null


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

// Display the most recent score
finalScore.innerText = mostRecentScore;

// Enable the save button only if a username is entered
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

// Save high score function
saveHighScore = e => {
    console.log('clicked the save button!');
    e.preventDefault();   

    // Create a new score object
    const score = {
        score: mostRecentScore, // Use the real score here instead of random
        name: username.value
    };

    // Push the new score into the highScores array
    highScores.push(score);
   
    // Sort the high scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top MAX_HIGH_SCORES scores
    highScores.splice(MAX_HIGH_SCORES);

    // Save the updated high scores back to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect to the main page
    window.location.assign("/");
};
