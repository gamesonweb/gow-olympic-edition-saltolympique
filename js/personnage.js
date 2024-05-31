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
    this.flipAnim = null; // Add flipAnim to store the flip animation
    this.jumpAnim = null; // Add jumpAnim to store the jump animation
    this.poseAnim = null; // Add poseAnim to store the pose animation
  }

  createCharacter(callback) {
    loadolympianModel(this.scene, (olympianMesh, animations) => {
      if (olympianMesh) {
        this.character = olympianMesh;
        this.character.position = new BABYLON.Vector3(0, 0, 0);
        this.character.rotation = new BABYLON.Vector3(0, 0, 0);
        this.character.scaling = new BABYLON.Vector3(700, 700, 700);
        this.jumpAnim = animations.jumpAnim; // Assign jumpAnim from the loaded animations
        this.flipAnim = animations.flipAnim; // Assign flipAnim from the loaded animations
        this.poseAnim = animations.poseAnim; // Assign poseAnim from the loaded animations
        loadAnimations(this.scene);
        if (this.poseAnim) {
          this.poseAnim.start(true, 1.0, this.poseAnim.from, this.poseAnim.to, false);
        }
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
    if (this.poseAnim) {
      this.poseAnim.start(true, 1.0, this.poseAnim.from, this.poseAnim.to, false);
    }
    let jumpDuration = height * 2; // Augmenter la durée du saut en fonction de la hauteur

    let animation = new BABYLON.Animation(
        "jumpAnimation",
        "position.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    let keys = [];
    keys.push({ frame: 0, value: this.character.position.y });
    keys.push({ frame: jumpDuration *0.5, value: this.character.position.y + height });
    keys.push({ frame: jumpDuration, value: this.character.position.y });

    animation.setKeys(keys);
    this.character.animations.push(animation);
    this.scene.beginAnimation(this.character, 0, jumpDuration, false, 1, () => {
      // Animation finished callback
      this.characterLand(); // Check if the character landed
      this.isJumping = false; // Reset jumping state
      this.characterReset(); // Reset the character position
      this.score.endofJump(); // End of jump
    });
    if (this.jumpAnim) {
      this.jumpAnim.start(true, 1.0, this.jumpAnim.from, this.jumpAnim.to, false);
    }
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
    if (this.rotationX > -0.7 && this.rotationX < 0.7) {
      console.log("Character landed successfully");
      this.score.increaseScore(50);
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
    this.character.rotation = new BABYLON.Vector3(0,116, 0);
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

    if (this.flipAnim) {
      this.flipAnim.start(true, 1.0, this.flipAnim.from, this.flipAnim.to, false);
    } else {
      console.error("Flip animation not found.");
    }
  }

  handleRotation(inputStates) {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    if (inputStates.left) {
      this.character.rotate(BABYLON.Axis.Y, -0.1, BABYLON.Space.LOCAL);
      this.rotationY -= 0.1;
      if (Math.abs(this.rotationY) >= 2 * Math.PI) {
        this.fullTurnY();
      }
    }
    if (inputStates.right) {
      this.character.rotate(BABYLON.Axis.Y, 0.1, BABYLON.Space.LOCAL);
      this.rotationY += 0.1;
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
    if(inputStates.twistingLeft) {
      console.log("TwistiJOEFEng");
      this.rotationX += 0.1;
      this.rotationY -= 0.1;
      this.character.rotate(BABYLON.Axis.X, 0.1, BABYLON.Space.LOCAL);
      this.character.rotate(BABYLON.Axis.Y, -0.1, BABYLON.Space.LOCAL);
      if (Math.abs(this.rotationX) >= 2 * Math.PI || Math.abs(this.rotationY) >= 2 * Math.PI){
        this.fullTurnXandY();
      }
    }
    if (inputStates.twistingRigth) {
      console.log("TwistSQFNNSFing");
      this.rotationX += 0.1;
      this.rotationY += 0.1;
      this.character.rotate(BABYLON.Axis.X, 0.1, BABYLON.Space.LOCAL);
      this.character.rotate(BABYLON.Axis.Y, 0.1, BABYLON.Space.LOCAL);
      if (Math.abs(this.rotationX) >= 2 * Math.PI || Math.abs(this.rotationY) >= 2 * Math.PI) {
        this.fullTurnXandY();
      }}
      if(inputStates.frontflipping){
        this.rotationX -= 0.1;
        this.character.rotate(BABYLON.Axis.X, -0.1, BABYLON.Space.LOCAL);
        if (Math.abs(this.rotationX) >= 2 * Math.PI) {
          this.fullTurnX();
        }}
        if(inputStates.fronttwistingRigth){
          this.rotationX -= 0.1;
          this.rotationY += 0.1;
          this.character.rotate(BABYLON.Axis.X, -0.1, BABYLON.Space.LOCAL);
          this.character.rotate(BABYLON.Axis.Y, 0.1, BABYLON.Space.LOCAL);
          if (Math.abs(this.rotationX) >= 2 * Math.PI || Math.abs(this.rotationY) >= 2 * Math.PI) {
            this.fullTurnXandY();
          }
        }
        if(inputStates.fronttwistingLeft){
          console.log("FONTFing");
          this.rotationX -= 0.1;
          this.rotationY -= 0.1;
          this.character.rotate(BABYLON.Axis.X, -0.1, BABYLON.Space.LOCAL);
          this.character.rotate(BABYLON.Axis.Y, -0.1, BABYLON.Space.LOCAL);
          if (Math.abs(this.rotationX) >= 2 * Math.PI || Math.abs(this.rotationY) >= 2 * Math.PI) {
            this.fullTurnXandY();
          }
        }


      
  }

  update(inputStates) {
    if (this.isJumping) {
      this.handleRotation(inputStates);
      if (inputStates.flipping && !this.isFlipping) {
        this.isFlipping = true;
        this.characterFlip();
      } else if (!inputStates.flipping && this.isFlipping) {
        this.isFlipping = false;
      }
    }
  }

  fullTurnY() {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    console.log("Full turn");
    // Add 100 to the score
    this.score.increaseScore(150);
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
  fullTurnXandY() {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }
    console.log("TWISTANCE");
    // Add 300 to the score
    this.score.increaseScore(500);
    // Update the current score display
    this.score.updateCurrentScore();
    // Reset the rotation
    this.rotationX = 0;
    this.rotationY = 0;
  }
}
