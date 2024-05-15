import { createScene, modifySettings } from "./mainScene.js";

let engine;
let canvas;
let scene;
let inputStates = {};

//for jump start
let chargeStartTime = 0;
let isJumping = false;
let jumpHeight = 0;

window.onload = startGame;

function startGame() {
  canvas = document.getElementById("myCanvas");
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene(engine, canvas);

  // Create a fixed camera
  let camera = new BABYLON.FreeCamera(
    "camera",
    new BABYLON.Vector3(0, 5, -10),
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

  engine.runRenderLoop(() => {
    scene.render();
  });

  // Create the charging bar
  let chargingBar = createChargingBar();

  // Event listeners for keydown and keyup
  window.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
      chargeStartTime = Date.now();
      chargingBar.isVisible = true;
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      let chargeDuration = Date.now() - chargeStartTime;
      jumpHeight = calculateJumpHeight(chargeDuration);
      cubeJump(cube, jumpHeight);
      chargingBar.isVisible = false;
      isJumping = true;
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
  let advancedTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  let chargingBar = new BABYLON.GUI.Rectangle("chargingBar");
  chargingBar.width = 0.2;
  chargingBar.height = "20px";
  chargingBar.color = "white";
  chargingBar.thickness = 4;
  chargingBar.background = "green";
  chargingBar.horizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  chargingBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
  chargingBar.isVisible = false;
  advancedTexture.addControl(chargingBar);
  return chargingBar;
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
  scene.beginAnimation(cube, 0, 40, false);
}

function calculateJumpHeight(chargeDuration) {
  // Modify this function according to your requirements
  // For example, you can use a simple linear equation to calculate the jump height based on charge duration
  return (chargeDuration / 100) * 0.2;
}
