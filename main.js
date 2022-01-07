// Who won
let winner = "";
// Explains whos turn it is
let whoHasTheTurn = "O";
// How many times either player has drawn a X or O
let counter = 0;
// Player Score
let playerOneScore = 0;
let playerTwoScore = 0;

window.onload = function () {
    document.getElementById("back-button").addEventListener("click", () => {
        window.location.href = "https://www.trollhus.se/";
    });
    initializeModal();
    getScore();
    initializeGame();
    render();
};

function initializeModal() {
    document.getElementById("player-one").addEventListener("click", () => {
        whoHasTheTurn = "O";
        document.getElementById("modal-container").classList.add("hide-inner");
        setTimeout(() => {
            document.getElementById("modal").classList.add("hide-outer");
            setTimeout(() => {
                document.getElementById("modal").style.display = "none";
            }, 200);
        }, 500);
        render();
    });
    document.getElementById("player-two").addEventListener("click", () => {
        whoHasTheTurn = "X";
        document.getElementById("modal-container").classList.add("hide-inner");
        setTimeout(() => {
            document.getElementById("modal").classList.add("hide-outer");
            setTimeout(() => {
                document.getElementById("modal").style.display = "none";
            }, 200);
        }, 500);
        render();
    });
}

function initializeGame() {
    let topLeft = document.getElementById("top-left");
    let top = document.getElementById("top");
    let topRight = document.getElementById("top-right");
    let middleLeft = document.getElementById("middle-left");
    let middle = document.getElementById("middle");
    let middleRight = document.getElementById("middle-right");
    let bottomLeft = document.getElementById("bottom-left");
    let bottom = document.getElementById("bottom");
    let bottomRight = document.getElementById("bottom-right");

    let tags = [
        topLeft,
        top,
        topRight,
        middleLeft,
        middle,
        middleRight,
        bottomLeft,
        bottom,
        bottomRight,
    ];

    tags.forEach((tag) => {
        tag.addEventListener("click", () => {
            handleClick(tag);
        });
    });

    document.getElementById("restart").addEventListener("click", () => {
        triggerRestart(tags);
    });

    document.getElementById("reset").addEventListener("click", () => {
        playerOneScore = 0;
        playerTwoScore = 0;
        triggerRestart(tags);
    });
}

function triggerRestart(tags) {
    tags.forEach((tag) => {
        tag.classList.remove("X");
        tag.classList.remove("O");
        tag.classList.add("hide-outer");
        setTimeout(() => {
            tag.innerHTML = "";
            tag.classList.remove("hide-outer");
        }, 200);
    });

    winner = "";
    whoHasTheTurn = "O";
    counter = 0;
    storeScore();
    render();
}

function handleClick(clickedTag) {
    if (winner == "" && counter < 9) {
        if (
            !clickedTag.classList.contains("X") ||
            !clickedTag.classList.contains("O")
        ) {
            counter++;
            // We check for O
            if (whoHasTheTurn == "O") {
                clickedTag.classList.add("O");
                whoHasTheTurn = "X";
            }
            // We check for X
            else if (whoHasTheTurn == "X") {
                clickedTag.classList.add("X");
                whoHasTheTurn = "O";
            }

            checkIfWon();
            render();
        }
    }
}

