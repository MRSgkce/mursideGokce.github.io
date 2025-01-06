const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false; // Fixed the typo from 'acceptingAnswes'
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = []; // To hold the questions from the API

// Fetch questions from the Open Trivia Database API
fetch("https://opentdb.com/api.php?amount=3&category=18&difficulty=easy&type=multiple")

    .then(res => res.json())
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);

        // Process the API questions
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            // Create an array of answer choices and randomly insert the correct answer
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1; // Correct answer will be between 1 and 4
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer); // Insert correct answer at a random position

            // Assign choices to the formatted question object
            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        // Start the game after processing the questions
        startGame();
    })
    .catch(err => {
        console.log(err);
    });

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // Copy all the questions to availableQuestions array
    
    getNewQuestions();

    // Remove the loading screen and show the game
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // Save the user's score to localStorage
        localStorage.setItem("mostRecentScore", score);
        // Redirect to the end page
        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = ` Question ${questionCounter}/${MAX_QUESTIONS}`;

    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // Get a random question
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // Display the choices
    choices.forEach(choice => {
        const number = choice.dataset['number']; // Get the data-number from HTML
        choice.innerText = currentQuestion['choice' + number]; // Set the choice text
    });

    // Remove the question from available questions
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

// Handle the user's choice
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // Determine if the answer is correct or incorrect
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        // Increment score if the answer is correct
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        // Apply the correct/incorrect class to the choice
        selectedChoice.parentElement.classList.add(classToApply);

        // Move to the next question after a short delay
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000);
    });
});

// Function to increment the score
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
