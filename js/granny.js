let grannySkeleton; // Variable to store Granny's skeleton
let jumpAnim, landAnim, flipAnim; // Variables to store animation groups

export function loadGrannyModel(scene, characterFile, callback) {
  BABYLON.SceneLoader.ImportMesh(
      "",
      "assets/models/",
      characterFile,
      scene,
      (meshes, particleSystems, skeletons, animationGroups) => {
        if (meshes.length > 0) {
          let grannyMesh = meshes[0];
          //grannyMesh.position = new BABYLON.Vector3(0, 0, 0);
          //grannyMesh.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);

          // Set the skeleton and animations
          grannySkeleton = skeletons[0];
          jumpAnim = animationGroups.find(anim => anim.name === "Jump");
          landAnim = animationGroups.find(anim => anim.name === "Landing");
          flipAnim = animationGroups.find(anim => anim.name === "FLIP");

          if (!jumpAnim || !landAnim || !flipAnim) {
            console.error("Error: One or more animations not found.");
            return;
          }

          console.log("Granny model loaded successfully.");
          callback(grannyMesh, { jumpAnim, landAnim, flipAnim });
        } else {
          console.error("Error: Granny model not loaded. No meshes found.");
        }
      },
      null,
      (scene, message, exception) => {
        console.error(`Error loading Granny model: ${message}`, exception);
      }
  );
}

export function playAnimation(animation) {
  if (animation) {
    animation.start(true, 1.0);
  }
}

export function stopAnimation(animation) {
  if (animation) {
    animation.stop();
  }
}
