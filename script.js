let timer; 
let isRunning = false; 
let startTime; 
let elapsedTime = 0;
let laps = []; 

function startStop() {
  if (!isRunning) {
    startTimer();
    document.getElementById('startStop').textContent = 'Stop';
    document.getElementById('lapReset').textContent = 'Lap';
  } else {
    stopTimer();
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('lapReset').textContent = 'Reset';
  }
  isRunning = !isRunning;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timer = setInterval(updateTime, 10);
}

function stopTimer() {
  clearInterval(timer);
}

function lapReset() {
  if (isRunning) {
    recordLap();
  } else {
    resetTimer();
  }
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  displayTime(elapsedTime);
  updateBackgroundColor(elapsedTime); 
}

function displayTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10); 
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
  document.getElementById('display').textContent = formattedTime;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function recordLap() {
  const lapTime = elapsedTime;
  laps.push(lapTime);
  displayLaps();
}

function displayLaps() {
  const lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
    lapsList.appendChild(lapItem);
  });
}

function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10); 
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  displayTime(elapsedTime);
  laps = [];
  displayLaps();
  document.body.style.backgroundColor = '#f0f0f0'; 
}

function updateBackgroundColor(elapsedTime) {
  const hue = Math.floor((elapsedTime / 60000) * 360); 
  document.body.style.backgroundColor = `hsl(${hue}, 70%, 80%)`; 
}