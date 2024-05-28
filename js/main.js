import { createScene, modifySettings } from "./mainScene.js";

let engine;
let canvas;
let scene;
let inputStates = {};
let cube;

// for jump start
let chargeStartTime = 0;
let isJumping = false;
let jumpHeight = 0;
let chargingBar; // Declare chargingBar variable

let isFlipping = false;

window.onload = startGame;

function startGame() {
  canvas = document.getElementById("myCanvas");
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene(engine, canvas);
  // Create a follow camera
  let camera = new BABYLON.FollowCamera(
    "FollowCam",
    new BABYLON.Vector3(0, 10, -10),
    scene
  );

  // The goal distance of camera from target
  camera.radius = 40;

  // The goal height of camera above local origin (centre) of target
  camera.heightOffset = 5;

  // The goal rotation of camera around local origin (centre) of target in x y plane
  camera.rotationOffset = 0;

  // Acceleration of camera in moving from current to goal position
  camera.cameraAcceleration = 0.05;

  // The speed at which acceleration is halted
  camera.maxCameraSpeed = 20;

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // Target the cube
  createCharacter();

  // Create the charging bar
  chargingBar = createChargingBar(); // Initialize chargingBar

  // Event listeners for keydown and keyup
  window.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
      chargeStartTime = Date.now();
      chargingBar.style.display = "block"; // Show the charging bar
      chargingBar.style.backgroundColor = "red"; // Start with red color
      chargingBar.style.width = "0"; // Reset width
      chargingBar.dataset.charging = "true"; // Set data attribute to indicate charging
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      let chargeDuration = Date.now() - chargeStartTime;
      jumpHeight = calculateJumpHeight(chargeDuration);
      cubeJump(cube, jumpHeight);
      chargingBar.style.display = "none"; // Hide the charging bar
      isJumping = true;
    }
  });

  engine.runRenderLoop(() => {
    scene.render();
    if (chargingBar && chargingBar.dataset.charging === "true") {
      // Check if chargingBar is defined
      let chargeDuration = Date.now() - chargeStartTime;
      updateChargingBar(chargeDuration);
    }
  });

  // Resize the engine when the window is resized
  window.addEventListener("resize", () => {
    engine.resize();
  });

  // Modify settings
  modifySettings(inputStates);
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
function updateChargingBar(chargeDuration) {
  // Calculate charge amount between 0 and 1
  let chargeAmount = Math.min(chargeDuration / 1000, 1);

  // Calculate width of the charging bar
  let widthPercentage = chargeAmount * 100;
  chargingBar.style.width = `${widthPercentage}%`;

  // Interpolate color from red to green based on charge amount
  let red = Math.round(255 * (1 - chargeAmount));
  let green = Math.round(255 * chargeAmount);
  chargingBar.style.backgroundColor = `rgb(${red}, ${green}, 0)`;
}

window.addEventListener("keydown", (event) => {
  if (event.code === "KeyF" && !isFlipping && isJumping) {
    isFlipping = true;
    cubeFlip(cube);
  }
});
