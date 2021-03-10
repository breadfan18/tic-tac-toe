/*----- constants -----*/
const PLAYERS = {
    '1': 'X',
    '-1': 'O', 
    null: '' 
}

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

/*----- app's state (variables) -----*/
let winner, turn, gameBoard, winningCombo;

/*----- cached element references -----*/
let $squares = $('.square');
let $turnHolder = $('h2');
let $resetButton = $('button');
let $fullGameBoard = $('#gameboard');

/*----- event listeners -----*/
$fullGameBoard.on('click', '.square', handleClick);
$resetButton.click(resetGame);

/*----- functions -----*/
resetGame();

function resetGame(){
    turn = 1;
    winner = false;
    winningCombo = [];
    gameBoard = new Array(9).fill(null);
    $turnHolder.css('fontSize', '25px');
    render();
}

function handleClick(e) {
    let $currentSquareID = $(this).attr('id');
    if (gameBoard[$currentSquareID] || Math.abs(winner) === 1) return;
    gameBoard[$currentSquareID] = turn;
    turn *= -1;
    winner = checkWinner();
    render();
}


function render() {
    gameBoard.forEach(function (value, index) {
        $squares.eq(index).text(`${PLAYERS[value]}`).css('backgroundColor', "#fff");
        console.log($squares.eq(index).text());
    });
    $turnHolder.css('backgroundColor', '#fff')
    if (winner === 'T') {
        $turnHolder.text('It\'s a tie');
    }else if (!winner) {
        $turnHolder.text(`${PLAYERS[turn]}'s turn`);
    }else {
        $turnHolder.text(`${PLAYERS[winner]} wins!`);
    }
    crossLine(winningCombo);
}


function checkWinner() {
    for (let i = 0; i < COMBOS.length; i++) {
        if (Math.abs(gameBoard[COMBOS[i][0]] + gameBoard[COMBOS[i][1]] + gameBoard[COMBOS[i][2]]) === 3) {
            winningCombo = COMBOS[i];
            return gameBoard[COMBOS[i][0]];
        }
    }
    if (gameBoard.includes(null)) return false;
    return 'T';
}

function crossLine(winningCombo) {
    winningCombo.forEach(number => {
        let $currentSquare = $squares.eq(number);
        $currentSquare.css('fontSize', '90px');
        $currentSquare.css('transition', '0.7s ease');
        $currentSquare.css('backgroundColor', 'var(--lightColor)');
        $turnHolder.css('backgroundColor', 'var(--lightColor)');
        $turnHolder.css('fontSize', '50px');
        $turnHolder.css('letterSpacing', '0.2em' )
        $turnHolder.css('transition', '0.7s ease');
    });
}