export class Score {
  constructor() {
    this.score = 0;
    this.scoreStreak = 0;
    this.finalScore = 0;
  }

  increaseScore(points) {
    this.score += points;
    this.showScoreText("+" + points);
    this.updateCurrentScore();
  }

  decreaseScore(points) {
    this.score -= points; // Corrected 'point' to 'points'
    this.showScoreText("-" + points);
    this.updateCurrentScore();
  }

  resetScore() {
    this.score = 0;
    this.updateCurrentScore();
  }

  getScore() {
    return this.score;
  }

  setFinalScore() {
    this.finalScore = this.scoreStreak;
  }

  getHighScore() {
    return this.highScore;
  }

  displayscoreStreak() {
    console.log("Score Streak: " + this.scoreStreak);
    let scoreStreakElement = document.createElement("div");
    scoreStreakElement.id = "scoreStreak";
    scoreStreakElement.className = "scoreStreak"; // Add the class name
    scoreStreakElement.innerHTML =
        "<span data-text='Score Streak: " +
        this.scoreStreak +
        "'>Score Streak: " +
        this.scoreStreak +
        "</span>";
    scoreStreakElement.style.position = "absolute";
    scoreStreakElement.style.bottom = "10px";
    scoreStreakElement.style.right = "10px";
    scoreStreakElement.style.color = "white";
    scoreStreakElement.style.fontFamily = "Arial";
    scoreStreakElement.style.fontSize = "40px";
    scoreStreakElement.style.fontWeight = "bold";
    scoreStreakElement.style.textShadow = "2px 2px 4px #000000";
    document.body.appendChild(scoreStreakElement);
    return scoreStreakElement;
  }
  displayCurrentScore() {
    let currentScoreElement = document.createElement("div");
    currentScoreElement.id = "currentScore";
    currentScoreElement.className = "currentScore"; // Add the class name
    currentScoreElement.innerHTML =
        "<span data-text='Current Jump Score: " +
        this.score +
        "'>Current Jump Score: " +
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
  updatescoreStreak() {
    let scoreStreakElement = document.getElementById("scoreStreak");
    scoreStreakElement.innerHTML =
        "<span data-text='Score Streak: " +
        this.scoreStreak +
        "'>Score Streak: " +
        this.scoreStreak +
        "</span>";
  }
  updateCurrentScore() {
    let currentScoreElement = document.getElementById("currentScore");
    currentScoreElement.innerHTML =
        "<span data-text='Current Jump Score: " +
        this.score +
        "'>Current Jump Score: " +
        this.score +
        "</span>";
  }

  ScoreDisplays() {
    this.displayscoreStreak();
    this.displayCurrentScore();
  }

  endofJump() {
    //add to the score streak
    this.scoreStreak += this.score;
    // reset the current jump score
    this.score = 0;
    this.updateCurrentScore();
    this.updatescoreStreak();
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
