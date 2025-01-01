let sequence = [];
let playerSequence = [];
let level = 0;
let gameStarted = false;
let buttons = document.querySelectorAll('.button');
let status = document.getElementById('status');
let scoreDisplay = document.getElementById('score');
let startBtn = document.getElementById('startBtn');
let playerNameInput = document.getElementById('playerName');

// Toast element for success and failure messages
let toast = document.createElement('div');
toast.classList.add('toast');
document.body.appendChild(toast);

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
  buttons.forEach(button => button.classList.remove('glow')); // Remove glow from buttons
}

// Generate the sequence
function generateSequence() {
  playerSequence = [];
  level++;
  status.innerText = `${playerNameInput.value}'s Game: Level ${level}`;
  scoreDisplay.innerText = `Score: ${level}`;
  
  // Show level-up toast (after level-up, not at the start)
  if (level > 1) {
    showToast("Level Up!", "success");
  }

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
        // Reset button animation after flashing
        buttonResetAnimation();
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
  button.classList.add('flash', 'glow'); // Add both classes for flash and glow effect
  
  setTimeout(() => {
    button.classList.remove('flash'); // Remove flash class
  }, 300);

  setTimeout(() => {
    button.classList.remove('glow'); // Remove glow effect after flash
  }, 500);  // Same timing as flash duration
}

// Reset button animation after flashing sequence
function buttonResetAnimation() {
  buttons.forEach(button => {
    button.style.opacity = 0.7;
    button.style.transform = "scale(1)";
    button.classList.remove('glow'); // Reset glow class
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
  showToast(`Game Over! Final Level: ${level}`, "failure");
  status.innerText = `Game Over! ${playerNameInput.value}'s Final Level: ${level}`;
  scoreDisplay.innerText = `Final Score: ${level}`;
  startBtn.innerText = "Restart Game";
}

// Show toast with success or failure message
function showToast(message, type) {
  toast.innerText = message;
  toast.classList.remove('hide');
  toast.classList.add('show', type);
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
  }, 2000); // Toast will disappear after 2 seconds
}

// Get a random button from the list of 16 buttons
function getRandomButton() {
  let buttons = ['green', 'red', 'yellow', 'blue', 'purple', 'orange', 'cyan', 'pink', 'brown', 'gray', 'lightgreen', 'lightred', 'lightyellow', 'lightblue', 'lime', 'indigo'];
  return buttons[Math.floor(Math.random() * buttons.length)];
}
