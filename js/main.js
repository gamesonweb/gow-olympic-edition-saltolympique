import { createScene, modifySettings, createCamera } from "./mainScene.js";
import { Personnage } from "./personnage.js";
import { Score } from "./score.js";
import { displayInstructionsHTML } from "./instructions.js";
import { ScoreManager } from "./ScoreManager.js";
import { displayCharacterSelection } from "./characterSelection.js";

let engine;
let canvas;
let scene;
let inputStates = {};
let camera;

let chargeStartTime = 0;
let chargingBar;
let chargeDirection = 1;

let perso;
let score;
let scoreManager;

const MAX_CHARGE_DURATION = 1000;
const INITIAL_TIMER_SECONDS = 60; // Initial timer value

let timerDisplay;
let timerInterval;
let timerSeconds = INITIAL_TIMER_SECONDS;
let timerRunning = false;
let playerName = ""; // New variable to store the player's name

window.onload = () => {
  showStartAnimation();
};

function showStartAnimation() {
  const overlay = document.getElementById("overlay");
  overlay.innerHTML = ""; // Clear any existing content

  const title = document.createElement("h1");
  title.innerText = "SaltOlympique";
  title.className = "game-title";
  overlay.appendChild(title);

  // // Confetti animation
  // confetti({
  //   particleCount: 200,
  //   spread: 70,
  //   origin: { y: 0.6 },
  // });

  setTimeout(() => {
    title.style.position = "fixed"; // Make the title stay in the same place
    title.style.top = "20px";
    title.style.left = "50%";
    title.style.transform = "translateX(-50%)";
    title.style.zIndex = "1002"; // Ensure the title is above other elements

    displayPseudoForm(); // Show the pseudo form after the animation
  }, 3000); // Show the start menu after 3 seconds
}

function displayPseudoForm() {
  const overlay = document.getElementById("overlay");
  overlay.innerHTML = ""; // Clear any existing content

  const formContainer = document.createElement("div");
  formContainer.style.textAlign = "center";
  formContainer.style.color = "white";

  const inputPseudo = document.createElement("input");
  inputPseudo.type = "text";
  inputPseudo.placeholder = "Entrez votre pseudo";
  inputPseudo.style.margin = "10px";
  inputPseudo.style.padding = "10px";
  inputPseudo.style.borderRadius = "5px";
  formContainer.appendChild(inputPseudo);

  const submitButton = document.createElement("button");
  submitButton.innerText = "Confirmer";
  submitButton.style.margin = "10px";
  submitButton.style.padding = "10px 20px";
  submitButton.style.border = "none";
  submitButton.style.borderRadius = "5px";
  submitButton.addEventListener("click", () => {
    if (inputPseudo.value.trim() !== "") {
      playerName = inputPseudo.value.trim();
      displayCharacterSelection(startGame);
    } else {
      alert("Veuillez entrer un pseudo.");
    }
  });

  formContainer.appendChild(inputPseudo);
  formContainer.appendChild(submitButton);
  overlay.appendChild(formContainer);
}

function displayStartMenu() {
  const overlay = document.getElementById("overlay");
  overlay.innerHTML = ""; // Clear any existing content

  const menuContainer = document.createElement("div");
  menuContainer.style.textAlign = "center";
  menuContainer.style.color = "white";

  const startButton = document.createElement("button");
  startButton.innerText = "Démarrer le jeu";
  startButton.style.margin = "10px";
  startButton.style.padding = "10px 20px";
  startButton.style.border = "none";
  startButton.style.borderRadius = "5px";
  startButton.style.backgroundColor = "#4CAF50";
  startButton.style.color = "white";
  startButton.style.cursor = "pointer";
  startButton.addEventListener("click", () => {
    overlay.innerHTML = ""; // Clear the overlay
    displayPseudoForm(); // Show the pseudo form before starting the game
  });

  const instructionsButton = document.createElement("button");
  instructionsButton.innerText = "Instructions";
  instructionsButton.style.margin = "10px";
  instructionsButton.style.padding = "10px 20px";
  instructionsButton.style.border = "none";
  instructionsButton.style.borderRadius = "5px";
  instructionsButton.style.backgroundColor = "#2196F3";
  instructionsButton.style.color = "white";
  instructionsButton.style.cursor = "pointer";
  instructionsButton.addEventListener("click", () => {
    overlay.innerHTML = ""; // Clear the overlay
    displayInstructionsHTML();
  });

  menuContainer.appendChild(startButton);
  menuContainer.appendChild(instructionsButton);
  overlay.appendChild(menuContainer);
}

