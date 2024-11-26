let gameboard = ["*", "*", "*",
                "*", "*", "*",
                "*", "*", "*"
];


function displayGameboard(gameboard) {
    console.log(gameboard[0], gameboard[1], gameboard[2]);
    console.log(gameboard[3], gameboard[4], gameboard[5]);
    console.log(gameboard[6], gameboard[7], gameboard[8]);
}


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


function checkCell(gameboard, cell){
    if(gameboard[cell] === "*"){
        return true;
    }else {
        return false;
    }
}


function movePlayer(player){
    let move = parseInt(prompt(`${player.name}'s turn!`));
    if(move === 2907){
        return;
    }
    if((move < 0 || move > 8) || isNaN(move)){
        alert("Choose a cell between 0 and 8");
        return movePlayer(player);
    }else if(!checkCell(gameboard, move)){
        alert("This cell is ocuppied!");
        return movePlayer(player);
    }
    return move;
}


// Change this to object somehow
function gameFlow(gameboard, player1, player2) {
    const player1Icon = player1.getPlayerIcon();
    const player2Icon = player2.getPlayerIcon();
    let player1Turn = true;
    while(!(gameboard.every(cell => cell !== "*"))){
        if(player1Turn) {
            gameboard[movePlayer(player1)] = player1Icon;
            console.clear()
            displayGameboard(gameboard);
            player1Turn = false;
        }else {
            gameboard[movePlayer(player2)] = player2Icon;
            console.clear();
            displayGameboard(gameboard);
            player1Turn = true;
        }
    }
}