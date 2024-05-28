export class Score {
  constructor() {
    this.score = 0;
    this.highScore = 0;
  }

  increaseScore(points) {
    this.score += points;
  }

  decreaseScore(points) {
    this.score -= points;
  }

  resetScore() {
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  setHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
  }

  displayHighScore() {
    console.log("High Score: " + this.highScore);
    let highScoreElement = document.createElement("div");
    highScoreElement.id = "highScore";
    highScoreElement.innerHTML = "High Score: " + this.highScore;
    highScoreElement.style.position = "absolute";
    highScoreElement.style.top = "10px";
    highScoreElement.style.right = "10px";
    highScoreElement.style.color = "white";
    highScoreElement.style.fontFamily = "Arial";
    highScoreElement.style.fontSize = "24px";
    highScoreElement.style.fontWeight = "bold";
    highScoreElement.style.textShadow = "2px 2px 4px #000000";
    document.body.appendChild(highScoreElement);
    return highScoreElement;
  }
  displayCurrentScore() {
    let currentScoreElement = document.createElement("div");
    currentScoreElement.id = "currentScore";
    currentScoreElement.innerHTML = "Current Score: " + this.score;
    currentScoreElement.style.position = "absolute";
    currentScoreElement.style.top = "10px";
    currentScoreElement.style.left = "10px";
    currentScoreElement.style.color = "white";
    currentScoreElement.style.fontFamily = "Arial";
    currentScoreElement.style.fontSize = "24px";
    currentScoreElement.style.fontWeight = "bold";
    currentScoreElement.style.textShadow = "2px 2px 4px #000000";
    document.body.appendChild(currentScoreElement);
    return currentScoreElement;
  }
  updateHighScore() {
    let highScoreElement = document.getElementById("highScore");
    highScoreElement.innerHTML = "High Score: " + this.highScore;
  }
  updateCurrentScore() {
    let currentScoreElement = document.getElementById("currentScore");
    if (currentScoreElement) {
      currentScoreElement.innerHTML = "Current Score: " + this.score;
    } else {
      console.error("Element with ID 'currentScore' not found in the document.");
    }
  }
  
}
