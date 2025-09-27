/* === Timer Logic === */
let workTime = 25*60, shortBreak = 5*60, longBreak = 15*60, cycles=0;
let time = workTime, timerInterval, isRunning=false, mode="work";

function updateDisplay() {
  let minutes = Math.floor(time/60);
  let seconds = time%60;
  document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2,'0')}`;
  document.getElementById("mode").textContent =
    mode==="work"?"Work Session":mode==="short"?"Short Break":"Long Break";
}

function switchMode(){
  if(mode==="work"){ 
    cycles++; 
    mode=cycles%4===0?"long":"short"; 
    time=mode==="long"?longBreak:shortBreak; 
  } else { 
    mode="work"; 
    time=workTime; 
  }
  updateDisplay();
}

function startTimer(){
  if(!isRunning){ 
    isRunning=true; 
    timerInterval=setInterval(()=>{
      if(time>0){ 
        time--; updateDisplay(); 
      } else { 
        clearInterval(timerInterval); isRunning=false; 
        alert("Time's up!"); 
        switchMode(); startTimer(); 
      }
    },1000);
  }
}

function pauseTimer(){ clearInterval(timerInterval); isRunning=false; }
function resetTimer(){ 
  clearInterval(timerInterval); isRunning=false; mode="work"; time=workTime; cycles=0; 
  updateDisplay(); 
}
updateDisplay();

/* === Ambient Audio === */
function playAmbient() {
  document.getElementById('rain').play();
  document.getElementById('cafe').play();
}

// Toggle visibility for each menu section (no styling changes)
document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});


function setVolume(id, value) { document.getElementById(id).volume = value; }

/* === Background Chooser === */
function changeBackground(fileName) {
  const body = document.body;
  const video = document.getElementById('bgVideo');
  const videoSrc = document.getElementById('bgVideoSrc');
  const overlay = document.querySelector('.background-overlay');

  // Reset
  body.style.backgroundImage = '';
  body.style.animation = '';
  video.style.display = 'none';
  overlay.style.background = 'rgba(0,0,0,0)'; // default transparent

  if (fileName === 'gradient') {
    body.style.background = 'linear-gradient(270deg, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb)';
    body.style.backgroundSize = '800% 800%';
    body.style.animation = 'gradientShift 30s ease infinite';
  } 
  else if (fileName.endsWith('.mp4')) {
    video.style.display = 'block';
    videoSrc.src = `backgrounds/${fileName}`;
    video.load();
    video.play();
  } 
  else {
    body.style.background = `url('backgrounds/${fileName}') no-repeat center center fixed`;
    body.style.backgroundSize = 'cover';

    // Example: dark overlay only for church or night images
    if (fileName === 'church_interior.jpg' || fileName === 'night_sky.jpg') {
      overlay.style.background = 'rgba(0,0,0,0.4)';
    }
  }
}

/* === Full-Screen Toggle === */
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

/* === Music Buttons Skeleton === */
function playYouTube() {
  alert("YouTube Lofi play logic here");
}

function playSpotify() {
  alert("Spotify play logic here");
}

/* === Quotes Skeleton === */
const quotes = [
  "Quote 1",
  "Quote 2",
  "Quote 3"
];

function showRandomQuote() {
  const quoteText = document.getElementById('quoteText');
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = random;
}

// Example: change quote every 30 seconds
setInterval(showRandomQuote, 30000);
showRandomQuote();
