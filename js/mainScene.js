export function createScene(engine, canvas) {
  let scene = new BABYLON.Scene(engine);

  // Set background color
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

  // Create lights
  let light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  // Create another light
  let light2 = new BABYLON.PointLight(
    "pointLight",
    new BABYLON.Vector3(1, 10, -1),
    scene
  );
  light2.intensity = 0.5;
  light.intensity = 1;

  // Add ground
  let ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 20, height: 20 },
    scene
  );

  return scene;
}

export function createCamera(scene, canvas, target) {
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

  camera.lockedTarget = target;
  return camera;
}

export function modifySettings(inputStates) {
  // Define any settings modification logic here
}
