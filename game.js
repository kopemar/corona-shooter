const restartButton = document.getElementById("restart");
const gameOverBox = document.getElementById("game_over_box");
const playground = document.getElementById("playground");
const scoreField = document.getElementById("score");
const missedField = document.getElementById("viruses_missed");
const eliminatedField = document.getElementById("viruses_eliminated");
const scoreIndicator = document.getElementById("score_indicator");

class Game {

    constructor() {
        this.score = 0;
        this.opponent = 300;
        scoreIndicator.style.width = `${this.opponent}px`;
        this.missed = 0;
        this.eliminated = 0;
    }

    start() {
        this.run();
        this.showNewVirus();
    }

    automaticallyAdd() {
        if (game.opponent <= 600) {
            game.addScore(-1);
        }
        else {
            gameOverBox.style.visibility = 'visible';
            clearInterval(this.interval)
        }
    }

    run() {
        this.interval = setInterval(() => {
            this.automaticallyAdd();
        }, 350);
    }

    showNewVirus() {
        let virus = document.createElement('div');
        virus.classList.add("virus");
        virus.style.top = `${Game.getRandomNumber(323)}px`;
        virus.style.right = `${Game.getRandomNumber(518)}px`;
        playground.appendChild(virus);

        let timeout = setTimeout(() => {
            this.onVirusMissed(virus);
        }, 1000);

        virus.addEventListener('click', () => {
                this.onVirusEliminated(virus);
                clearTimeout(timeout);
            }
        );

        this.newVirusTimeout = setTimeout(() => {
            this.showNewVirus()
        }, 2000)
    }

    onVirusMissed(virus) {
        this.addScore(-20);
        playground.removeChild(virus);
        this.missed++;
        missedField.innerText = this.missed;
    }

    onVirusEliminated(virus) {
        this.addScore(30);
        playground.removeChild(virus);
        this.eliminated++;
        eliminatedField.innerText = this.eliminated;
    }

    addScore(amount) {
        this.score += amount;
        this.opponent -= amount;
        scoreField.innerText = this.score;
        scoreIndicator.style.width = `${this.opponent}px`;
        if (this.opponent <= 0) {
            clearInterval(this.interval);
            clearTimeout(this.newVirusTimeout);
            scoreIndicator.style.width = '0px';
            alert("You won!");
        }
    }

    static getRandomNumber(ceil) {
        return Math.round(Math.random() * ceil);
    }
}

let game;

restartButton.addEventListener('click', () => {
    game = new Game();
    game.start();
    game.addScore(10);
});

