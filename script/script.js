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

        gameboard.isFull = () => {
            return (gameboard.every(cell => cell !== "*"));
        };

        gameboard.isEmpty = () => {
            return (gameboard.every(cell => cell === "*"));
        }

        gameboard.winCondition = () => {
            if(gameboard.isEmpty()){
                return false;
            }
        
            // Check horizontals
            for(let i = 0; i <= 6; i += 3){
                if((gameboard[i] === gameboard[i+1] && gameboard[i] === gameboard[i+2]) && gameboard[i] !== "*"){
                    return true;
                }
            }
        
            //Check verticals
            for(let i = 0; i <= 2; i++){
                if((gameboard[i] === gameboard[i+3] && gameboard[i] === gameboard[i+6]) && gameboard[i] !== "*"){
                    return true;
                }
            }
        
            //Check diagonal top to bottom
            if((gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8]) && gameboard[0] !== "*"){
                return true;
            }
        
            //Check diagonal bottom to top
            if((gameboard[6] === gameboard[4] && gameboard[6] === gameboard[2]) && gameboard[6] !== "*"){
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
        const { name: player1Name } = player1;
        const { name: player2Name } = player2;

        let player1Turn = true;

        // Resets the gameboard
        gameboard = board.init();

        while(!gameboard.isFull()){
            if(player1Turn) {
                player1.move(gameboard);
                console.clear()
                gameboard.display();
                if(gameboard.winCondition()){
                    console.log(`${player1Name} won!`);
                    break;
                }
                player1Turn = false;
            }else {
                player2.move(gameboard);
                console.clear();
                gameboard.display();
                if(gameboard.winCondition()){
                    console.log(`${player2Name} won!`);
                    break;
                }
                player1Turn = true;
            }
        }
        if(gameboard.winCondition() === false){
            console.log("is a tie!")
        }
    }

    return { startGame };
})();


