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
  hemisphericLight.intensity = 0.5;

  let directionalLight = new BABYLON.DirectionalLight(
    "directionalLight",
    new BABYLON.Vector3(0, -1, 0),
    scene
  );
  directionalLight.position = new BABYLON.Vector3(0, 50, 0);
  directionalLight.intensity = 0.5;

  let pointLight = new BABYLON.PointLight(
    "pointLight",
    new BABYLON.Vector3(0, 20, -10),
    scene
  );
  pointLight.intensity = 0.3;

  // Load arena model
  BABYLON.SceneLoader.ImportMesh(
    "",
    "assets/models/", // Path to the model
    "Arene.glb",
    scene,
    (meshes) => {
      if (meshes.length > 0) {
        let arenaMesh = meshes[0];
        arenaMesh.position = new BABYLON.Vector3(0, 0, 0);
        arenaMesh.scaling = new BABYLON.Vector3(5, 5, 5);
        console.log("Arena model loaded successfully.");
      } else {
        console.error("Error: Arena model not loaded. No meshes found.");
      }
    },
    null,
    (scene, message, exception) => {
      console.error(`Error loading arena model: ${message}`, exception);
    }
  );

  // Create and play background music
  let backgroundMusic = new BABYLON.Sound(
    "backgroundMusic",
    "../assets/musique/musique.mp3", // Path to your music file
    scene,
    null,
    { loop: true, autoplay: true }
  );

  return scene;
}

export function createCamera(scene, canvas, target) {
  // Create a follow camera
  let camera = new BABYLON.FollowCamera(
    "FollowCam",
    new BABYLON.Vector3(0, 100, 100),
    scene
  );

  // The goal distance of camera from target
  camera.radius = 40;
  // The goal height of camera above local origin (centre) of target
  camera.heightOffset = 40;
  // The goal rotation of camera around local origin (centre) of target in x y plane
  camera.rotationOffset = 100;
  // Acceleration of camera in moving from current to goal position
  camera.cameraAcceleration = 0.05;
  // The speed at which acceleration is halted
  camera.maxCameraSpeed = 20;

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  camera.lockedTarget = target;
  scene.onBeforeRenderObservable.add(() => {
    camera.position.x = camera.lockedTarget.position.x;
    camera.position.z = camera.lockedTarget.position.z - 40;
  });
  return camera;
}

export function modifySettings(inputStates) {
  // Define any settings modification logic here
}
