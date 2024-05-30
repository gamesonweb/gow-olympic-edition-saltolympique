import {
  loadolympianModel,
  loadAnimations,
  playNextAnimation,
} from "./Olympian.js";

export class Personnage {
  constructor(scene, score) {
    this.character = null;
    this.isJumping = false;
    this.isFlipping = false;
    this.scene = scene;
    this.score = score;
    this.rotationX = 0;
    this.rotationY = 0;
  }

  createCharacter(callback) {
    loadolympianModel(this.scene, (olympianMesh) => {
      if (olympianMesh) {
        this.character = olympianMesh;
        this.character.position = new BABYLON.Vector3(0, 0, 0);
        this.character.scaling = new BABYLON.Vector3(200, 200, 200);
        loadAnimations(this.scene);
        if (callback) callback(this.character);
      } else {
        console.error("Character mesh not found.");
      }
    });
  }

  characterJump(height) {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    let animation = new BABYLON.Animation(
      "jumpAnimation",
      "position.y",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    let keys = [];
    keys.push({ frame: 0, value: this.character.position.y });
    keys.push({ frame: 20, value: this.character.position.y + height });
    keys.push({ frame: 40, value: this.character.position.y });

    animation.setKeys(keys);
    this.character.animations.push(animation);
    this.scene.beginAnimation(this.character, 0, 40, false, 1, () => {
      // Animation finished callback
      this.characterLand(); // Check if the character landed
      this.isJumping = false; // Reset jumping state
      if (this.isFlipping) {
        // this.scene.stopAnimation(this.character); // Stop the flip animation
      }
      chargingBar.style.display = "none"; // Hide the charging bar
      chargingBar.dataset.charging = "false"; // Reset data attribute
      this.characterReset(); // Reset the character position
      this.score.endofJump(); // End of jump
    });
  }

  calculateJumpHeight(chargeAmount) {
    let jumpHeight = chargeAmount / 10;
    // Calculate jump height based on charge amount
    // The maximum jump height is 10 units
    return jumpHeight;
  }

  characterLand() {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return false;
    }

    // check if the character is standing
    if (this.rotationX > -0.8 && this.rotationX < 0.8) {
      console.log("Character landed successfully");
      this.score.increaseScore(300);
      return true;
    } else {
      // JUMP FAILED
      console.log("Character landed unsuccessfully");
      this.score.resetScore();
      return false;
    }
  }

  characterReset() {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    this.character.position = new BABYLON.Vector3(0, 0, 0);
    this.character.rotation = new BABYLON.Vector3(0, 0, 0);
    this.isFlipping = false; // Reset flipping state
    this.isJumping = false; // Reset jumping state
    this.rotationX = 0;
    this.rotationY = 0;
  }

  characterFlip() {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    let flipAnimation = new BABYLON.Animation(
      "flipAnimation",
      "rotation.x",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    let keyFrames = [];
    keyFrames.push({ frame: 0, value: this.character.rotation.y });
    keyFrames.push({
      frame: 120,
      value: this.character.rotation.y + 2 * Math.PI,
    });

    flipAnimation.setKeys(keyFrames);

    this.scene.beginDirectAnimation(
      this.character,
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
          this.character.position,
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
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    if (inputStates.left) {
      this.character.rotate(BABYLON.Axis.Y, -0.05, BABYLON.Space.LOCAL);
      this.rotationY -= 0.05;
      if (Math.abs(this.rotationY) >= 2 * Math.PI) {
        this.fullTurnY();
      }
    }
    if (inputStates.right) {
      this.character.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
      this.rotationY += 0.05;
      if (Math.abs(this.rotationY) >= 2 * Math.PI) {
        this.fullTurnY();
      }
    }
    if (inputStates.flipping) {
      this.rotationX += 0.1;
      this.character.rotate(BABYLON.Axis.X, 0.1, BABYLON.Space.LOCAL);
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
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    console.log("Full turn");
    // Add 100 to the score
    this.score.increaseScore(100);
    // Update the current score display
    this.score.updateCurrentScore();
    // Reset the rotation
    this.rotationY = 0;
  }

  fullTurnX() {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    console.log("Full turn");
    // Add 200 to the score
    this.score.increaseScore(200);
    // Update the current score display
    this.score.updateCurrentScore();
    // Reset the rotation
    this.rotationX = 0;
  }
}
