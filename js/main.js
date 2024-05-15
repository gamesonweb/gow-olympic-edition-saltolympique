import { createScene, modifySettings } from "./mainScene.js";

let engine;
let canvas;
let scene;
let inputStates = {};

// for jump start
let chargeStartTime = 0;
let isJumping = false;
let jumpHeight = 0;
let chargingBar; // Declare chargingBar variable

window.onload = startGame;

function startGame() {
  canvas = document.getElementById("myCanvas");
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene(engine, canvas);

  // Create a fixed camera
  let camera = new BABYLON.FreeCamera(
    "camera",
    new BABYLON.Vector3(0, 0, -10),
    scene
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  // Create a cube
  let cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
  cube.position.y = 0.5;

  // Create a material for the cube
  let material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1);
  cube.material = material;

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

function cubeJump(cube, height) {
  let animation = new BABYLON.Animation(
    "jumpAnimation",
    "position.y",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  let keys = [];
  keys.push({
    frame: 0,
    value: cube.position.y,
  });
  keys.push({
    frame: 20,
    value: cube.position.y + height,
  });
  keys.push({
    frame: 40,
    value: cube.position.y,
  });

  animation.setKeys(keys);
  cube.animations.push(animation);
  scene.beginAnimation(cube, 0, 40, false, 1, () => {
    // Animation finished callback
    isJumping = false; // Reset jumping state
    chargingBar.style.display = "none"; // Hide the charging bar
    chargingBar.dataset.charging = "false"; // Reset data attribute
  });
}

function calculateJumpHeight(chargeDuration) {
  // Convert charge duration to a value between 0 and 1
  let chargeAmount = Math.min(chargeDuration / 100, 1);

  // Calculate jump height based on charge amount
  // The maximum jump height is 10 units
  let jumpHeight = chargeAmount * 10;

  return jumpHeight;
}
