let olympianSkeleton; // Variable to store skeleton
let jumpAnim, landAnim, flipAnim; // Variables to store animation groups
let currentAnimationIndex = 0; // Initialize currentAnimationIndex

let path = "assets/models";
console.log(path);

export function loadolympianModel(scene, callback) {
  BABYLON.SceneLoader.ImportMesh(
    "",
    "assets/models/",
    "Olympian.glb",
    scene,
    (meshes, particleSystems, skeletons, animationGroups) => {
      if (meshes.length > 0) {
        let olympianMesh = meshes[0];
        olympianMesh.position = new BABYLON.Vector3(0, 0, 0);
        olympianMesh.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);

        // Set the skeleton and animations
        olympianSkeleton = skeletons[0];
        jumpAnim = animationGroups.find((anim) => anim.name === "Jump");
        landAnim = animationGroups.find((anim) => anim.name === "Landing");
        flipAnim = animationGroups.find((anim) => anim.name === "FLIP");

        // Log position and visibility
        console.log(`olympian position: ${olympianMesh.position}`);
        console.log(`olympian scaling: ${olympianMesh.scaling}`);
        console.log(`olympian is visible: ${olympianMesh.isVisible}`);

        console.log("olympian model loaded successfully.");

        // Call the callback with the mesh
        callback(olympianMesh);
      } else {
        console.error("olympian model not loaded. No meshes found.");
      }
    },
    null,
    (scene, message, exception) => {
      console.error(`Error loading olympian model: ${message}`, exception);
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
