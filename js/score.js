export class Score {
  constructor() {
    this.score = 0;
    this.highScore = 0;
  }

  increaseScore(points) {
    this.score += points;
    let scoreAnnoncementElement = document.getElementById("scoreAnnoncement");
    scoreAnnoncementElement.innerHTML = "+" + points;
    scoreAnnoncementElement.style.color = "green";
    scoreAnnoncementElement.style.fontFamily = "Arial";
    scoreAnnoncementElement.style.fontSize = "24px";
    scoreAnnoncementElement.style.fontWeight = "bold";
  }

  decreaseScore(points) {
    this.score -= points;
    let scoreAnnoncementElement = document.getElementById("scoreAnnoncement");
    scoreAnnoncementElement.innerHTML = "-" + points;
    scoreAnnoncementElement.style.color = "red";
    scoreAnnoncementElement.style.fontFamily = "Arial";
    scoreAnnoncementElement.style.fontSize = "24px";
    scoreAnnoncementElement.style.fontWeight = "bold";
  }

  resetScore() {
    this.score = 0;
    let scoreAnnoncementElement = document.getElementById("scoreAnnoncement");
    scoreAnnoncementElement.innerHTML = "Score Reset";
    scoreAnnoncementElement.style.color = "white";
    scoreAnnoncementElement.style.fontFamily = "Arial";
    scoreAnnoncementElement.style.fontSize = "24px";
    scoreAnnoncementElement.style.fontWeight = "bold";
  }

  getScore() {
    return this.score;
  }

  setHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
  }

  createScoreAnnoncement() {
    let scoreAnnoncementElement = document.createElement("div");
    scoreAnnoncementElement.id = "scoreAnnoncement";
    scoreAnnoncementElement.style.position = "absolute";
    scoreAnnoncementElement.style.top = "200px";
    scoreAnnoncementElement.style.left = "10px";
    scoreAnnoncementElement.style.color = "blue";
    scoreAnnoncementElement.style.fontFamily = "Arial";
    scoreAnnoncementElement.style.fontSize = "24px";
    scoreAnnoncementElement.style.fontWeight = "bold";
    scoreAnnoncementElement.style.textShadow = "2px 2px 4px #000000";
    document.body.appendChild(scoreAnnoncementElement);
    return scoreAnnoncementElement;
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
    if (currentScoreElement) {
      currentScoreElement.innerHTML = "Current Score: " + this.score;
    } else {
      console.error(
        "Element with ID 'currentScore' not found in the document."
      );
    }
  }

  ScoreDisplays() {
    this.createScoreAnnoncement();
    this.displayHighScore();
    this.displayCurrentScore();
  }
}
