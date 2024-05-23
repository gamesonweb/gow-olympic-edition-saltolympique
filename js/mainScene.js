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
let light2 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, -1), scene);
  light2.intensity = 0.5;
  light.intensity = 1;
  // Create another light
let light3 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, -1), scene);
light3.intensity = 1;

  // Add ground
  let ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 20, height: 20 },
    scene
  );

  // Add some objects or meshes to the scene

  return scene;
}

export function modifySettings(inputStates) {
  // Define any settings modification logic here
}
