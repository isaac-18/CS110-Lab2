var board = document.getElementsByClassName("xo");
var xTurn = true;
var moves = 0;

function play(squareNum) {
    console.log(squareNum)

    // Spot already taken
    if (board[squareNum - 1].innerHTML != "") {
        return;
    }

    if (moves < 9) {
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
    }
    else {
        // Tie and game over
    }
}

function won() {
    for (var i = 0; i < 7; i+=3) {
        // Might return won when spaces empty. "" == ""
        if (board[i] == board[i+1] && board[i] == board[i+2]) {
            
        }
    }
}