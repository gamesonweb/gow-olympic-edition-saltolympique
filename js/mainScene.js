export function createScene(engine, canvas) {
  let scene = new BABYLON.Scene(engine);

  // Set background color to a clear sky
  scene.clearColor = new BABYLON.Color4(0.53, 0.81, 0.98, 1);

  // Create lights
  let hemisphericLight = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(0, 1, 0), scene);
  hemisphericLight.intensity = 0.8;

  let directionalLight = new BABYLON.DirectionalLight("directionalLight", new BABYLON.Vector3(0, -1, 0), scene);
  directionalLight.position = new BABYLON.Vector3(0, 50, 0);
  directionalLight.intensity = 0.8;

  let pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 20, -10), scene);
  pointLight.intensity = 0.6;

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

  return scene;
}

export function createCamera(scene, canvas) {
  // Create an arc rotate camera
  let camera = new BABYLON.ArcRotateCamera(
      "ArcRotateCamera",
      BABYLON.Tools.ToRadians(50),
      BABYLON.Tools.ToRadians(50),
      150,
      new BABYLON.Vector3(0, 0, 0),
      scene
  );

  // Set the camera properties to disable zoom and rotation controls
  camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
  camera.lowerAlphaLimit = camera.upperAlphaLimit = camera.alpha;
  camera.lowerBetaLimit = camera.upperBetaLimit = camera.beta;

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  return camera;
}

export function modifySettings(inputStates) {
  // Define any settings modification logic here
}
