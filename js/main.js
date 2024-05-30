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

const MAX_CHARGE_DURATION = 1000;

let timerDisplay;
let timerInterval;
let timerSeconds = 60;

window.onload = startGame;

function startGame() {
  canvas = document.getElementById("myCanvas");
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene(engine, canvas);

  score = new Score();

  perso = new Personnage(scene, score);
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

  startTimer();

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
    }
  }

  if (event.code === "ArrowLeft") {
    inputStates.left = true;
  }
  if (event.code === "ArrowRight") {
    inputStates.right = true;
  }
  if (event.code === "KeyF" && perso.isJumping && !inputStates.flipping) {
    inputStates.flipping = true;
    perso.isFlipping = true;
  }
}

function handleKeyUp(event) {
  if (event.code === "Space" && chargingBar.dataset.charging === "true") {
    let chargeDuration = Date.now() - chargeStartTime;
    let jumpHeight = perso.calculateJumpHeight(chargeDuration);
    perso.characterJump(jumpHeight);
    chargingBar.style.display = "none";
    chargingBar.dataset.charging = "false";
    perso.isJumping = true;
    chargeDirection = 1;
  }

  if (event.code === "ArrowLeft") {
    inputStates.left = false;
  }
  if (event.code === "ArrowRight") {
    inputStates.right = false;
  }
  if (event.code === "KeyF") {
    inputStates.flipping = false;
    perso.isFlipping = false;
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
  let timerSeconds = 60; // Durée du timer en secondes

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
}
