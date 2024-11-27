const board = (function () {
    const init = () => {
        let gameboard = ["*", "*", "*", "*", "*", "*", "*", "*", "*"];

        gameboard.display = () => {
            console.log(gameboard[0], gameboard[1], gameboard[2]);
            console.log(gameboard[3], gameboard[4], gameboard[5]);
            console.log(gameboard[6], gameboard[7], gameboard[8]);
        };

        gameboard.checkCell = (cell) => {
            if(gameboard[cell] === "*"){
                return true;
            }else {
                return false;
            }
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

    const getPlayerIcon = () => playerIcon;
    return { name, getPlayerIcon };
}

// Delete this when you finish lol
const roco = createPlayer("roco", 1);
const roca = createPlayer("roca", 2);

function movePlayer(player){
    let move = parseInt(prompt(`${player.name}'s turn!`));
    if(move === 2907){
        return;
    }
    if((move < 0 || move > 8) || isNaN(move)){
        alert("Choose a cell between 0 and 8");
        return movePlayer(player);
    }else if(!gameboard.checkCell(move)){
        alert("This cell is occupied!");
        return movePlayer(player);
    }
    return move;
}


const gameFlow = (function () {
    const startGame = function(gameboard, player1, player2){
        const player1Icon = player1.getPlayerIcon();
        const player2Icon = player2.getPlayerIcon();
        let player1Turn = true;
        while(!gameboard.checkFullBoard()){
            if(player1Turn) {
                gameboard[movePlayer(player1)] = player1Icon;
                console.clear()
                gameboard.display();
                player1Turn = false;
            }else {
                gameboard[movePlayer(player2)] = player2Icon;
                console.clear();
                gameboard.display();
                player1Turn = true;
            }
        }
    }

    return { startGame };
})();

