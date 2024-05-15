export function createScene(engine, canvas) {
  let scene = new BABYLON.Scene(engine);
  let camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 2,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);
  let light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;
  return scene;
}

export function modifySettings(inputStates, playNextAnimation) {
  inputStates.space = false;
  window.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      console.log("Space key pressed");
      playNextAnimation();
    }
  });
}
