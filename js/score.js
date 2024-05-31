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
    this.score -= points;
    this.showScoreText("-" + points);
    this.updateCurrentScore();
  }

  resetScore() {
    this.score = 0;
    this.updateCurrentScore();
  }

  resetHighScore() {
    this.scoreStreak = 0;
    this.updatescoreStreak();
  }

  getScore() {
    return this.score;
  }

  setFinalScore() {
    this.finalScore = this.scoreStreak;
  }

  getHighScore() {
    return this.scoreStreak;
  }

  displayscoreStreak() {
    let scoreStreakElement = document.getElementById("scoreStreak");
    if (!scoreStreakElement) {
      scoreStreakElement = document.createElement("div");
      scoreStreakElement.id = "scoreStreak";
      scoreStreakElement.className = "scoreStreak";
      scoreStreakElement.style.position = "absolute";
      scoreStreakElement.style.bottom = "10px";
      scoreStreakElement.style.right = "10px";
      scoreStreakElement.style.color = "white";
      scoreStreakElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      scoreStreakElement.style.padding = "10px";
      scoreStreakElement.style.borderRadius = "5px";
      scoreStreakElement.style.fontFamily = "Arial";
      scoreStreakElement.style.fontSize = "40px";
      scoreStreakElement.style.fontWeight = "bold";
      scoreStreakElement.style.textShadow = "2px 2px 4px #000000";
      document.body.appendChild(scoreStreakElement);
    }
    scoreStreakElement.innerHTML = "<span data-text='Score Streak: " + this.scoreStreak + "'>Score Streak: " + this.scoreStreak + "</span>";
  }

  displayCurrentScore() {
    let currentScoreElement = document.getElementById("currentScore");
    if (!currentScoreElement) {
      currentScoreElement = document.createElement("div");
      currentScoreElement.id = "currentScore";
      currentScoreElement.className = "currentScore";
      currentScoreElement.style.position = "absolute";
      currentScoreElement.style.top = "10px";
      currentScoreElement.style.left = "10px";
      currentScoreElement.style.color = "white";
      currentScoreElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      currentScoreElement.style.padding = "10px";
      currentScoreElement.style.borderRadius = "5px";
      currentScoreElement.style.fontFamily = "Arial";
      currentScoreElement.style.fontSize = "40px";
      currentScoreElement.style.fontWeight = "bold";
      currentScoreElement.style.textShadow = "2px 2px 4px #000000";
      document.body.appendChild(currentScoreElement);
    }
    this.updateCurrentScore(); // Update content after adding to DOM
  }

  updatescoreStreak() {
    let scoreStreakElement = document.getElementById("scoreStreak");
    if (scoreStreakElement) {
      scoreStreakElement.innerHTML = "<span data-text='Score Streak: " + this.scoreStreak + "'>Score Streak: " + this.scoreStreak + "</span>";
    }
  }

  updateCurrentScore() {
    let currentScoreElement = document.getElementById("currentScore");
    if (currentScoreElement) {
      currentScoreElement.innerHTML = "<span data-text='Current Jump Score: " + this.score + "'>Current Jump Score: " + this.score + "</span>";
    }
  }

  ScoreDisplays() {
    this.displayscoreStreak();
    this.displayCurrentScore();
  }

  removeScoreDisplays() {
    let scoreStreakElement = document.getElementById("scoreStreak");
    let currentScoreElement = document.getElementById("currentScore");
    if (scoreStreakElement) {
      scoreStreakElement.remove();
    }
    if (currentScoreElement) {
      currentScoreElement.remove();
    }
  }

  endofJump() {
    this.scoreStreak += this.score;
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
    scoreText.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    scoreText.style.padding = "5px";
    scoreText.style.borderRadius = "5px";

    let verticalOffset = document.querySelectorAll('.scoreText').length * 50;
    let horizontalOffset = Math.random() * 200 - 50;
    scoreText.style.left = horizontalOffset + 100 + "px";
    scoreText.style.top = 300 + verticalOffset + "px";
    document.body.appendChild(scoreText);

    setTimeout(() => {
      scoreText.style.opacity = 0;
      scoreText.style.top = 300 + verticalOffset - 50 + "px";
      setTimeout(() => {
        document.body.removeChild(scoreText);
      }, 1000);
    }, 1000);
  }
}