function startGame(characterFile) {
  canvas = document.getElementById("myCanvas");
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene(engine, canvas);

  score = new Score();
  scoreManager = new ScoreManager();
  scoreManager.displayLeaderboard(); // Display the leaderboard at the start of the game

  perso = new Personnage(scene, score, characterFile);
  perso.createCharacter((loadedCharacter) => {
    camera = createCamera(scene, canvas, loadedCharacter);
    scene.activeCamera = camera;

    // Start the render loop only after the camera is set
    engine.runRenderLoop(() => {
      scene.render();
      if (chargingBar && chargingBar.dataset.charging === "true") {
        let chargeDuration = Date.now() - chargeStartTime;
        updateChargingBar(chargeDuration);
      }
      perso.update(inputStates);
    });
  });

  chargingBar = createChargingBar();
  score.ScoreDisplays();
  displayInstructionsHTML();

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  window.addEventListener("resize", () => {
    engine.resize();
  });

  modifySettings(inputStates);
}

function handleKeyDown(event) {
  if (event.code === "Space" && !perso.isJumping) {
    if (chargingBar.dataset.charging !== "true") {
      chargeStartTime = Date.now();
      chargingBar.style.display = "block";
      chargingBar.style.backgroundColor = "red";
      chargingBar.style.width = "0";
      chargingBar.dataset.charging = "true";
      startTimer();
    }
  }

  if (event.code === "ArrowLeft") {
    inputStates.left = true;
  }
  if (event.code === "ArrowRight") {
    inputStates.right = true;
  }
  if (event.code === "ArrowUp" && perso.isJumping && !inputStates.flipping) {
    inputStates.flipping = true;
    perso.isFlipping = true;
  }
  if (
    inputStates.flipping &&
    perso.isJumping &&
    !inputStates.twistingRigth &&
    inputStates.right
  ) {
    inputStates.twistingRigth = true;
    perso.isTwisting = true;

    console.log("twistppipipipiing");
  }
  if (
    inputStates.flipping &&
    perso.isJumping &&
    !inputStates.twistingLeft &&
    inputStates.left
  ) {
    inputStates.twistingLeft = true;
    perso.isTwisting = true;
    console.log("ca twits twisting");
  }
}

function handleKeyUp(event) {
  if (event.code === "Space" && chargingBar.dataset.charging === "true") {
    let chargeDuration = Date.now() - chargeStartTime;
    let jumpHeight = perso.calculateJumpHeight(chargeDuration);
    perso.characterJump(jumpHeight, chargingBar);
    chargingBar.style.display = "none";
    chargingBar.dataset.charging = "false";
    perso.isJumping = true;
    chargeDirection = 1;
  }

  if (event.code === "ArrowLeft") {
    inputStates.left = false;
    inputStates.twistingLeft = false;
  }
  if (event.code === "ArrowRight") {
    inputStates.right = false;
    inputStates.twistingRigth = false;
  }
  if (event.code === "ArrowUp") {
    inputStates.flipping = false;
    perso.isFlipping = false;
    inputStates.twistingLeft = false;
    inputStates.twistingRigth = false;
    perso.isTwisting = false;
  }
}

function createChargingBar() {
  let chargingBar = document.createElement("div");
  chargingBar.id = "chargingBar";
  chargingBar.className = "chargingBar";
  chargingBar.style.position = "absolute";
  chargingBar.style.width = "0";
  chargingBar.style.height = "20px";
  chargingBar.style.background = "green";
  chargingBar.style.top = "100px";
  chargingBar.style.left = "10px";
  chargingBar.style.display = "none";
  chargingBar.style.border = "2px solid #fffff";
  chargingBar.style.borderRadius = "10px";
  chargingBar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

  document.body.appendChild(chargingBar);
  return chargingBar;
}

function updateChargingBar(chargeDuration) {
  let chargeAmount = chargeDuration / MAX_CHARGE_DURATION;

  if (chargeDirection === -1) {
    chargeAmount = 1 - chargeAmount;
  }

  let widthPercentage = chargeAmount * 100;
  chargingBar.style.width = `${widthPercentage}%`;

  let red = Math.round(255 * (1 - chargeAmount));
  let green = Math.round(255 * chargeAmount);
  chargingBar.style.backgroundColor = `rgb(${red}, ${green}, 0)`;

  if (chargeDuration >= MAX_CHARGE_DURATION) {
    chargeStartTime = Date.now();
    chargeDirection *= -1;
  }
}

