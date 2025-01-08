const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Tarayıcıdaki yerel depolamadan "highScores" anahtarıyla saklanan veriyi alır.Eğer veri varsa bir string yoksa null döner.


//hightscores içindeki js dizisi içindeki her bir elemanı alıp bir li elemanı oluşturup highScoresList'e ekliyoruz.
highScoresList.innerHTML = highScores
.map(score => {
   return `<li class= "high-score">${score.name} - ${score.score}</li>`;
}).join(""); //getting a srting with all my li

