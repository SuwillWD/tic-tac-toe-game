const gameboard = (function () {
    const rows = 3;
    const columns = 3;
    let board = [];

    const resetBoard = () => {

        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = "";
            }
        }
    
    }

    resetBoard();
    
    const getBoard = () => board;

    const markCell = (row, col, playerToken) => {
        if (board[row][col]) return;

        board[row][col] = playerToken;
    }

    const printBoard = () => {
        console.table(board);
    }
    

    return {getBoard, markCell, printBoard, resetBoard};
})();


const gameController = (function (
    playerOneName = "Player 1",
    playerTwoName = "Player 2"
) {

    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }

    ];

    let activePlayer = players[0];

    const switchPlayer = function() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
    }

    const getActivePlayer = () => activePlayer;

    const startNewRound = () => {
        gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn...`);
    } 

    const checkMove = (row, col) => {
        return gameboard.getBoard()[row][col] === '' ? false : true;
    }; 

    const checkWinner = () => {

        const board = gameboard.getBoard();

        // check row winning conditions
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][2] !== "") {
                gameboard.printBoard();
                console.log(`${getActivePlayer().name} is the winner!`);
                return 1;
            }
        }

        // check column winning conditions
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] !== "") {
                gameboard.printBoard();
                console.log(`${getActivePlayer().name} is the winner!`);
                return 1;
            }
        }

        // check diagonal winning conditions
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] !== "") {
            gameboard.printBoard();
            console.log(`${getActivePlayer().name} is the winner!`);
                return 1;
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] !== "") {
            gameboard.printBoard();
            console.log(`${getActivePlayer().name} is the winner!`);
                return 1;
        }

        // check draw condition
        let emptyCell = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") emptyCell++;
            }
        }
        if (emptyCell === 0) {
            gameboard.printBoard();
            console.log("It's a draw!");
            return 1;
        }

    }

    const playRound = (row, col) => {
        
        if (checkMove(row, col)) {
            console.log(`Enter a valid cell.`);
            startNewRound();
            return;
        }

        console.log(`${getActivePlayer().name} marked cell at ${row} x ${col}...`);
        gameboard.markCell(row, col, getActivePlayer().token);


        let thereIsAWinner = checkWinner();
        if (thereIsAWinner) return;
        switchPlayer();
        startNewRound();
    };

    startNewRound();

    return {
        players,
        checkMove,
        playRound,
        getActivePlayer,
        checkWinner
    }
})();

const screenController = (function () {
    const infoDiv = document.querySelector('.info-box');
    const gameDiv = document.querySelector('.game-board');
    const model = document.getElementById('winner-box');
    const winnerText = document.querySelector('#winner-box h1');
    const startScreenBtn = document.querySelector('#start-screen');
    const playAgainBtn = document.querySelector('#play-again');
    const play = document.getElementById('play');
    const startScreen = document.getElementById('start');
    
    startScreen.showModal();
    
    const updateScreen = () => {
        
        const board = gameboard.getBoard();
        const activePlayer = gameController.getActivePlayer().name;
        // clear gameDiv 
        gameDiv.textContent = "";

        // update info div
        infoDiv.textContent = `${activePlayer}'s turn...`;

        // Render board
        board.forEach((row, index1) => {
            row.forEach((column, index2) => {

                // create buttons for the game cells
                let cellBtn = document.createElement('button');
                cellBtn.dataset.rowIndex = index1;
                cellBtn.dataset.colIndex = index2;
                cellBtn.textContent = board[index1][index2];
                gameDiv.appendChild(cellBtn); 
            });
        });

        const renderWinner = function() {
            if (gameController.checkWinner()) {
                winnerText.textContent = `Congratulations! ${activePlayer} is the winner!`;
                model.showModal();
                return 1;
            }
            return null;
        }

        return {
            renderWinner
        }
        
    };

    const renderInvalidMove = function() {
        infoDiv.textContent = 'Click on a valid cell.';
    }

    gameDiv.addEventListener('click', (e) => {

        const rowIndex = e.target.dataset.rowIndex;
        const colIndex = e.target.dataset.colIndex;

        const validMove = gameController.checkMove(rowIndex, colIndex);
        if (validMove) {
            renderInvalidMove();
            return;
        }   

        gameController.playRound(rowIndex, colIndex);
        if (updateScreen().renderWinner()) {
            return;
        }
        updateScreen();
    });

    playAgainBtn.addEventListener('click', () => {
        gameboard.resetBoard();
        model.close();
        updateScreen();
    });

    startScreenBtn.addEventListener('click', () => {
        gameboard.resetBoard();
        model.close();
        updateScreen();
        startScreen.showModal();
    });

    play.addEventListener('click', (e) => {

        const form = document.getElementById('start-form');
        const formData = new FormData(form);

        gameController.players[0].name = formData.get('player1');
        gameController.players[1].name = formData.get('player2');

        e.preventDefault();
        updateScreen();
        startScreen.close();
    });
    
})();



