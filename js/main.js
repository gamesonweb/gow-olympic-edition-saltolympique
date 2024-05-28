import { createScene, modifySettings, createCamera } from "./mainScene.js";
import { Personnage } from "./personnage.js";
import { Score } from "./score.js";

let engine;
let canvas;
let scene;
let inputStates = {};
let camera;

// for jump start
let chargingBar; // Declare chargingBar variable
let chargeDuration = 0;
let chargeAmount = 0;

// Declare the Personnage instance
let perso;
let score;

window.onload = startGame;

function startGame() {
  canvas = document.getElementById("myCanvas");
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene(engine, canvas);

  score = new Score();

  // Initialize the character
  perso = new Personnage(scene, score);
  perso.createCharacter();

  camera = createCamera(scene, canvas, perso.cube);

  // Create the charging bar
  chargingBar = createChargingBar();

  score.displayHighScore();

  // Event listeners for keydown and keyup
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  engine.runRenderLoop(() => {
    scene.render();
    if (chargingBar && chargingBar.dataset.charging === "true") {
      // Check if chargingBar is defined
      chargeDuration += 1 / 1000;
      if (chargeDuration > 100000000) {
        chargeDuration = 0;
      }
      chargeAmount = chargeDuration;
      updateChargingBar(chargeAmount);
    }
  });

  // Resize the engine when the window is resized
  window.addEventListener("resize", () => {
    engine.resize();
  });

  // Modify settings
  modifySettings(inputStates);
}

function handleKeyDown(event) {
  if (event.code === "Space" && !perso.isJumping) {
    chargeDuration = 0;
    chargingBar.style.display = "block"; // Show the charging bar
    chargingBar.style.backgroundColor = "red"; // Start with red color
    chargingBar.style.width = "0"; // Reset width
    chargingBar.dataset.charging = "true"; // Set data attribute to indicate charging
  }
  if (event.code === "KeyF" && !perso.isFlipping && perso.isJumping) {
    perso.isFlipping = true;
    perso.cubeFlip();
  }
}

function handleKeyUp(event) {
  if (event.code === "Space") {
    let jumpHeight = perso.calculateJumpHeight(chargeDuration);
    perso.cubeJump(jumpHeight);
    chargingBar.style.display = "none"; // Hide the charging bar
    perso.isJumping = true;
  }
}

function createChargingBar() {
  let chargingBar = document.createElement("div");
  chargingBar.id = "chargingBar";
  chargingBar.style.position = "absolute";
  chargingBar.style.width = "20%";
  chargingBar.style.height = "20px";
  chargingBar.style.background = "green";
  chargingBar.style.top = "10px";
  chargingBar.style.left = "10px";
  chargingBar.style.display = "none"; // Initially hide the charging bar
  document.body.appendChild(chargingBar);
  return chargingBar;
}

function updateChargingBar(chargeAmount) {
  // Calculate charge amount between 0 and 1
  console.log(chargeAmount);
  // Calculate width of the charging bar
  let widthPercentage = chargeAmount * 100;
  chargingBar.style.width = `${widthPercentage}%`;

  // Interpolate color from red to green based on charge amount
  let red = Math.round(255 * (1 - chargeAmount));
  let green = Math.round(255 * chargeAmount);
  chargingBar.style.backgroundColor = `rgb(${red}, ${green}, 0)`;
}
