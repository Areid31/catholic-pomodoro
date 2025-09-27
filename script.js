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
function playAmbient(){
  document.getElementById("rain").play();
  document.getElementById("cafe").play();
}

function setVolume(id, value){ document.getElementById(id).volume = value; }

/* === Background Chooser === */
function changeBackground(fileName){
  const body = document.body;
  const video = document.getElementById('bgVideoSrc');
  const videoSrc = document.getElementById('bgVideoSrc');

  body.style.backgroundImage = '';
  video.style.display = 'none';

  if(fileName.endsWith('.mp4')){
    videoSrc.src = `backgrounds/${fileName}`;
    video.load();
    video.style.display = 'block';
  } else {
    body.style.backgroundImage = `url('backgrounds/${fileName}')`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
  }
}