function checkIfWon() {
    let topLeftClasses = document.getElementById("top-left").classList;
    let topClasses = document.getElementById("top").classList;
    let topRightClasses = document.getElementById("top-right").classList;
    let middleLeftClasses = document.getElementById("middle-left").classList;
    let middleClasses = document.getElementById("middle").classList;
    let middleRightClasses = document.getElementById("middle-right").classList;
    let bottomLeftClasses = document.getElementById("bottom-left").classList;
    let bottomClasses = document.getElementById("bottom").classList;
    let bottomRightClasses = document.getElementById("bottom-right").classList;

    for (let which = 1; which <= 2; which++) {
        let condition = "";
        if (which == 1) {
            condition = "X";
        } else {
            condition = "O";
        }

        if (
            topLeftClasses.contains(condition) &&
            topClasses.contains(condition) &&
            topRightClasses.contains(condition)
        ) {
            winner = condition;
        }
        if (
            middleLeftClasses.contains(condition) &&
            middleClasses.contains(condition) &&
            middleRightClasses.contains(condition)
        ) {
            winner = condition;
        }
        if (
            bottomLeftClasses.contains(condition) &&
            bottomClasses.contains(condition) &&
            bottomRightClasses.contains(condition)
        ) {
            winner = condition;
        }
        if (
            topLeftClasses.contains(condition) &&
            middleLeftClasses.contains(condition) &&
            bottomLeftClasses.contains(condition)
        ) {
            winner = condition;
        }
        if (
            topClasses.contains(condition) &&
            middleClasses.contains(condition) &&
            bottomClasses.contains(condition)
        ) {
            winner = condition;
        }
        if (
            topRightClasses.contains(condition) &&
            middleRightClasses.contains(condition) &&
            bottomRightClasses.contains(condition)
        ) {
            winner = condition;
        }
        if (
            topLeftClasses.contains(condition) &&
            middleClasses.contains(condition) &&
            bottomRightClasses.contains(condition)
        ) {
            winner = condition;
        }
        if (
            topRightClasses.contains(condition) &&
            middleClasses.contains(condition) &&
            bottomLeftClasses.contains(condition)
        ) {
            winner = condition;
        }
    }
}

function render() {
    let topLeft = document.getElementById("top-left");
    let top = document.getElementById("top");
    let topRight = document.getElementById("top-right");
    let middleLeft = document.getElementById("middle-left");
    let middle = document.getElementById("middle");
    let middleRight = document.getElementById("middle-right");
    let bottomLeft = document.getElementById("bottom-left");
    let bottom = document.getElementById("bottom");
    let bottomRight = document.getElementById("bottom-right");

    let tags = [
        topLeft,
        top,
        topRight,
        middleLeft,
        middle,
        middleRight,
        bottomLeft,
        bottom,
        bottomRight,
    ];

    tags.forEach((tag) => {
        if (tag.children.length == 0) {
            if (tag.classList.contains("O")) {
                let chocolateWrapper = document.createElement("div");
                chocolateWrapper.className = "chocolate-wrapper";
                let chocolate = document.createElement("img");
                chocolate.src = "./images/Chocolate_2.png";
                chocolateWrapper.appendChild(chocolate);
                tag.appendChild(chocolateWrapper);
            } else if (tag.classList.contains("X")) {
                let yellyWrapper = document.createElement("div");
                yellyWrapper.className = "yelly-wrapper";
                let yelly = document.createElement("img");
                yelly.src = "./images/Yelly_2.png";
                yellyWrapper.appendChild(yelly);
                tag.appendChild(yellyWrapper);
            } else {
                tag.innerText = "";
            }
        }
    });

    let turn = "";
    if (whoHasTheTurn == "O") {
        turn = "Chocolate";
    } else if (whoHasTheTurn == "X") {
        turn = "Yelly";
    }

    document.getElementById("player").innerText = turn + "'s turn.";
    if (winner != "") {
        let winnerText = ";";
        if (winner == "O") {
            playerOneScore++;
            winnerText = "Chocolate";
            storeScore();
        } else if (winner == "X") {
            playerTwoScore++;
            winnerText = "Yelly";
            storeScore();
        }
        document.getElementById("player").innerText = winnerText + " won!";
    } else if (counter >= 9) {
        document.getElementById("player").innerText = "It's a draw!";
    }

    document.getElementById("player-one-score").innerText =
        ": " + playerOneScore.toString();
    document.getElementById("player-two-score").innerText =
        ": " + playerTwoScore.toString();
}

function storeScore() {
    localStorage.setItem("playerOneScore", playerOneScore.toString());
    localStorage.setItem("playerTwoScore", playerTwoScore.toString());
}

function getScore() {
    let p1 = JSON.parse(localStorage.getItem("playerOneScore"));
    let p2 = JSON.parse(localStorage.getItem("playerTwoScore"));

    if (p1 == null) {
        playerOneScore = 0;
    } else {
        playerOneScore = p1;
    }

    if (p2 == null) {
        playerTwoScore = 0;
    } else {
        playerTwoScore = p2;
    }
}