function startTimer() {
  if (timerRunning) {
    return; // Stop if   the timer is already running
  }

  timerRunning = true; // Set the timer as running

  timerDisplay = document.createElement("div");
  timerDisplay.className = "timer";
  timerDisplay.innerText = formatTime(timerSeconds);
  timerDisplay.style.position = "absolute";
  timerDisplay.style.bottom = "10px";
  timerDisplay.style.left = "10px";
  timerDisplay.style.color = "gold";
  timerDisplay.style.fontSize = "20px";
  document.body.appendChild(timerDisplay);

  timerInterval = setInterval(() => {
    timerSeconds--;
    timerDisplay.innerText = formatTime(timerSeconds);
    if (timerSeconds <= 10) {
      timerDisplay.style.fontSize = "40px";
      timerDisplay.style.textShadow =
        "1px 1px 1px #ff0000, 0.5px 0.5px 1px #cc0000, 1px 0.5px 1px #ff0000, 0.75px 0.75px 1px #cc0000, 1.25px 0.75px 1px #ff0000, 1px 1px 1px #cc0000, 1.5px 1px 1px #ff0000, 1.25px 1.25px 1px #cc0000, 1.75px 1.25px 1px #ff0000, 1.5px 1.5px 1px #cc0000, 2px 1.5px 1px #ff0000, 1.75px 1.75px 1px #cc0000, 2.25px 1.75px 1px #ff0000";
    }
    if (timerSeconds === 0) {
      clearInterval(timerInterval);
      timerRunning = false; // Reset the timer running flag
      endGame();
    }
  }, 1000);
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function endGame() {
  const finalScore = score.getHighScore();
  const bestScore = scoreManager.getBestScore();
  const isNewBest = finalScore > bestScore;

  if (isNewBest) {
    // Show congratulatory message and confetti
    const congratsMessage = document.createElement("div");
    congratsMessage.innerText = `Félicitations ${playerName}! Vous avez le meilleur score de ${finalScore}!`;
    congratsMessage.style.position = "absolute";
    congratsMessage.style.top = "25%";
    congratsMessage.style.left = "50%";
    congratsMessage.style.transform = "translate(-50%, -50%)";
    congratsMessage.style.color = "red";
    congratsMessage.style.fontSize = "24px";
    congratsMessage.style.fontWeight = "bold";
    congratsMessage.style.textAlign = "center";
    congratsMessage.id = "congratsMessage"; // Set the ID to easily remove it later
    document.body.appendChild(congratsMessage);

    // Show the character in pose animation
    if (perso && perso.poseAnim) {
      perso.character.position = new BABYLON.Vector3(0, 1.51, 0); // Position character
      perso.character.scaling = new BABYLON.Vector3(20, 20, 20);
      playAnimation(perso.poseAnim); // Play pose animation
    }

    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      congratsMessage.remove();
    }, 5000); // Remove the message after 5 seconds
  }

  // Afficher un message indiquant la fin du jeu et le score final
  let endMessage = document.createElement("div");
  endMessage.innerText = `Le temps est écoulé ! Votre score final est de ${finalScore}.`;
  endMessage.style.position = "absolute";
  endMessage.style.top = "35%";
  endMessage.style.left = "50%";
  endMessage.style.transform = "translate(-50%, -50%)";
  endMessage.style.color = "white";
  endMessage.style.fontSize = "24px";
  endMessage.style.fontWeight = "bold";
  endMessage.style.textAlign = "center";
  endMessage.id = "endMessage"; // Set the ID to easily remove it later
  document.body.appendChild(endMessage);

  let restartButton = document.createElement("button");
  restartButton.innerText = "Rejouer";
  restartButton.style.position = "absolute";
  restartButton.style.top = "50%";
  restartButton.style.left = "50%";
  restartButton.style.transform = "translate(-50%, -50%)";
  restartButton.id = "restartButton"; // Set the ID to easily remove it later
  restartButton.addEventListener("click", () => {
    scoreManager.addScore(playerName, finalScore);
    scoreManager.displayLeaderboard();
    restartGame();
    endMessage.remove();
    restartButton.remove();
  });
  document.body.appendChild(restartButton);

  let quitButton = document.createElement("button");
  quitButton.innerText = "Quitter";
  quitButton.style.position = "absolute";
  quitButton.style.top = "60%";
  quitButton.style.left = "50%";
  quitButton.style.transform = "translate(-50%, -50%)";
  quitButton.id = "quitButton"; // Set the ID to easily remove it later
  quitButton.addEventListener("click", () => {
    scoreManager.addScore(playerName, finalScore);
    scoreManager.displayLeaderboard();
    clearDynamicElements();
    endMessage.remove();
    restartButton.remove();
    quitButton.remove();
    showStartAnimation(); // Restart the game
  });
  document.body.appendChild(quitButton);
}

function restartGame() {
  // Clear dynamic game elements
  const elementsToRemove = document.querySelectorAll(
    "#chargingBar, .timer, #endMessage, #instructions, #leaderboard, #restartButton, #quitButton"
  );
  elementsToRemove.forEach((element) => element.remove());

  // Reset game variables
  inputStates = {};
  chargeStartTime = 0;
  chargeDirection = 1;
  timerRunning = false;

  // Reset score and timer
  timerSeconds = INITIAL_TIMER_SECONDS; // Reset timer to initial value
  if (perso) {
    perso.reset();
    inputStates = {}; // Reset input states
  }
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null; // Reset the timer interval variable
  }
  score.removeScoreDisplays(); // Ensure score displays are removed
  // Restart the game without displaying instructions
  displayCharacterSelection(startGame); // Display character selection to start the game

  console.log("Timer restarted", timerInterval);
}

function clearDynamicElements() {
  const elementsToRemove = document.querySelectorAll(
    "#chargingBar, .timer, #endMessage, #instructions, #leaderboard, #scoreStreak, #currentScore"
  );
  elementsToRemove.forEach((element) => element.remove());
}
