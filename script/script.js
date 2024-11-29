const board = (function () {
    const init = () => {
        let gameboard = ["", "", "", "", "", "", "", "", ""];

        gameboard.display = () => {
            console.log(gameboard[0], gameboard[1], gameboard[2]);
            console.log(gameboard[3], gameboard[4], gameboard[5]);
            console.log(gameboard[6], gameboard[7], gameboard[8]);
        };

        gameboard.checkCell = (cell) => {
            return (gameboard[cell] === "*");
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
gameboard.display();


const displayController = (function () {
    let cells = document.querySelectorAll(".cell");
    const getCells = () => cells

    const displayBoard = (board) => {
        for(let i = 0; i < board.length; i++){
            cells[i].textContent = board[i];
        }
    }

    cells.forEach(cell => cell.addEventListener("click", (event) => {
        let currentCell = event.currentTarget.classList[1]
        currentPlayer.move(gameboard, currentCell);
        displayController.displayBoard(gameboard);

        gameFlow.handleTurn(gameboard, player1, player2);
        
    }))

    return { getCells, displayBoard };
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

    const getPlayerIcon = () => playerIcon;
    return { name, getPlayerIcon, move };
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
    const handleTurn = (gameboard, player1, player2) =>{
        if(gameboard.isFull()){
            if(gameboard.winCondition() === false){
                console.log("tie");
            }
        }
        if(currentPlayer === player1){
            if(gameboard.winCondition()) {
                console.log("player 1 wins");
            }else {
                toggleCurrentPlayer();
            }
        }else {
            if(gameboard.winCondition()) {
                console.log("player 2 wins");
            }else {
                toggleCurrentPlayer();
            }
        }
    }

    return { handleTurn };
})();


