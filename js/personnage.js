export class Personnage {
  constructor(scene, score) {
    this.cube = null;
    this.isJumping = false;
    this.isFlipping = false;
    this.scene = scene;
    this.score = score;
  }

  createCharacter() {
    // Create a cube
    this.cube = BABYLON.MeshBuilder.CreateBox(
      "cube",
      { width: 1, height: 2, depth: 0.5 },
      this.scene
    );
    this.cube.position.y = 1;

    // Create a material for the cube
    let material = new BABYLON.StandardMaterial("material", this.scene);
    material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1);
    this.cube.material = material;
  }

  cubeJump(height) {
    if (this.isJumping) return; // Prevent jump if already jumping

    this.isJumping = true; // Set jumping state to true
    let animation = new BABYLON.Animation(
      "jumpAnimation",
      "position.y",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    let keys = [];
    keys.push({ frame: 0, value: this.cube.position.y });
    keys.push({ frame: 20, value: this.cube.position.y + height });
    keys.push({ frame: 40, value: this.cube.position.y });

    animation.setKeys(keys);
    this.cube.animations.push(animation);
    this.scene.beginAnimation(this.cube, 0, 40, false, 1, () => {
      // Animation finished callback
      this.cubeLand(); // Check if the cube landed
      this.isJumping = false; // Reset jumping state
      if (this.isFlipping) {
        this.scene.stopAnimation(this.cube); // Stop the flip animation
        this.cubeReset(); // Reset the cube position
      }
      console.log(this.score.getScore()); // Get the score
      this.score.setHighScore(); // Set high score
      this.score.updateHighScore(); // Update high score
      chargingBar.style.display = "none"; // Hide the charging bar
      chargingBar.dataset.charging = "false"; // Reset data attribute
    });
  }

  calculateJumpHeight(chargeDuration) {
    // Convert charge duration to a value between 0 and 1
    let chargeAmount = Math.min(chargeDuration / 1000, 1);
    // Calculate jump height based on charge amount
    // The maximum jump height is 10 units
    return chargeAmount * 10;
  }
  
  cubeLand() {
    // check if the cube is standing
    console.log("Cube landed");
    if (this.cube.rotation.x > 2 && this.cube.rotation.x < 3.7) {
      // JUMP SUCCEEDED
      console.log("Cube landed successfully");
      this.score.increaseScore(300);
      return true;
    } else {
      // JUMP FAILED
      console.log("Cube landed unsuccessfully");
      this.score.resetScore();
      return false;
    }
  }

  cubeReset() {
    this.cube.position = new BABYLON.Vector3(0, 1, 0);
    this.cube.rotation = new BABYLON.Vector3(0, 0, 0);
    this.isFlipping = false; // Reset flipping state
    this.isJumping = false; // Reset jumping state
  }

  cubeFlip() {
    let flipAnimation = new BABYLON.Animation(
      "flipAnimation",
      "rotation.x",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    let keyFrames = [];
    keyFrames.push({ frame: 0, value: this.cube.rotation.y });
    keyFrames.push({ frame: 120, value: this.cube.rotation.y + 2 * Math.PI });

    flipAnimation.setKeys(keyFrames);

    this.scene.beginDirectAnimation(
      this.cube,
      [flipAnimation],
      0,
      120,
      false,
      1,
      () => {
        this.score.increaseScore(100); // Increase score by 10 points
        this.isFlipping = false; // The flip is over, allow another flip
      }
    );
  }
}
