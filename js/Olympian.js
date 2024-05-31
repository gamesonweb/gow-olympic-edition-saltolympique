let olympianSkeleton;
let poseAnim, flipAnim, jumpAnim, landAnim, idleAnim; // Add landAnim and idleAnim
let currentAnimationIndex = 0;

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

        // Set the skeleton and animations
        flipAnim = animationGroups.find((anim) => anim.name === "flip");
        poseAnim = animationGroups.find((anim) => anim.name === "Pose");
        jumpAnim = animationGroups.find((anim) => anim.name === "jump");
        landAnim = animationGroups.find((anim) => anim.name === "land"); // Add land animation
        idleAnim = animationGroups.find((anim) => anim.name === "idle"); // Add idle animation

        console.log("Olympian model loaded successfully.");
        callback(olympianMesh, { flipAnim, poseAnim, jumpAnim, landAnim, idleAnim });
      } else {
        console.error("Olympian model not loaded. No meshes found.");
      }
    },
    null,
    (scene, message, exception) => {
      console.error(`Error loading Olympian model: ${message}`, exception);
    }
  );
}

export function loadAnimations(scene) {
  // No need to load animations here since they are loaded with the model
}

export function playNextAnimation(isJumping) {
  if (isJumping) return;

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
      if (poseAnim) {
        console.log("Playing pose animation.");
        poseAnim.start(true, 1.0);
      }
      break;
    default:
      break;
  }
  

  currentAnimationIndex = (currentAnimationIndex + 1) % 3;
}
