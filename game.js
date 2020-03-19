class Game {
    constructor() {
        // const restartButton = document.getElementById("restart");
    }

    start() {
        alert("The game has started");
    }
}

const restartButton = document.getElementById("restart");

function handleEvent() {
    new Game().start()
}

restartButton.addEventListener('click', handleEvent);