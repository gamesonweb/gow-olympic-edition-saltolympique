import { createScene, modifySettings, createCamera } from "./mainScene.js";
import { Personnage } from "./personnage.js";
import { Score } from "./score.js";
import { displayInstructionsHTML } from "./instructions.js";

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
let timerRunning = false;

const MAX_CHARGE_DURATION = 1000;

let timerDisplay;
let timerInterval;
let timerSeconds = 10;

window.onload = startGame;

function startGame(showInstructions = true) {
  canvas = document.getElementById("myCanvas");
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene(engine, canvas);

  score = new Score();

  perso = new Personnage(scene, score);
  perso.createCharacter();

  camera = createCamera(scene, canvas, perso.cube);

  chargingBar = createChargingBar();

  

  if (showInstructions) {
    displayInstructionsHTML();
    score.ScoreDisplays();
  }

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  engine.runRenderLoop(() => {
    scene.render();
    if (chargingBar && chargingBar.dataset.charging === "true") {
      let chargeDuration = Date.now() - chargeStartTime;
      updateChargingBar(chargeDuration);
    }
    perso.update(inputStates);
  });

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
  if (inputStates.flipping  && perso.isJumping && !inputStates.twistingRigth && inputStates.right){
    inputStates.twistingRigth = true;
    perso.isTwisting = true;
    
    console.log("twistppipipipiing");
  }
  if (inputStates.flipping  && perso.isJumping && !inputStates.twistingLeft && inputStates.left){
    inputStates.twistingLeft = true;
    perso.isTwisting = true;
    console.log("ca twits twisting");
  }
}

function handleKeyUp(event) {
  if (event.code === "Space" && chargingBar.dataset.charging === "true") {
    let chargeDuration = Date.now() - chargeStartTime;
    let jumpHeight = perso.calculateJumpHeight(chargeDuration);
    perso.cubeJump(jumpHeight);
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
    inputStates.twistingLeft= false;
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
  if (timerInterval) {
    console.log("Timer already running",timerInterval);
    return; // Arrête la fonction si le timer est déjà en cours
  }

  timerDisplay = document.createElement("div");
  timerDisplay.innerText = formatTime(timerSeconds);
  timerDisplay.style.position = "absolute";
  timerDisplay.style.bottom = "10px";
  timerDisplay.style.left = "10px";
  timerDisplay.style.color = "white";
  timerDisplay.style.fontSize = "20px";
  document.body.appendChild(timerDisplay);

  timerInterval = setInterval(() => {
    timerSeconds--;
    timerDisplay.innerText = formatTime(timerSeconds);

    if (timerSeconds === 0) {
      clearInterval(timerInterval);
      console.log("Timer ended",timerInterval);
      endGame();
    }
  }, 1000);
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function endGame() {
  // Afficher un message indiquant la fin du jeu et le score final
  let endMessage = document.createElement("div");
  endMessage.innerText = `Le temps est écoulé ! Votre score final est de ${score.getHighScore()}.`;
  endMessage.style.position = "absolute";
  endMessage.style.top = "25%";
  endMessage.style.left = "50%";
  endMessage.style.transform = "translate(-50%, -50%)";
  endMessage.style.color = "white";
  endMessage.style.fontSize = "24px";
  endMessage.style.fontWeight = "bold";
  endMessage.style.textAlign = "center";
  document.body.appendChild(endMessage);
  
  let inputPseudo = document.createElement("input");
  inputPseudo.type = "text";
  inputPseudo.placeholder = "Entrez votre pseudo";
  inputPseudo.style.position = "absolute";
  inputPseudo.style.top = "40%";
  inputPseudo.style.left = "50%";
  inputPseudo.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(inputPseudo);

  let restartButton = document.createElement("button");
  restartButton.innerText = "Rejouer";
  restartButton.style.position = "absolute";
  restartButton.style.top = "50%";
  restartButton.style.left = "50%";
  restartButton.style.transform = "translate(-50%, -50%)";
  restartButton.addEventListener("click", () => {
      let pseudo = inputPseudo.value;
      if (pseudo) {
          console.log(`Pseudo: ${pseudo}, Score: ${score.getHighScore()}`);
          restartGame();
          restartButton.remove(); // Supprime le bouton reset après avoir réinitialisé le jeu
          inputPseudo.remove(); 
          endMessage.remove();
          timerDisplay.remove();

      } else {
          alert("Veuillez entrer un pseudo.");
      }
  });
  document.body.appendChild(restartButton);
}
function restartGame() {
  // Clear dynamic game elements
  const elementsToRemove = document.querySelectorAll("#chargingBar, #timerDisplay, #endMessage, #instructions, #resetButton");
  elementsToRemove.forEach(element => element.remove());

  // Reset game variables
  inputStates = {};
  chargeStartTime = 0;
  chargeDirection = 1;
  timerRunning = false;

  // Reset score and timer
  timerSeconds = 60;  // Reset timer to 1 minute
  if (perso && perso.cube) {
    perso.cube.animations.forEach(animation => {
      perso.scene.stopAnimation(perso.cube, animation);
    });
    perso.cube.animations = [];
  }
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null; // Reset the timer interval variable
  }
  // Restart the game without displaying instructions
  startGame(false);  // Pass false to indicate not to show instructions

  if (perso) {
    perso.cubeReset();
    inputStates = {}; // Reset input states
  }
  console.log("Timer restarted",timerInterval);

}




