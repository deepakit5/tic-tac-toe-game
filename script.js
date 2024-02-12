const gameInfo = document.querySelector('.gameInfo');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// function to initialise the game
function initGame() {
    currentPlayer = "X";

    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    // empty kar do boxes ko backend me
    gameGrid =[ "", "", "", "", "", "", "", "", ""];


    // Make Boxes Empty
    boxes.forEach((box, index) => {
        box.textContent = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });

    // Remove Active Class From Button
    newGameBtn.classList.remove("active");
}

initGame();

function handleClick(index) {
    console.log("inside handleclick 0");

    if (gameGrid[index] === "") {
        console.log("inside handleclick 1");

        boxes[index].style.pointerEvents = "none";
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        console.log("inside handleclick 2");
        swapTurns();

        gameInfo.textContent = `Current Player - ${currentPlayer}`;
        checkGameOver();
    }
}

// adding event listner to all boxes to get player input
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        console.log("inside eventlistner");

        handleClick(index);
    });

});

// swapping turns
function swapTurns() {
    currentPlayer = (currentPlayer === "X") ? "0" : "X";
}

// check game is over or not
function checkGameOver() {
    let winner = "";
    winningPosition.forEach((position) => {
        // if ((gameGrid[position[0]] !== "") &&
        //     (gameGrid[position[0]] === gameGrid[position[1]]) &&
        //     (gameGrid[position[1]] === gameGrid[position[2]])) {

        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            winner = gameGrid[position[0]] === "X" ? "X" : "O";

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (winner !== "") {
        gameInfo.textContent = `Winner is - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Here is not winner yet Check for tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.textContent = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}
// Add Event Listener to Button 
newGameBtn.addEventListener('click', initGame);