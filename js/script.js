/*----- constants -----*/
const PLAYERS = {
    '1': 'X',
    '-1': 'O',
    'null': ''
};

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/
let winner, turn, gameBoard;


/*----- cached element references -----*/
const $squareEls = $('.square');
const $messageEl = $('h2');
const $buttonEl = $('button');
const $gameBoardEl = $('#gameboard');

/*----- event listeners -----*/
$buttonEl.click(init); //click to reset game
$gameBoardEl.on('click', '.square', handleClick)


/*----- functions -----*/
init(); //initial load of game

function init() {
    winner = false;
    turn = 1;
    gameBoard = new Array(9).fill(null);
    render();
}

function handleClick(e) {
    const position = e.target.dataset.index;
    if(gameBoard[position]) return; //exit the function immediately 
    gameBoard[position] = turn;
    console.log(gameBoard);
    turn *= -1;
    winner = getWinner();
    render();
}

function render() {
    gameBoard.forEach(function (value, index) {
        $squareEls.eq(index).text(PLAYERS[value]);       
    })
    if(!winner) {
        $messageEl.text(`${PLAYERS[turn]}'s Turn`);
    } else if (winner === 'T') {
        $messageEl.text('Its a Tie');
    } else {
        $messageEl.text(`${PLAYERS[winner]} Wins!`)
    }
}

function getWinner() {
    for (let i = 0; i < COMBOS.length; i++) {
        if (Math.abs(gameBoard[COMBOS[i][0]] + gameBoard[COMBOS[i][1]] + gameBoard[COMBOS[i][2]]) === 3) {
            return gameBoard[COMBOS[i][0]];
        }
    }
    if (gameBoard.includes(null)) return false;
    return 'T';
}