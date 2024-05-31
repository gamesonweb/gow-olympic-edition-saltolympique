let grannySkeleton; // Variable to store Granny's skeleton
let jumpAnim, landAnim, flipAnim; // Variables to store animation groups
let currentAnimationIndex = 0; // Initialize currentAnimationIndex

let path = "/Users/fernandespatrick/Desktop/Master Miage /gow-olympic-edition-saltolympique/assets/models";
console.log(path);

export function loadGrannyModel(scene, callback) {
  BABYLON.SceneLoader.ImportMesh(
      "",
      "assets/models/",
      "granny.glb",
      scene,
      (meshes, particleSystems, skeletons, animationGroups) => {
        if (meshes.length > 0) {
          let grannyMesh = meshes[0];
          grannyMesh.position = new BABYLON.Vector3(0, 0, 0);
          grannyMesh.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);

          // Set the skeleton and animations
          grannySkeleton = skeletons[0];
          jumpAnim = animationGroups.find(anim => anim.name === "Jump");
          landAnim = animationGroups.find(anim => anim.name === "Landing");
          flipAnim = animationGroups.find(anim => anim.name === "FLIP");

          // Log position and visibility
          console.log(`Granny position: ${grannyMesh.position}`);
          console.log(`Granny scaling: ${grannyMesh.scaling}`);
          console.log(`Granny is visible: ${grannyMesh.isVisible}`);

          console.log("Granny model loaded successfully.");

          // Call the callback with the mesh
          callback(grannyMesh);
        } else {
          console.error("Granny model not loaded. No meshes found.");
        }
      },
      null,
      (scene, message, exception) => {
        console.error(`Error loading Granny model: ${message}`, exception);
      }
  );
}

export function loadAnimations(scene) {
  // No need to load animations here since they are loaded with the model
}

export function playNextAnimation() {
  switch (currentAnimationIndex) {
    case 0:
      if (jumpAnim) {
        console.log("Playing jump animation.");
        jumpAnim.start(true, 1.0);
      }
      break;
    case 1:
      if (flipAnim) {
        console.log("Playing flip animation.");
        flipAnim.start(true, 1.0);
      }
      break;
    case 2:
      if (landAnim) {
        console.log("Playing land animation.");
        landAnim.start(true, 1.0);
      }
      break;
    default:
      break;
  }

  currentAnimationIndex = (currentAnimationIndex + 1) % 3;
}
