var board = document.getElementsByClassName("xo");
var xTurn = true;
var moves = 0;
var xScore = 0;
var oScore = 0;
var gameOver = false;
var ai_off = false;

function play(squareNum) {
    // console.log(squareNum)

    // Spot already taken
    if (board[squareNum - 1].innerHTML != "") {
        return;
    }

    // if (!gameOver) {
    if (moves < 9 && !gameOver) {
        if (xTurn) {
            board[squareNum - 1].innerHTML = "X"; 
            xTurn = false;
            moves++;
            document.getElementsByClassName("display_player")[0].innerHTML = "O";
            if (won()) {
                gameOver = true;
                return;
            }
            
            if (!ai_off) {
                // setTimeout(function() { ai_play(); }, 50);
                ai_play();
                moves++;

                if (won()) {
                    gameOver = true;
                    return;
                }
            }
        }
        else {
            board[squareNum - 1].innerHTML = "O"
            xTurn = true;
            moves++;
            document.getElementsByClassName("display_player")[0].innerHTML = "X";
            if (won()) {
                gameOver = true;
                return;
            }
        }
        

        console.log('Moves: ' + moves)
        if (moves >= 9) {
            // Tie and game over
            console.log('hello')
            document.getElementById('result').innerHTML = 'Tie game';
            gameOver = true;
            return;
        }

        // if (won()) {
        //     console.log("Someone won")
        //     // Last move was X's so X won
        //     if (xTurn == false) {
        //         xScore++;
        //         document.querySelector('.x_score').innerHTML = xScore;
        //         document.getElementById('result').innerHTML = 'X won!';
        //         console.log("X won");
        //     }
        //     else {
        //         oScore++;
        //         document.querySelector('.o_score').innerHTML = oScore;
        //         document.getElementById('result').innerHTML = 'O won!';
        //         console.log("O won");
        //     }
        //     gameOver = true;
        // }

    }
    // }
}

// Kinda janky but should scalable. Just need to add board size
function won() {
    var winner = "";

    // Checks vertical win
    for (var i = 0; i < 7; i+=3) {
        // Might return won when spaces empty. "" == ""
        if (board[i].innerHTML == board[i+1].innerHTML && board[i].innerHTML == board[i+2].innerHTML && board[i].innerHTML != "") {
            winner = board[i].innerHTML
            console.log("Vertical win:" + winner);
        }
    }

    // Checks horizontal win
    for (var i = 0; i < 3; i += 1) {
        // Might return won when spaces empty. "" == ""
        if (board[i].innerHTML == board[i+3].innerHTML && board[i].innerHTML == board[i+6].innerHTML && board[i].innerHTML != "") {
            winner = board[i].innerHTML
            console.log("Horizontal win:" + winner);
        }
    }

    // Check diagonal from top left to bottom right
    if (board[0].innerHTML == board[4].innerHTML && board[0].innerHTML == board[8].innerHTML && board[0].innerHTML != "") {
        winner = board[0].innerHTML
        console.log("TLeft-BRight win:" + winner);
    }

    // Check diagonal from bottom left to top right
    if (board[2].innerHTML == board[4].innerHTML && board[2].innerHTML == board[6].innerHTML && board[2].innerHTML != "") {
        winner = board[2].innerHTML
        console.log("BLeft-TRight win:" + winner);
    }

    if (winner == "X") {
        xScore++;
        document.querySelector('.x_score').innerHTML = xScore;
        document.getElementById('result').innerHTML = 'X won!';
        console.log("X won");
        return true;
    }
    else if (winner == "O") {
        oScore++;
        document.querySelector('.o_score').innerHTML = oScore;
        document.getElementById('result').innerHTML = 'O won!';
        console.log("O won");
        return true;
    }
    else {
        return false;
    }
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
    document.getElementById('result').innerHTML = "";

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
    document.getElementById('result').innerHTML = "";
    
    for (var i = 0; i < board.length; i++) {
        board[i].innerHTML = "";
    }
}

function ai() {
    if (document.getElementById("ai_status").innerHTML == "On") {
        ai_off = true; 
        document.getElementById("ai_status").innerHTML = "Off";
    }
    else {
        ai_off = false;
        document.getElementById("ai_status").innerHTML = "On"
    }
}

function ai_play() {
    // randomSquare = Math.floor(Math.random() * 9);
    // while (board[randomSquare].innerHTML != "") {
    //     console.log("Chose: " + randomSquare);
    //     randomSquare = Math.floor(Math.random() * 9);
    // }
    // board[randomSquare].innerHTML = "O"
    // xTurn = true;
    // document.getElementsByClassName("display_player")[0].innerHTML = "X";

    var indexes = Array.from(Array(board.length).keys());
    var availableIndexes = indexes.filter((index) => board[index].innerHTML == "");
    var selectedIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

    // console.log(availableIndexes);
    // console.log(selectedIndex);

    board[selectedIndex].innerHTML = "O"
    xTurn = true;
    document.getElementsByClassName("display_player")[0].innerHTML = "X";
}