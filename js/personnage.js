import { loadGrannyModel, playAnimation, stopAnimation } from './granny.js';

export class Personnage {
  constructor(scene, score, characterFile) {
    this.characterFile = characterFile;
    this.character = null;
    this.isJumping = false;
    this.isFlipping = false;
    this.scene = scene;
    this.score = score;
    this.rotationX = 0;
    this.rotationY = 0;
    this.jumpAnim = null;
    this.landAnim = null;
    this.flipAnim = null;
  }

  createCharacter(callback) {
    loadGrannyModel(this.scene, this.characterFile, (grannyMesh, animations) => {
      if (grannyMesh) {
        this.character = grannyMesh;
        this.character.position = new BABYLON.Vector3(0, 1.51, 0); // Position on the trampoline
        this.character.scaling = new BABYLON.Vector3(20, 20, 20);
        this.jumpAnim = animations.jumpAnim;
        this.landAnim = animations.landAnim;
        this.flipAnim = animations.flipAnim;
        if (callback) callback(this.character);
      } else {
        console.error("Character mesh not found.");
      }
    });
  }

  characterJump(height, chargingBar) {
    if (!this.character) {
      console.error("Error: Character mesh not loaded.");
      return;
    }

    let animation = new BABYLON.Animation(
        "jumpAnimation",
        "position.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    let keys = [
      { frame: 0, value: this.character.position.y },
      { frame: 20, value: this.character.position.y + height },
      { frame: 40, value: this.character.position.y }
    ];

    animation.setKeys(keys);
    this.character.animations.push(animation);
    this.scene.beginAnimation(this.character, 0, 40, false, 1, () => {
      this.characterLand();
      this.isJumping = false;
      chargingBar.style.display = "none";
      chargingBar.dataset.charging = "false";
      this.characterReset();
      this.score.endofJump();
    });

    playAnimation(this.jumpAnim); // Play the jump animation
  }

  calculateJumpHeight(chargeAmount) {
    let jumpHeight = chargeAmount / 10;
    return jumpHeight;
  }

  characterLand() {
    if (!this.character) {
      console.error("Error: Character mesh not loaded.");
      return false;
    }

    playAnimation(this.landAnim);

    if (this.rotationX > -0.8 && this.rotationX < 0.8) {
      console.log("Character landed successfully");
      this.score.increaseScore(300);
      this.showFeedbackText("Successful Landing!", "green");
      return true;
    } else {
      console.log("Character landed unsuccessfully");
      this.score.resetScore();
      this.showFeedbackText("Failed Landing!", "red");
      return false;
    }
  }

  characterReset() {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    this.character.position = new BABYLON.Vector3(0, 1.51, 0); // Reset position on the trampoline
    this.character.rotation = new BABYLON.Vector3(0, 0, 0);
    this.isFlipping = false;
    this.isJumping = false;
    this.rotationX = 0;
    this.rotationY = 0;
  }

  characterFlip() {
    if (!this.character) {
      console.error("Error: Character mesh not loaded.");
      return;
    }

    if (!this.isFlipping) {
      playAnimation(this.flipAnim);
      this.isFlipping = true;

      // Ensure the flip animation continues while the 'F' key is pressed
      let flipCheckInterval = setInterval(() => {
        if (!this.isFlipping) {
          clearInterval(flipCheckInterval);
          playAnimation(this.landAnim);
        } else {
          playAnimation(this.flipAnim);
        }
      }, this.flipAnim.to - this.flipAnim.from);

    }
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
      if (inputStates.flipping) {
        this.characterFlip();
      } else if (this.isFlipping) {
        this.isFlipping = false;
        stopAnimation(this.flipAnim);
        playAnimation(this.landAnim);
      }
    }
  }

  fullTurnY() {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    console.log("Full turn");
    this.score.increaseScore(100);
    this.score.updateCurrentScore();
    this.rotationY = 0;
  }

  fullTurnX() {
    if (!this.character) {
      console.error("Character mesh not loaded.");
      return;
    }

    console.log("Full turn");
    this.score.increaseScore(200);
    this.score.updateCurrentScore();
    this.rotationX = 0;
  }

  showFeedbackText(message, color) {
    let feedbackText = document.createElement("div");
    feedbackText.className = "feedbackText";
    feedbackText.innerHTML = message;
    feedbackText.style.position = "absolute";
    feedbackText.style.color = color;
    feedbackText.style.fontSize = "24px";
    feedbackText.style.fontWeight = "bold";
    feedbackText.style.textShadow = "2px 2px 4px #000000";
    feedbackText.style.left = "50%";
    feedbackText.style.top = "20%";
    feedbackText.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(feedbackText);

    setTimeout(() => {
      feedbackText.style.opacity = 0;
      setTimeout(() => {
        document.body.removeChild(feedbackText);
      }, 1000);
    }, 1000);
  }

  reset() {
    this.characterReset();
  }
}
