export class Score {
  constructor() {
    this.score = 0;
    this.highScore = 0;
  }

  increaseScore(points) {
    this.score += points;
    let highScoreElement = document.getElementById("scoreAnnoncement");
    highScoreElement.innerHTML = "+" + points;
    highScoreElement.style.color = "green";
    highScoreElement.style.fontFamily = "Arial";
    highScoreElement.style.fontSize = "24px";
    highScoreElement.style.fontWeight = "bold";
  }

  decreaseScore(points) {
    this.score -= points;
    let highScoreElement = document.getElementById("scoreAnnoncement");
    highScoreElement.innerHTML = "-" + points;
    highScoreElement.style.color = "red";
    highScoreElement.style.fontFamily = "Arial";
    highScoreElement.style.fontSize = "24px";
    highScoreElement.style.fontWeight = "bold";
  }

  resetScore() {
    this.score = 0;
    let highScoreElement = document.getElementById("scoreAnnoncement");
    highScoreElement.innerHTML = "Score Reset";
    highScoreElement.style.color = "white";
    highScoreElement.style.fontFamily = "Arial";
    highScoreElement.style.fontSize = "24px";
    highScoreElement.style.fontWeight = "bold";
  }

  getScore() {
    return this.score;
  }

  setHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
  }

  createDynamicScore() {
    let scoreElement = document.createElement("div");
    scoreElement.id = "score";
    scoreElement.innerHTML = "Score: " + this.score;
    scoreElement.style.position = "absolute";
    scoreElement.style.top = "200px";
    scoreElement.style.left = "10px";
    scoreElement.style.color = "blue";
    scoreElement.style.fontFamily = "Arial";
    scoreElement.style.fontSize = "24px";
    scoreElement.style.fontWeight = "bold";
    scoreElement.style.textShadow = "2px 2px 4px #000000";
    document.body.appendChild(scoreElement);
    return scoreElement;
  }

  createScoreAnnoncement() {
    let scoreAnnoncement = document.createElement("div");
    scoreAnnoncement.id = "scoreAnnoncement";
    scoreElement.style.position = "absolute";
    scoreElement.style.top = "100px";
    scoreElement.style.left = "10px";
    scoreElement.style.color = "blue";
    scoreElement.style.fontFamily = "Arial";
    scoreElement.style.fontSize = "24px";
    scoreElement.style.fontWeight = "bold";
    scoreElement.style.textShadow = "2px 2px 4px #000000";
    document.body.appendChild(scoreElement);
    return scoreElement;
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

  updateHighScore() {
    let highScoreElement = document.getElementById("highScore");
    highScoreElement.innerHTML = "High Score: " + this.highScore;
  }

  updateScore() {
    let scoreElement = document.getElementById("score");
    scoreElement.innerHTML = "Score: " + this.score;
  }
}
