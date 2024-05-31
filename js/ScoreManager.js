export class ScoreManager {
    constructor() {
        this.scores = [];
        this.loadScores();
    }

    async addScore(name, score) {
        try {
            const response = await fetch('https://gow-olympic-edition-saltolympique.onrender.com/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, score })
            });

            // score updated



            const newScore = await response.json();
            this.scores.push(newScore);
            this.scores.sort((a, b) => b.score - a.score);
            this.scores = this.scores.slice(0, 5);
            this.displayLeaderboard();
        } catch (error) {
            console.error('Error adding score:', error);
        }
    }

    async loadScores() {
        try {
            const response = await fetch('https://gow-olympic-edition-saltolympique.onrender.com/scores');
            this.scores = await response.json();
            this.displayLeaderboard();
        } catch (error) {
            console.error('Error loading scores:', error);
        }
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
        title.innerText = "Classement des joueurs";
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
}
