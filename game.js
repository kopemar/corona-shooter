const newGameButton = document.getElementById("new_game");
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
        gameOverBox.style.visibility = 'hidden';
        youWonBox.style.visibility = 'hidden';
        this.run();
        this.showNewVirus();

        if (!this.player.mouse) {
            cursor.style.visibility = 'visible';
            document.querySelectorAll('.playground_elements').forEach((elem) => {
                    elem.style.cursor = 'none'
                }
            );

            const keyDownListener = {
                handleEvent: (event) => {
                    if (event.key === 'd') {
                        cursor.style.left = (cursor.offsetLeft + 30) + 'px';
                    } else if (event.key === 'w') {
                        cursor.style.top = (cursor.offsetTop - 30) + 'px';
                    } else if (event.key === 's') {
                        cursor.style.top = (cursor.offsetTop + 30) + 'px';
                    } else if (event.key === 'a') {
                        cursor.style.left = (cursor.offsetLeft - 30) + 'px';
                    } else if (event.key === ' ') {
                        this.shoot()
                    }
                }
            };

            window.addEventListener('keydown', keyDownListener, false)
        } else {
            cursor.style.visibility = 'hidden';
            document.querySelectorAll('.playground_elements').forEach((elem) => {
                    elem.style.cursor = 'url("asset/target.png") 26 26, default'
                }
            );
        }
    }

    shoot() {
        if (cursor.offsetLeft + 26 > this.virus.offsetLeft && cursor.offsetLeft + 26 < this.virus.offsetLeft + 82) {
            if (cursor.offsetTop + 26 > this.virus.offsetTop && cursor.offsetTop + 26 < this.virus.offsetTop + 76) {
                this.onVirusEliminated(this.virus);
            }
        }
    }

    automaticallyAdd() {
        this.addScore(-1);
    }

    run() {
        this.interval = setInterval(() => {
            this.automaticallyAdd();
        }, 350);
    }

    stop() {
        let virus = this.virus;
        try {
            playground.removeChild(virus);
        } catch (e) {
            console.error(e);
        }

        clearTimeout(this.newVirusTimeout);
        clearTimeout(this.timeout);
        clearInterval(this.interval);
    }

    showNewVirus() {
        this.virus = Virus.createNew();

        this.timeout = setTimeout(() => {
            this.onVirusMissed(this.virus);
        }, (this.player.mouse) ? 1000 : 2000);

        const virusEliminatedListener = {
            handleEvent: (event) => {
                console.log(event);
                this.onVirusEliminated(this.virus);
                event.stopPropagation();
            }
        };

        if (this.player.mouse) {
            this.virus.addEventListener('click', virusEliminatedListener, true);
        }

        this.newVirusTimeout = setTimeout(() => {
            this.showNewVirus()
        }, (this.player.mouse) ? 2000 : 4000)
    }

    onVirusMissed(virus) {
        this.addScore(-20);
        playground.removeChild(virus);
        this.player.missed++;
        missedField.innerText = this.player.missed;
    }

    onVirusEliminated(virus) {
        this.addScore(30);
        playground.removeChild(virus);
        clearTimeout(this.timeout);
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
        this.maxWidth = 600;
        scoreIndicator.style.width = `${this.hidden}px`;
    }

    show(pixels) {
        this.hidden -= pixels;
        if (this.hidden < 0) {
            scoreIndicator.style.width = '0px';
        } else if (this.hidden >= this.maxWidth) {
            scoreIndicator.style.width = `${this.maxWidth}px`;
        } else {
            scoreIndicator.style.width = `${this.hidden}px`;
        }
    }

    isFullyShown() {
        return this.hidden <= 0;
    }

    isFullyHidden() {
        return this.hidden >= this.maxWidth;
    }
}

let game;

newGameButton.addEventListener('click', (event) => {
    if (game != null) {
        game.stop();
    }
    game = new Game(new Player(document.getElementById('input_type_radios').elements['input_type_radio'].value !== "keyboard"));
    game.start();
});

