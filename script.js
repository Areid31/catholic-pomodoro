// Save when the user changes the name
const userNameSpan = document.getElementById('userName');
userNameSpan.addEventListener('input', () => {
  localStorage.setItem('userName', userNameSpan.textContent);
});

// Load on page load
if(localStorage.getItem('userName')){
  userNameSpan.textContent = localStorage.getItem('userName');
}

/* === Timer Logic === */
let workTime = 25*60, shortBreak = 0.5*60, longBreak = 15*60, cycles=0;
let time = workTime, timerInterval, isRunning=false, mode="work";

function updateDisplay() {
  let minutes = Math.floor(time/60);
  let seconds = time%60;
  document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2,'0')}`;
  document.getElementById("mode").textContent =
    mode==="work"?"Focus Time!":mode==="short"?"Take a break :)":"Take a break :)";
}

function switchMode(){ // Automatic time switching
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

function setMode(newMode) {
  clearInterval(timerInterval);
  isRunning = false;
  mode = newMode;

  if (mode === "work") time = workTime;
  else if (mode === "short") time = shortBreak;
  else time = longBreak;

  // Remove active from all buttons
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  // Add active to clicked button
  document.querySelector(`.mode-btn[data-mode="${newMode}"]`).classList.add('active');

  updateDisplay();
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      if (time > 0) {
        time--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;

        // Play alarm immediately
        document.getElementById('alarmSound').play();

        // Show alert after a tiny delay so sound starts
        setTimeout(() => {
          alert("Time's up!");
          switchMode();
          startTimer();
        }, 50);

      }
    }, 1000);
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

function setVolume(id, value) { 
  document.getElementById(id).volume = value; 
}

// Toggle visibility for each menu section (no styling changes)
document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

// click outside to close
document.addEventListener('click', (e) => {
  document.querySelectorAll('.menu-wrapper').forEach(wrapper => {
    if (!wrapper.contains(e.target)) {
      wrapper.querySelector('.menu-content').style.display = 'none';
    }
  });
});

function toggleSound(id) {
  const audio = document.getElementById(id);
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

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

function openBgModal() { document.getElementById('bgModal').style.display = 'block'; }
function closeBgModal() { document.getElementById('bgModal').style.display = 'none'; }


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

/* === Quotes Skeleton === */
const quotes = [
  "“Nothing is far from God.” - St. Monica",
  "“Always forward, never back.” - St. Junipero Serra",
  "“Be good, love the Lord…” - St. Josephine Bakhita",
  "“Nothing helps a man more than prayer.” - St. Philip Neri",
  "“God asks little but He gives much.” - St. John Chrysostom",
  "“The future starts today, not tomorrow.” - St. John Paul II",
  "“Never miss an opportunity to do good.” - St. Francis de Sales",
  "“Act and God will act, work and He will work.” - St. Joan of Arc",
  "“To love is to will the good of the other.” - Saint Thomas Aquinas",
  "“I want eternity. I was born for greater things.” - St. Stanislaus",
  "“Love God, serve God; everything is in that.” - St. Clare of Assisi",
  "“Be joyful, and keep your faith and your creed.” - St. David of Wales",
  "“Life is short; our trials last but a moment.” - St. Teresa of Avila",
  "“Holy Communion is the shortest and safest way to heaven.” - St. Pius X",
  "“I will spend my heaven doing good on earth.” - St. Thérèse of Lisieux",
  "“Do not let a day pass without doing some good in it.” - St. Philip Neri",
  "“I am who I am before God, no more and no less.” - St. Francis of Assisi",
    "“The greatest poison of our time is indifference.” - St. Maximilian Kolbe",
  "“The whole earth is a living icon of the face of God.” - St. John Damascene",
  "“…the gifts of grace increase as the struggles increase.”  - St. Rose of Lima",
  "“Love ought to show itself in deeds more than words.” - St. Ignatius of Loyola",
  "“Christ is the center of the universe and of human history…” - St. John Paul II",
  "“Walk with your feet on earth, but in your heart be in heaven.” - St. John Bosco",
  "“If God created shadows, it was to better emphasize the light.” - St. John XXIII",
  "“Unfurl the sails, and let God steer us where He will.” - St. Bede the Venerable",
  "“A soul that walks in love neither rests nor grows tired.” - St. John of the Cross",
  "“At the end of our life, we shall all be judged by charity.”-  St. John of the Cross",
  "“Jesus Christ is all my riches; he alone is sufficient for me.” - St. Louis of Toulouse",
  "“One cannot love without suffering or suffer without loving.” - St. Gianna Beretta Molla",
   "“An ounce of charity is better than a hundred loads of reason.” - St. Robert Bellarmine",
  "“If you are what you should be, you will set the whole world on fire!” - St. Catherine of Siena",
  "“Darkness can only be scattered by light. Hatred can only be conquered by love.” - St. John Paul II",
  "“Prayer is the foundation of the spiritual edifice. Prayer is all powerful.” - St. Josemaria Escriva",
  "“Who except God can give you peace? Has the world ever been able to satisfy the heart?” - St. Gerard Majella",
  "“Anyone who seeks truth seeks God, whether or not he realizes it.” - St. Teresa Benedicta of the Cross (Edith Stein)",
  "“I can’t do big things. But I want all I do, even the smallest thing, to be for the greater glory of God.” - St. Dominic Savio",
  "For nothing will be impossible for God. — Lk 1:37 (NABRE)",
  "Your every act should be done with love. — 1 Cor 16:14 (NABRE)",
  "Those who are slack at their work are kin to the destroyer. — Prov 18:9 (NABRE)",
  "Entrust your works to the LORD, and your plans will succeed. — Prov 16:3 (NABRE)",
  "For you have died, and your life is hidden with Christ in God. — Col 3:3 (NABRE)",
  "Serve wholeheartedly, as serving the Lord and not human beings. — Eph 6:7 (NABRE)",
  "I have the strength for everything through him who empowers me. — Phil 4:13 (NABRE)",
  "Do not grow slack in zeal, be fervent in spirit, serve the Lord. — Rom 12:11 (NABRE)",
  "The slack hand impoverishes, but the hand of the diligent enriches. — Prov 10:4 (NABRE)",
  "I have competed well; I have finished the race; I have kept the faith. — 2 Tm 4:7 (NABRE)",
  "Whatever you do, do from the heart, as for the Lord and not for others. — Col 3:23 (NABRE)",
  "Ill-gotten treasures are of no value, but righteousness saves from death. — Prov 10:2 (NABRE)",
  "“Come to me, all you who labor and are burdened, and I will give you rest.” — Mt 11:28 (NABRE)",
  "So whether you eat or drink, or whatever you do, do everything for the glory of God. — 1 Cor 10:31 (NABRE)",
  "By mere talk a household is not made secure, and in all labor there is profit, but mere talk tends only to loss. — Prov 14:23 (NABRE)",
];

function showRandomQuote() {
  const quoteText = document.getElementById('quoteText');
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = random;
}

// Example: change quote every 30 seconds
setInterval(showRandomQuote, 30000);
showRandomQuote();
