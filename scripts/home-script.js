const inputControl = (function () {
    player1Input = document.getElementById("player1-name");
    player2Input = document.getElementById("player2-name");

    const getPlayer1Name = () => {
        if(player1Input.value === ""){
            return ("Player 1")
        }else {
            return (player1Input.value);
        }
    }

    const getPlayer2Name = () => {
        if(player2Input.value === ""){
            return ("Player 2")
        }else {
            return (player2Input.value);
        }
    }

    return { getPlayer1Name, getPlayer2Name }
})();


const playButton = document.getElementById("play-button");
playButton.addEventListener("click", () => {
    const player1Name = document.getElementById("player1-name").value || "Player 1";
    const player2Name = document.getElementById("player2-name").value || "Player 2";

    localStorage.setItem("player1Name", player1Name);
    localStorage.setItem("player2Name", player2Name);

    window.location.href = 'game.html';

});