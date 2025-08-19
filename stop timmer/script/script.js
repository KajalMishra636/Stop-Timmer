let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 0;

const timeDisplay = document.getElementById('time-display');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

function formatTime(ms) {
  const date = new Date(ms);
  return date.toISOString().substr(11, 8);
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 100);
    isRunning = true;
    startStopButton.textContent = 'Stop';
  } else {
    clearInterval(timer);
    isRunning = false;
    startStopButton.textContent = 'Start';
  }
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay();
  startStopButton.textContent = 'Start';
}

function recordLap() {
  if (isRunning) {
    lapCount++;
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
    lapList.appendChild(lapTime);
  }
}

startStopButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
