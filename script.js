
const box = document.getElementById("box");

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function randomizeBox() {
  // Rastgele konum oluşturdum
  const x = Math.random() * 300 - 150; 
  const y = Math.random() * 300 - 150; 
  const scalemR = Math.random() * 1.5 + 0.5; 
  const rotation = Math.random() * 360; 

  const newColor = getRandomColor();

  // kare yuvarlak silindir
  const shapeType = Math.random();
  if (shapeType < 0.33) {
    // Kare için
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.borderRadius = "0%";
  } else if (shapeType < 0.66) {
    // Yuvarlak için
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.borderRadius = "50%";
  } else {
    // Silindir oval için
    box.style.width = "150px";
    box.style.height = "75px";
    box.style.borderRadius = "50%";
  }


  box.style.transform = `translate(${x}px, ${y}px) scale(${scalemR}) rotate(${rotation}deg)`;
  box.style.backgroundColor = newColor;
}

function stopAnimation(intervalId) {
  clearInterval(intervalId);
  box.style.transform = "translate(0, 0) scale(1) rotate(0deg)";
  box.style.backgroundColor = "#2ecc71";
  box.style.borderRadius = "10px";
  box.style.width = "100px"; 
  box.style.height = "100px";
}


const animationInterval = setInterval(randomizeBox, 2000);

// 10 sn sonra
setTimeout(() => {
  stopAnimation(animationInterval);
}, 20000);
