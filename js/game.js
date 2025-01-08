const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

const loader = document.getElementById('loader')
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswes = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = []; 


fetch(
    
    "https://opentdb.com/api.php?amount=20&category=11&difficulty=easy&type=multiple"
    )
.then(res =>{
    return res.json();
})//res.json() API'den dönen yanıtı JSON formatına dönüştürür. Bu, asenkron bir işlem olduğu için .then() içinde yapılır.
  .then(loadedQuestions => {
      console.log(loadedQuestions.results);

      questions = loadedQuestions.results.map(loadedQuestion => {
          const formattedQuestion = {
             question: loadedQuestion.question
          };

          //map() fonksiyonu ile her bir soruyu alıp,
          // formatlamak için yeni bir dizi oluşturuluyor. formattedQuestion adlı nesne, her bir soruyu biçimlendiriyor.

          const answerChoices = [...loadedQuestion.incorrect_answers]; //yanlış sorular tutulur

          formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
          answerChoices.slice(
              formattedQuestion.answer - 1,
              0,
              loadedQuestion.correct_answer//doğru cevabı rastgele yerleştirmek için
          );

          answerChoices.forEach((choice, index) =>{
              formattedQuestion["choice" + (index +1)] = choice;
          });
          return formattedQuestion;
      });


      startGame();
  })
    .catch(err => {
         console.log(err);
    });

    

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //copy all the qst from questions array to the availableQuestions one
    
    getNewQuestions();

    //remove the loading and turn the game:
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestions = () =>{
     
    if(availableQuestions.length ===0 || questionCounter >= MAX_QUESTIONS){

        //save the user score:
        localStorage.setItem("mostRecentScore", score);
        //go to ebd of the page:
        return window.location.assign('end.html'); //sorulacak soru kalmadıysa
    }

    questionCounter++;
    progressText.innerText = ` Question ${questionCounter}/${MAX_QUESTIONS}`;
 


   progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; 

     const questionIndex = Math.floor(Math.random() * availableQuestions.length);//rastgele soru 
     currentQuestion = availableQuestions[questionIndex];
     question.innerText = currentQuestion.question;

     choices.forEach(choice =>{
          const number = choice.dataset['number']; //şıkların sayısı 
          choice.innerText = currentQuestion['choice' + number]; // şıkların içeriği

     });

     availableQuestions.splice(questionIndex, 1); //soruyu çıkartır

     acceptingAnswes= true;
};


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswes) return;//sorulara tıklanabilirlik salıyor

        acceptingAnswes = false;
        const selectedChoice = e.target;//seçilen dom elemanını
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        // Doğru cevaba 'correct' sınıfı ekle
        const correctChoice = choices.find(
            choice => choice.dataset['number'] == currentQuestion.answer
        );
        if (correctChoice) {
            correctChoice.parentElement.classList.add('correct');
        }

        // Yanlış cevabı kontrol et ve puan artır
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            // Sınıfları kaldır
            selectedChoice.parentElement.classList.remove(classToApply);
            if (correctChoice) {
                correctChoice.parentElement.classList.remove('correct');
            }
            getNewQuestions();
        }, 2000);
    });
});


incrementScore = num => {
    score +=num;
    scoreText.innerText = score;  
}


