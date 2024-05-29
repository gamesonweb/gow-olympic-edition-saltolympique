export class Score {
  constructor() {
    this.score = 0;
    this.highScore = 0;
  }

  increaseScore(points) {
    this.score += points;
    this.showScoreText("+" + points);
  }

  decreaseScore(points) {
    this.score -= points;
    this.showScoreText("-" + point);
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
    this.updateHighScore();
  }

  displayHighScore() {
    console.log("High Score: " + this.highScore);
    let highScoreElement = document.createElement("div");
    highScoreElement.id = "highScore";
    highScoreElement.className = "highScore"; // Add the class name
    highScoreElement.innerHTML =
      "<span data-text='High Score: " +
      this.highScore +
      "'>High Score: " +
      this.highScore +
      "</span>";
    highScoreElement.style.position = "absolute";
    highScoreElement.style.bottom = "10px";
    highScoreElement.style.right = "10px";
    highScoreElement.style.color = "white";
    highScoreElement.style.fontFamily = "Arial";
    highScoreElement.style.fontSize = "40px";
    highScoreElement.style.fontWeight = "bold";
    highScoreElement.style.textShadow = "2px 2px 4px #000000";
    document.body.appendChild(highScoreElement);
    return highScoreElement;
  }
  displayCurrentScore() {
    let currentScoreElement = document.createElement("div");
    currentScoreElement.id = "currentScore";
    currentScoreElement.className = "currentScore"; // Add the class name
    currentScoreElement.innerHTML =
      "<span data-text='Current Score: " +
      this.score +
      "'>Current Score: " +
      this.score +
      "</span>";
    currentScoreElement.style.position = "absolute";
    currentScoreElement.style.top = "10px";
    currentScoreElement.style.left = "10px";
    currentScoreElement.style.color = "white";
    currentScoreElement.style.fontFamily = "Arial";
    currentScoreElement.style.fontSize = "40px";
    currentScoreElement.style.fontWeight = "bold";
    currentScoreElement.style.textShadow = "2px 2px 4px #000000";
    document.body.appendChild(currentScoreElement);
    return currentScoreElement;
  }
  updateHighScore() {
    let highScoreElement = document.getElementById("highScore");
    highScoreElement.innerHTML =
      "<span data-text='High Score: " +
      this.highScore +
      "'>High Score: " +
      this.highScore +
      "</span>";
  }
  updateCurrentScore() {
    let currentScoreElement = document.getElementById("currentScore");
    currentScoreElement.innerHTML =
      "<span data-text='Current Score: " +
      this.score +
      "'>Current Score: " +
      this.score +
      "</span>";
  }

  ScoreDisplays() {
    this.displayHighScore();
    this.displayCurrentScore();
  }
  showScoreText(text) {
    let scoreText = document.createElement("div");
    scoreText.className = "scoreText";
    scoreText.innerHTML = text;
    scoreText.style.position = "absolute";
    scoreText.style.color = "yellow";
    scoreText.style.fontSize = "24px";
    scoreText.style.fontWeight = "bold";
    scoreText.style.textShadow = "2px 2px 4px #000000";
    scoreText.style.left = 310 + "px";
    scoreText.style.top = 300 + "px";
    document.body.appendChild(scoreText);

    // Animate the text
    setTimeout(() => {
      scoreText.style.opacity = 0;
      scoreText.style.top = 300 - 50 + "px"; // Move up
      setTimeout(() => {
        document.body.removeChild(scoreText);
      }, 1000);
    }, 1000);
  }
}
