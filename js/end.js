
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore') || 0; // default 0 if null


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

// gösterilen score
finalScore.innerText = mostRecentScore;

// bir kullanıcı adı girilmeden kaydet butonu pasif
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

// kaydet butonuna tıklanınca çalışacak fonksiyon
saveHighScore = e => {
    console.log('clicked the save button!');
    e.preventDefault();   

    // yeni bir score oluştur
    const score = {
        score: mostRecentScore, 
        name: username.value
    };

    // skoru ekle
    highScores.push(score);
   
    // Sırala
    highScores.sort((a, b) => b.score - a.score);

    // En yüksek 5 skoru al
    highScores.splice(MAX_HIGH_SCORES);

    // Yerel depolamaya kaydet
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Anasayfaya git
    window.location.assign("/");
};
