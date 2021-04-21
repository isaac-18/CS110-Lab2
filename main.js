var board = document.getElementsByClassName("xo");
var xTurn = true;
var moves = 0;
var xScore = 0;
var oScore = 0;
var gameOver = false;

function play(squareNum) {
    console.log(squareNum)

    // Spot already taken
    if (board[squareNum - 1].innerHTML != "") {
        return;
    }

    if (moves < 9 && !gameOver) {
        if (xTurn) {
            board[squareNum - 1].innerHTML = "X"; 
            xTurn = false;
            document.getElementsByClassName("display_player")[0].innerHTML = "O";
        }
        else {
            board[squareNum - 1].innerHTML = "O"
            xTurn = true;
            document.getElementsByClassName("display_player")[0].innerHTML = "X";
        }
        moves++;

        if (won()) {
            console.log("Someone won")
            // Last move was X's so X won
            if (xTurn == false) {
                xScore++;
                document.querySelector('.x_score').innerHTML = xScore;
                // document.getElementById('#result').innerHTML = 'X won!';
                document.querySelector('result').innerHTML = 'X won!';
                console.log("X won");
            }
            else {
                oScore++;
                document.querySelector('.o_score').innerHTML = oScore;
                // document.getElementById('#result').innerHTML = 'O won!';
                document.querySelector('result').innerHTML = 'O won!';
                console.log("O won");
            }
            gameOver = true;
        }
    }
    else {
        // Tie and game over
        // document.getElementById('#result').innerHTML = 'Tie game';
        document.querySelector('result').innerHTML = 'Tie game';
    }
}

// Kinda janky but should scalable. Just need to add board size
function won() {
    // Checks vertical win
    for (var i = 0; i < 7; i+=3) {
        // Might return won when spaces empty. "" == ""
        if (board[i].innerHTML == board[i+1].innerHTML && board[i].innerHTML == board[i+2].innerHTML && board[i].innerHTML != "") {
            return true;
        }
    }

    // Checks horizontal win
    for (var i = 0; i < 3; i += 1) {
        // Might return won when spaces empty. "" == ""
        if (board[i].innerHTML == board[i+3].innerHTML && board[i].innerHTML == board[i+6].innerHTML && board[i].innerHTML != "") {
            return true;
        }
    }

    // Check diagonal from top left to bottom right
    if (board[0].innerHTML == board[4].innerHTML && board[0].innerHTML == board[8].innerHTML && board[0].innerHTML != "") {
        return true;
    }

    // Check diagonal from bottom left to top right
    if (board[2].innerHTML == board[4].innerHTML && board[2].innerHTML == board[6].innerHTML && board[2].innerHTML != "") {
        return true;
    }

    return false;
}

function newGame() {
    console.log("New game")
    xTurn = true;
    moves = 0;
    xScore = 0;
    oScore = 0;
    gameOver = false;

    document.querySelector('.x_score').innerHTML = xScore;
    document.querySelector('.o_score').innerHTML = oScore;

    document.getElementsByClassName("display_player")[0].innerHTML = "X";

    for (var i = 0; i < board.length; i++) {
        board[i].innerHTML = ""
    }
}

function reset() {
    console.log("Reset")
    xTurn = true;
    moves = 0;
    gameOver = false;
    
    document.getElementsByClassName("display_player")[0].innerHTML = "X";
    
    for (var i = 0; i < board.length; i++) {
        board[i].innerHTML = "";
    }
}

// TODO: 
// - Stop game after winning move (score keeps going otherwise)
// - Display when someone wins or game ties