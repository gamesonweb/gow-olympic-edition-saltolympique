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

  // Create ground
  let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 60, height: 60 }, scene);

  // Add a material for the ground
  let groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.8, 0.4);
  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  ground.material = groundMaterial;

  // Create trampoline
  let trampoline = BABYLON.MeshBuilder.CreateCylinder("trampoline", { diameter: 20, height: 1, tessellation: 24 }, scene);
  trampoline.position.y = 0.5;

  let trampolineMaterial = new BABYLON.StandardMaterial("trampolineMaterial", scene);
  trampolineMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
  trampolineMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  trampoline.material = trampolineMaterial;

  // Create trampoline mat
  let trampolineMat = BABYLON.MeshBuilder.CreateDisc("trampolineMat", { radius: 9.5, tessellation: 24 }, scene);
  trampolineMat.position.y = 1.01;

  let matMaterial = new BABYLON.StandardMaterial("matMaterial", scene);
  matMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
  matMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  trampolineMat.material = matMaterial;

  // Create stands
  let standMaterial = new BABYLON.StandardMaterial("standMaterial", scene);
  standMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);
  standMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  const createStand = (x, z, width, height) => {
    let stand = BABYLON.MeshBuilder.CreateBox("stand", { width: width, height: height, depth: 5 }, scene);
    stand.position = new BABYLON.Vector3(x, height / 2, z);
    stand.material = standMaterial;
    return stand;
  };

  createStand(0, 30, 60, 10); // Front stand
  createStand(0, -30, 60, 10); // Back stand
  createStand(30, 0, 60, 10).rotation.y = Math.PI / 2; // Right stand
  createStand(-30, 0, 60, 10).rotation.y = Math.PI / 2; // Left stand

  // Create audience seats
  const createSeats = (x, y, z) => {
    let seat = BABYLON.MeshBuilder.CreateBox("seat", { width: 2, height: 1, depth: 2 }, scene);
    seat.position = new BABYLON.Vector3(x, y, z);
    seat.material = new BABYLON.StandardMaterial("seatMaterial", scene);
    seat.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    seat.material.specularColor = new BABYLON.Color3(0, 0, 0);
    return seat;
  };

  for (let i = -25; i <= 25; i += 5) {
    createSeats(i, 5, 28);
    createSeats(i, 5, -28);
    createSeats(28, 5, i).rotation.y = Math.PI / 2;
    createSeats(-28, 5, i).rotation.y = Math.PI / 2;
  }

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
