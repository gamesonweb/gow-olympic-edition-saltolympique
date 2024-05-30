export function createScene(engine, canvas) {
  let scene = new BABYLON.Scene(engine);

  // Set background color to a clear sky
  scene.clearColor = new BABYLON.Color4(0.53, 0.81, 0.98, 1);

  // Create lights
  let hemisphericLight = new BABYLON.HemisphericLight(
    "hemisphericLight",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  hemisphericLight.intensity = 0.8;

  let directionalLight = new BABYLON.DirectionalLight(
    "directionalLight",
    new BABYLON.Vector3(0, -1, 0),
    scene
  );
  directionalLight.position = new BABYLON.Vector3(0, 50, 0);
  directionalLight.intensity = 0.8;

  let pointLight = new BABYLON.PointLight(
    "pointLight",
    new BABYLON.Vector3(0, 20, -10),
    scene
  );
  pointLight.intensity = 0.6;

  return scene;
}

export function createCamera(scene, canvas, target) {
  // Create a universal camera
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

  camera.lockedTarget = target;
  return camera;
}

export function modifySettings(inputStates) {
  // Define any settings modification logic here
}
