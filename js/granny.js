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
      grannySkeleton = skeletons[0]; // Store Granny's skeleton

      // Check if animation groups exist and store them
      jumpAnim = scene.getAnimationGroupByName("jump");
      landAnim = scene.getAnimationGroupByName("land");
      flipAnim = scene.getAnimationGroupByName("FLIP");

      if (grannySkeleton.animationRanges.length === 0) {
        console.warn("No animations found for Granny's skeleton.");
      }
      callback();
    }
  );
}

export function playNextAnimation() {
  //   if (!grannySkeleton) {
  //     console.error("Granny's skeleton not loaded yet");
  //     return;
  //   }

  switch (currentAnimationIndex) {
    case 0:
      console.log("jumpAnim");
      if (jumpAnim) {
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
