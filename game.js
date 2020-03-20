const restartButton = document.getElementById("restart");
const gameOverBox = document.getElementById("game_over_box");
const playground = document.getElementById("playground");
const scoreField = document.getElementById("score");

class Game {

    constructor() {
        this.score = 0;
        this.opponent = 300;
        this.scoreIndicator = document.getElementById("score_indicator");
    }

    start() {
        this.run();
        this.showNewVirus();
    }

    run() {
        this.interval = setInterval('automaticallyAdd()', 500);
    }

    showNewVirus() {
        const virus = document.createElement('div');
        virus.classList.add("virus");
        playground.appendChild(virus);
        virus.addEventListener('click', function () {
            game.addScore(20)
        })

    }

    addScore(amount) {
        this.score += amount;
        this.opponent -= amount / 2;
        scoreField.innerText = this.score;
        this.scoreIndicator.style.width = `${this.opponent}px`;
        if (this.opponent <= 0) {
            clearInterval(this.interval);
            alert("You won!");
        }
    }
}

function automaticallyAdd() {
    // alert("Interval is over");
    game.addScore(-5);
    if (game.opponent <= 600) {

    }
    else {
        gameOverBox.style.visibility = 'visible';
        clearInterval(game.interval)
    }

}

let game = new Game();

restartButton.addEventListener('click', function () {
    game.start();
    game.addScore(10)
});

