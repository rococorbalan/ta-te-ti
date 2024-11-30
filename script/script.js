const board = (function () {
    const init = () => {
        let gameboard = ["", "", "", "", "", "", "", "", ""];

        gameboard.checkCell = (cell) => {
            return (gameboard[cell] === "");
        };

        gameboard.isFull = () => {
            return (gameboard.every(cell => cell !== ""));
        };

        gameboard.isEmpty = () => {
            return (gameboard.every(cell => cell === ""));
        }

        gameboard.winCondition = () => {
            if(gameboard.isEmpty()){
                return false;
            }
        
            // Check horizontals
            for(let i = 0; i <= 6; i += 3){
                if((gameboard[i] === gameboard[i+1] && gameboard[i] === gameboard[i+2]) && gameboard[i] !== ""){
                    return true;
                }
            }
        
            //Check verticals
            for(let i = 0; i <= 2; i++){
                if((gameboard[i] === gameboard[i+3] && gameboard[i] === gameboard[i+6]) && gameboard[i] !== ""){
                    return true;
                }
            }
        
            //Check diagonal top to bottom
            if((gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8]) && gameboard[0] !== ""){
                return true;
            }
        
            //Check diagonal bottom to top
            if((gameboard[6] === gameboard[4] && gameboard[6] === gameboard[2]) && gameboard[6] !== ""){
                return true;
            }
        
            return false;
        }

        return gameboard;

    };
    return { init };
})();

let gameboard = board.init();

const displayController = (function () {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart");
    const scoreDisplays = document.querySelectorAll(".score-display");
    const winnerDisplay = document.querySelector(".winner-display > h1");

    const getCells = () => cells;
    const getScoreDisplays = () => scoreDisplays;

    const restartColors = () => {
        cells.forEach(cell => {
            cell.classList.remove("pink");
            cell.classList.remove("blue");
        })
    }

    const displayBoard = (board) => {
        for(let i = 0; i < board.length; i++){
            cells[i].textContent = board[i];
            if(cells[i].textContent === "X"){
                cells[i].classList.add("pink")
            }else if(cells[i].textContent === "O"){
                cells[i].classList.add("blue")
            }
        }
    }

    const updateScoreDisplay = (scoreDisplay, score) => {
        scoreDisplay.textContent = score;
    }

    cells.forEach(cell => cell.addEventListener("click", (event) => {
        if(gameFlow.getFinishedGame() === false){
            let currentCell = event.currentTarget.classList[1]
            if(gameboard.checkCell(currentCell)) {
                currentPlayer.move(gameboard, currentCell);
                displayController.displayBoard(gameboard);

                gameFlow.handleTurn(gameboard, player1, player2);
            }
        }
    }))

    const updateWinnerDisplay = (player) => {
        if(player === false) {
            winnerDisplay.textContent = "It's a tie!"
        }else {
            winnerDisplay.textContent = `${player.name} wins!`
        }
    }

    const restartWinnerDisplay = () => {winnerDisplay.textContent = ""}

    restartButton.addEventListener("click", () => {
        gameboard = board.init();
        gameFlow.restartGame();
        displayController.displayBoard(gameboard);
        restartColors();
        restartWinnerDisplay();
    })

    return { getCells, displayBoard, updateScoreDisplay, getScoreDisplays, updateWinnerDisplay };
})();


function createPlayer(name, playerNumber) {
    let playerIcon;
    if (playerNumber === 1){
        playerIcon = "X";
    } else if (playerNumber === 2) {
        playerIcon = "O";
    }

    let move = (gameboard, cell) => {
        gameboard[cell] = playerIcon;
    }

    let score = 0;
    const getScore = () => score
    const updateScore = () => score += 1

    const getPlayerIcon = () => playerIcon;
    return { name, getPlayerIcon, move, getScore, updateScore };
}

// Delete this when you finish lol
const player1 = createPlayer("roco", 1);
const player2 = createPlayer("roca", 2);
let currentPlayer = player1;
function toggleCurrentPlayer () {
    if (currentPlayer === player1) {
        currentPlayer = player2;
    }else {
        currentPlayer = player1;
    }
}


const gameFlow = (function () {
    let finishedGame = false;
    const handleTurn = (gameboard, player1, player2) =>{
        const scoreDisplay1 = (displayController.getScoreDisplays())[0];
        const scoreDisplay2 = (displayController.getScoreDisplays())[1];

        if(gameboard.isFull()){
            if(gameboard.winCondition() === false){
                displayController.updateWinnerDisplay(false);
                finishedGame = true;
                toggleCurrentPlayer();
            }
        }
        if(currentPlayer === player1){
            if(gameboard.winCondition()) {
                displayController.updateWinnerDisplay(player1);
                finishedGame = true;
                displayController.updateScoreDisplay(scoreDisplay1, player1.updateScore());
                toggleCurrentPlayer();
            }else {
                toggleCurrentPlayer();
            }
        }else {
            if(gameboard.winCondition()) {
                displayController.updateWinnerDisplay(player2);
                finishedGame = true;
                displayController.updateScoreDisplay(scoreDisplay2, player2.updateScore());
                toggleCurrentPlayer();
            }else {
                toggleCurrentPlayer();
            }
        }
    }

    const getFinishedGame = () => finishedGame;
    const restartGame = () => finishedGame = false;

    return { handleTurn, getFinishedGame, restartGame };
})();


