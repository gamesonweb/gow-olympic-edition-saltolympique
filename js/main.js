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

window.onload = startGame;

function startGame() {
  canvas = document.getElementById("myCanvas");
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene(engine, canvas);

  score = new Score();

  perso = new Personnage(scene, score);
  perso.createCharacter();

  camera = createCamera(scene, canvas, perso.cube);

  chargingBar = createChargingBar();

  score.ScoreDisplays();
  displayInstructionsHTML();

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
    perso.cubeJump(jumpHeight);
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
