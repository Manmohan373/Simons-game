let sequence = [];
let playerSequence = [];
let level = 0;
let gameStarted = false;
let buttons = document.querySelectorAll('.button');
let status = document.getElementById('status');
let scoreDisplay = document.getElementById('score');
let startBtn = document.getElementById('startBtn');
let playerNameInput = document.getElementById('playerName');

// Start game
startBtn.addEventListener('click', () => {
  if (!gameStarted && playerNameInput.value !== "") {
    gameStarted = true;
    startGame();
  } else if (gameStarted) {
    resetGame();
  } else {
    alert("Please enter your name to start!");
  }
});

// Button click event listeners
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (gameStarted) {
      let buttonId = button.id;
      playerSequence.push(buttonId);
      playSound(buttonId);
      buttonAnimation(buttonId);
      checkPlayerSequence();
    }
  });
});

// Start new game
function startGame() {
  level = 0;
  sequence = [];
  playerSequence = [];
  status.innerText = `${playerNameInput.value}'s Game: Level 0`;
  scoreDisplay.innerText = `Score: ${level}`;
  generateSequence();
}

// Reset the game
function resetGame() {
  playerSequence = [];
  sequence = [];
  level = 0;
  status.innerText = `${playerNameInput.value}'s Game: Level ${level}`;
  scoreDisplay.innerText = `Score: ${level}`;
  generateSequence();
  document.body.classList.remove('success', 'failure');  // Reset any background color change
}

// Generate the sequence
function generateSequence() {
  playerSequence = [];
  level++;
  status.innerText = `${playerNameInput.value}'s Game: Level ${level}`;
  scoreDisplay.innerText = `Score: ${level}`;
  let randomButton = getRandomButton();
  sequence.push(randomButton);
  flashSequence();
}

// Flash the sequence with transition effect
function flashSequence() {
  let i = 0;
  let interval = setInterval(() => {
    playSound(sequence[i]);
    buttonAnimation(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      setTimeout(() => {
        // Add transition effect after each successful level
        setTimeout(() => {
          buttonResetAnimation();
        }, 100);
      }, 500);
    }
  }, 1000);
}

// Play sound
function playSound(buttonId) {
  let audio = new Audio(`${buttonId}.mp3`);
  audio.play();
}

// Button animation with flash effect
function buttonAnimation(buttonId) {
  let button = document.getElementById(buttonId);
  button.classList.add('flash');
  setTimeout(() => {
    button.classList.remove('flash');
  }, 300);
}

// Reset button animation after flashing sequence
function buttonResetAnimation() {
  buttons.forEach(button => {
    button.style.opacity = 0.7;
    button.style.transform = "scale(1)";
  });
}

// Check the player's sequence
function checkPlayerSequence() {
  let currentIndex = playerSequence.length - 1;
  if (playerSequence[currentIndex] !== sequence[currentIndex]) {
    gameOver();
  } else {
    if (playerSequence.length === sequence.length) {
      setTimeout(() => {
        generateSequence();
      }, 1000);
    }
  }
}

// Game over function
function gameOver() {
  gameStarted = false;
  document.body.classList.add('failure'); // Apply failure background color
  status.innerText = `Game Over! ${playerNameInput.value}'s Final Level: ${level}`;
  scoreDisplay.innerText = `Final Score: ${level}`;
  startBtn.innerText = "Restart Game";
  setTimeout(() => {
    document.body.classList.remove('failure');
  }, 500); // Reset the background color after a short time
}

// Successful Level
function levelSuccess() {
  document.body.classList.add('success'); // Apply success background color
  setTimeout(() => {
    document.body.classList.remove('success');
  }, 500); // Reset after some time
}

// Get a random button from the list of 16 buttons
function getRandomButton() {
  let buttons = ['green', 'red', 'yellow', 'blue', 'purple', 'orange', 'cyan', 'pink', 'brown', 'gray', 'lightgreen', 'lightred', 'lightyellow', 'lightblue', 'lime', 'indigo'];
  return buttons[Math.floor(Math.random() * buttons.length)];
}
