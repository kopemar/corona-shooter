class Game {

    constructor() {
        this.score = 300;
        this.scoreIndicator = document.getElementById("score_indicator");
    }

    start() {
        alert("The game has started");
        this.autorun();
    }

     autorun() {
        this.interval = setInterval('automaticallyAdd()', 500);
     }

    addScore(amount) {
        this.score += amount;
        let width = 600 - this.score;
        this.scoreIndicator.style.width = `${width}px`;
    }
}

function automaticallyAdd() {
    // alert("Interval is over");
    game.addScore(-5);
    if (game.score > 0) {

    }
    else {
        clearInterval(game.interval)
    }

}

let game = new Game();

const restartButton = document.getElementById("restart");

restartButton.addEventListener('click', function () {
    game.start();
    game.addScore(10)
});

