import { createScene, modifySettings } from "./mainScene.js";
import { loadGrannyModel, playNextAnimation } from "./granny.js";

let engine;
let canvas;
let scene;
let inputStates = {};

window.onload = startGame;

function startGame() {
  canvas = document.getElementById("myCanvas");
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene(engine, canvas);
  loadGrannyModel(scene, () => {
    modifySettings(inputStates, playNextAnimation);
  });
  engine.runRenderLoop(() => {
    scene.render();
  });
}

window.addEventListener("resize", () => {
  engine.resize();
});
