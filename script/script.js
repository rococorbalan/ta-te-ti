const board = (function () {
    const init = () => {
        let gameboard = ["*", "*", "*", "*", "*", "*", "*", "*", "*"];

        gameboard.display = () => {
            console.log(gameboard[0], gameboard[1], gameboard[2]);
            console.log(gameboard[3], gameboard[4], gameboard[5]);
            console.log(gameboard[6], gameboard[7], gameboard[8]);
        };

        gameboard.checkCell = (cell) => {
            return (gameboard[cell] === "*");
        };

        gameboard.checkFullBoard = () => {
            return (gameboard.every(cell => cell !== "*"));
        };

        return gameboard;

    };
    return { init };
})();

let gameboard = board.init();
gameboard.display();

function createPlayer(name, playerNumber) {
    let playerIcon;
    if (playerNumber === 1){
        playerIcon = "X";
    } else if (playerNumber === 2) {
        playerIcon = "O";
    }

    let move = (gameboard) => {
        let moveInput = parseInt(prompt(`${name}'s turn!`));
        if (moveInput === 2907) {
            return;
        }
        if((moveInput < 0 || moveInput > 8) || isNaN(moveInput)){
            alert("Choose a cell between 0 and 8");
            return move(gameboard);
        }else if(!gameboard.checkCell(moveInput)){
            alert("This cell is occupied!");
            return move(gameboard);
        }
        gameboard[moveInput] = playerIcon;
    }

    const getPlayerIcon = () => playerIcon;
    return { name, getPlayerIcon, move };
}

// Delete this when you finish lol
const roco = createPlayer("roco", 1);
const roca = createPlayer("roca", 2);


const gameFlow = (function () {
    const startGame = function(gameboard, player1, player2){
        const player1Icon = player1.getPlayerIcon();
        const player2Icon = player2.getPlayerIcon();
        let player1Turn = true;
        while(!gameboard.checkFullBoard()){
            if(player1Turn) {
                player1.move(gameboard);
                console.clear()
                gameboard.display();
                player1Turn = false;
            }else {
                player2.move(gameboard);
                console.clear();
                gameboard.display();
                player1Turn = true;
            }
        }
    }

    return { startGame };
})();

