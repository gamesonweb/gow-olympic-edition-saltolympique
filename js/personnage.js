// personnage.js

export class Personnage {
  constructor(scene, score) {
    this.cube = null;
    this.isJumping = false;
    this.isFlipping = false;
    this.scene = scene;
    this.score = score;
    this.rotationX = 0;
    this.rotationY = 0;
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
        // this.scene.stopAnimation(this.cube); // Stop the flip animation
      }
      chargingBar.style.display = "none"; // Hide the charging bar
      chargingBar.dataset.charging = "false"; // Reset data attribute
      this.cubeReset(); // Reset the cube position
      this.score.endofJump(); // End of jump
    });
  }

  calculateJumpHeight(chargeAmount) {
    let jumpHeight = chargeAmount / 10;
    // Calculate jump height based on charge amount
    // The maximum jump height is 10 units
    return jumpHeight;
  }

  cubeLand() {
    // check if the cube is standing
    if (this.rotationX > -0.8 && this.rotationX < 0.8) {
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
    this.rotationX = 0;
    this.rotationY = 0;
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
        this.score.increaseScore(100); // Increase score by 100 points
        this.score.updateCurrentScore(); // Update current score display

        this.isFlipping = false; // The flip is over, allow another flip

        // Calculate screen position for the score text
        let screenPosition = BABYLON.Vector3.Project(
          this.cube.position,
          BABYLON.Matrix.Identity(),
          this.scene.getTransformMatrix(),
          this.scene.activeCamera.viewport.toGlobal(
            this.scene.getEngine().getRenderWidth(),
            this.scene.getEngine().getRenderHeight()
          )
        );
      }
    );
  }

  handleRotation(inputStates) {
    if (inputStates.left) {
      this.cube.rotate(BABYLON.Axis.Y, -0.05, BABYLON.Space.LOCAL);
      this.rotationY -= 0.05;
      if (Math.abs(this.rotationY) >= 2 * Math.PI) {
        this.fullTurnY();
      }
    }
    if (inputStates.right) {
      this.cube.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
      this.rotationY += 0.05;
      if (Math.abs(this.rotationY) >= 2 * Math.PI) {
        this.fullTurnY();
      }
    }
    if (inputStates.flipping) {
      this.rotationX += 0.1;
      this.cube.rotate(BABYLON.Axis.X, 0.1, BABYLON.Space.LOCAL);
      if (Math.abs(this.rotationX) >= 2 * Math.PI) {
        this.fullTurnX();
      }
    }
  }

  update(inputStates) {
    if (this.isJumping) {
      this.handleRotation(inputStates);
    }
  }

  fullTurnY() {
    console.log("Full turn");
    // Add 100 to the score
    this.score.increaseScore(100);
    // Update the current score display
    this.score.updateCurrentScore();
    // Reset the rotation
    this.rotationY = 0;
  }

  fullTurnX() {
    console.log("Full turn");
    // Add 200 to the score
    this.score.increaseScore(200);
    // Update the current score display
    this.score.updateCurrentScore();
    // Reset the rotation
    this.rotationX = 0;
  }
}
