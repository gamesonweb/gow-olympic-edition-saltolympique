const MAX_LEADERBOARD_ENTRIES = 5;

export class ScoreManager {
    constructor() {
        this.scores = this.loadScores();
    }

    loadScores() {
        const savedScores = localStorage.getItem('scores');
        return savedScores ? JSON.parse(savedScores) : [];
    }

    saveScores() {
        localStorage.setItem('scores', JSON.stringify(this.scores));
    }

    addScore(name, score) {
        this.scores.push({ name, score });
        this.scores.sort((a, b) => b.score - a.score); // Sort by score in descending order
        if (this.scores.length > MAX_LEADERBOARD_ENTRIES) {
            this.scores.pop(); // Remove the lowest score if we have more than the maximum entries
        }
        this.saveScores();
    }

    getTopScores() {
        return this.scores.slice(0, MAX_LEADERBOARD_ENTRIES);
    }

    displayLeaderboard() {
        const leaderboard = document.createElement('div');
        leaderboard.id = 'Classement Joueurs';
        leaderboard.style.position = 'absolute';
        leaderboard.style.top = '10px';
        leaderboard.style.right = '10px';
        leaderboard.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        leaderboard.style.color = 'white';
        leaderboard.style.padding = '10px';
        leaderboard.style.borderRadius = '5px';

        const title = document.createElement('h2');
        title.innerText = 'Leaderboard';
        leaderboard.appendChild(title);

        const list = document.createElement('ol');
        this.getTopScores().forEach(entry => {
            const listItem = document.createElement('li');
            listItem.innerText = `${entry.name}: ${entry.score}`;
            list.appendChild(listItem);
        });
        leaderboard.appendChild(list);

        document.body.appendChild(leaderboard);
    }
}
