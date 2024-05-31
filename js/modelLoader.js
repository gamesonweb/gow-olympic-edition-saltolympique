let characterSkeleton; // Variable to store the skeleton
let poseAnim, flipAnim, jumpAnim, landAnim; // Variables to store animation groups

// Function to load a character model and its animations
export function loadModel(scene, characterFile, callback) {
    BABYLON.SceneLoader.ImportMesh(
        "",
        "assets/models/",
        characterFile,
        scene,
        (meshes, particleSystems, skeletons, animationGroups) => {
            if (meshes.length > 0) {
                let characterMesh = meshes[0];

                // Set the skeleton and animations
                characterSkeleton = skeletons[0];
                if (characterFile === "Olympian.glb") {
                    jumpAnim = animationGroups.find(anim => anim.name === "jump");
                    poseAnim = animationGroups.find(anim => anim.name === "Pose");
                    flipAnim = animationGroups.find(anim => anim.name === "flip");
                } else if (characterFile === "granny.glb") {
                    jumpAnim = animationGroups.find(anim => anim.name === "Jump");
                    landAnim = animationGroups.find(anim => anim.name === "Landing");
                    flipAnim = animationGroups.find(anim => anim.name === "FLIP");
                }

                if (!jumpAnim || !flipAnim || (!poseAnim && !landAnim)) {
                    console.error("Error: One or more animations not found.");
                    return;
                }

                console.log(`${characterFile} model loaded successfully.`);
                callback(characterMesh, { jumpAnim, poseAnim, flipAnim, landAnim });
            } else {
                console.error(`Error: ${characterFile} model not loaded. No meshes found.`);
            }
        },
        null,
        (scene, message, exception) => {
            console.error(`Error loading ${characterFile} model: ${message}`, exception);
        }
    );
}

export function loadAnimations(scene) {
    // No need to load animations here since they are loaded with the model
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
            if (poseAnim) {
                console.log("Playing pose animation.");
                poseAnim.start(true, 1.0);
            } else if (landAnim) {
                console.log("Playing land animation.");
                landAnim.start(true, 1.0);
            }
            break;
        default:
            break;
    }

    currentAnimationIndex = (currentAnimationIndex + 1) % 3;
}
