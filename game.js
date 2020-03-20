const restartButton = document.getElementById("restart");
const gameOverBox = document.getElementById("game_over_box");
const youWonBox = document.getElementById("you_won_box");
const playground = document.getElementById("playground");
const scoreField = document.getElementById("score");
const missedField = document.getElementById("viruses_missed");
const eliminatedField = document.getElementById("viruses_eliminated");
const scoreIndicator = document.getElementById("score_indicator");
const cursor = document.getElementById("cursor");

class Game {

    constructor(player) {
        this.player = player;
        this.map = new Map();
    }

    start() {
        this.run();
        this.showNewVirus();
    }

    automaticallyAdd() {
        this.addScore(-1);
    }

    run() {
        this.interval = setInterval(() => {
            this.automaticallyAdd();
        }, 350);
    }

    showNewVirus() {
        this.virus = Virus.createNew();

        let timeout = setTimeout(() => {
            this.onVirusMissed(this.virus);
        }, 1000);

        this.virus.addEventListener('click', (e) => {
            console.log(e);
            this.onVirusEliminated(this.virus);
            clearTimeout(timeout);
            e.stopPropagation();
        }, true);

        this.newVirusTimeout = setTimeout(() => {
            this.showNewVirus()
        }, 2000)
    }

    onVirusMissed(virus) {
        this.addScore(-20);
        playground.removeChild(virus);
        this.player.missed++;
        missedField.innerText = this.player.missed;
    }

    onVirusEliminated(virus) {
        this.addScore(30);
        console.debug("ELIMINATED");
        playground.removeChild(virus);
        this.player.eliminated++;
        eliminatedField.innerText = this.player.eliminated;
    }

    addScore(amount) {
        this.player.score += amount;
        scoreField.innerText = this.player.score;
        this.map.show(amount);
        if (this.map.isFullyHidden()) {
            gameOverBox.style.visibility = 'visible';
            clearTimeout(this.newVirusTimeout);
            clearInterval(this.interval);
        } else if (this.map.isFullyShown()) {
            youWonBox.style.visibility = 'visible';
            clearTimeout(this.newVirusTimeout);
            clearInterval(this.interval);
        }
    }

    static getRandomNumber(ceil) {
        return Math.round(Math.random() * ceil);
    }
}

class Player {
    constructor(mouse) {
        this.score = 0;
        this.missed = 0;
        this.eliminated = 0;
        this.mouse = mouse;
        console.log(this.mouse);
    }
}

class Virus {
    static createNew() {
        this.virus = document.createElement('div');
        this.virus.classList.add("virus");
        this.virus.style.top = `${Game.getRandomNumber(323)}px`;
        this.virus.style.right = `${Game.getRandomNumber(518)}px`;
        playground.appendChild(this.virus);
        return this.virus
    }
}

class Map {
    constructor() {
        this.hidden = 300;
        scoreIndicator.style.width = `${this.hidden}px`;
    }

    show(pixels) {
        this.hidden -= pixels;
        if (this.hidden < 0) {
            scoreIndicator.style.width = '0px';
        } else if (this.hidden >= scoreIndicator.style.width) {
            scoreIndicator.style.width = `${scoreIndicator.style.width}px`;
        } else {
            scoreIndicator.style.width = `${this.hidden}px`;
        }
    }

    isFullyShown() {
        return this.hidden <= 0;
    }

    isFullyHidden() {
        return this.hidden >= scoreIndicator.style.width;
    }
}

let game;

restartButton.addEventListener('click', () => {
    game = new Game(new Player(document.querySelector('input[name="input_type_radio"]').value !== "keyboard"));
    game.start();
    game.addScore(10);
});

