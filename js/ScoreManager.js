export class ScoreManager {
    constructor() {
        this.scores = this.loadScores() || [];
    }

    addScore(name, score) {
        this.scores.push({ name, score });
        this.scores.sort((a, b) => b.score - a.score); // Sort scores in descending order
        this.scores = this.scores.slice(0, 5); // Keep only top 5 scores
        this.saveScores();
    }

    getBestScore() {
        return this.scores.length > 0 ? this.scores[0].score : 0;
    }

    displayLeaderboard() {
        const leaderboard = document.createElement("div");
        leaderboard.id = "leaderboard";
        leaderboard.style.position = "absolute";
        leaderboard.style.top = "10px";
        leaderboard.style.right = "10px";
        leaderboard.style.color = "white";
        leaderboard.style.padding = "10px";
        leaderboard.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        leaderboard.style.borderRadius = "10px";
        leaderboard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

        const title = document.createElement("h2");
        title.innerText = "Leaderboard";
        leaderboard.appendChild(title);

        const list = document.createElement("ol");
        this.scores.forEach(score => {
            const item = document.createElement("li");
            item.innerText = `${score.name}: ${score.score}`;
            if (score.score === this.getBestScore()) {
                item.style.color = "red"; // Highlight the best score
            }
            list.appendChild(item);
        });
        leaderboard.appendChild(list);

        document.body.appendChild(leaderboard);
    }

    saveScores() {
        localStorage.setItem("scores", JSON.stringify(this.scores));
    }

    loadScores() {
        return JSON.parse(localStorage.getItem("scores"));
    }
}
