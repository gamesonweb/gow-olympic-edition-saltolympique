export class Personage {
  constructor(scene) {
    this.cube = null;
    this.isJumping = false;
    this.isFlipping = false;
    this.scene = scene;
  }

  createCharacter() {
    // Create a cube
    this.cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, this.scene);
    this.cube.position.y = 0.5;

    // Create a material for the cube
    let material = new BABYLON.StandardMaterial("material", this.scene);
    material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1);
    this.cube.material = material;
    this.scene.camera.lockedTarget = this.cube; //version 2.5 onwards
  }

  cubeJump(height) {
    let animation = new BABYLON.Animation(
      "jumpAnimation",
      "position.y",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    let keys = [];
    keys.push({
      frame: 0,
      value: this.cube.position.y,
    });
    keys.push({
      frame: 20,
      value: this.cube.position.y + height,
    });
    keys.push({
      frame: 40,
      value: this.cube.position.y,
    });

    animation.setKeys(keys);
    this.cube.animations.push(animation);
    this.scene.beginAnimation(this.cube, 0, 40, false, 1, () => {
      // Animation finished callback
      this.isJumping = false; // Reset jumping state
      if (this.isFlipping) {
        this.scene.stopAnimation(this.cube); // Stop the flip animation
        this.isFlipping = false; // Reset flipping state
      }
      chargingBar.style.display = "none"; // Hide the charging bar
      chargingBar.dataset.charging = "false"; // Reset data attribute
    });
  }

  calculateJumpHeight(chargeDuration) {
    // Convert charge duration to a value between 0 and 1
    let chargeAmount = Math.min(chargeDuration / 100, 1);

    // Calculate jump height based on charge amount
    // The maximum jump height is 10 units
    let jumpHeight = chargeAmount * 10;

    return jumpHeight;
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

    keyFrames.push({
      frame: 0,
      value: this.cube.rotation.y,
    });

    keyFrames.push({
      frame: 120,
      value: this.cube.rotation.y + 2 * Math.PI,
    });

    flipAnimation.setKeys(keyFrames);

    // Utilisez beginDirectAnimation au lieu de beginAnimation
    this.scene.beginDirectAnimation(
      this.cube,
      [flipAnimation],
      0,
      120,
      false,
      1,
      () => {
        this.isFlipping = false; // The flip is over, allow another flip
      }
    );
  }
}
