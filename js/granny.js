let grannySkeleton; // Variable to store Granny's skeleton
let jumpAnim, landAnim, flipAnim; // Variables to store animation groups
let currentAnimationIndex = 0; // Initialize currentAnimationIndex

export function loadGrannyModel(scene, callback) {
  BABYLON.SceneLoader.ImportMesh(
    "",
    "",
    "assets/scene.babylon",
    scene,
    (meshes, particleSystems, skeletons, animationGroups) => {
      let grannyMesh = meshes[0];
      grannyMesh.position = new BABYLON.Vector3(0, 0, 5);
      grannyMesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);

      callback();
    }
  );
}

export function loadAnimations(scene) {
  // Directly access animation groups by their names
  jumpAnim = scene.getAnimationGroupByName("Jump");
  landAnim = scene.getAnimationGroupByName("Landing");
  flipAnim = scene.getAnimationGroupByName("FLIP");

  // Check if any animation group is missing
  if (!jumpAnim) {
    console.warn("Jump animation group not found.");
  }
  if (!landAnim) {
    console.warn("Landing animation group not found.");
  }
  if (!flipAnim) {
    console.warn("FLIP animation group not found.");
  }
}

export function playNextAnimation() {
  switch (currentAnimationIndex) {
    case 0:
      if (jumpAnim) {
        console.log("jumpAnim");
        jumpAnim.start(true, 1.0);
      }
    case 1:
      console.log("flipAnim");
      if (flipAnim) flipAnim.start(true, 1.0);
      break;
    case 2:
      console.log("landAnim");
      if (landAnim) landAnim.start(true, 1.0);
      break;
    default:
      break;
  }

  currentAnimationIndex = (currentAnimationIndex + 1) % 3;
}
