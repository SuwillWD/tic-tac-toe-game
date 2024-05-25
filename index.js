const gameboard = (function () {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = "";
        }
    }

    const getBoard = () => board;

    const markCell = (row, col, playerToken) => {
        if (board[row][col]) return;

        board[row][col] = playerToken;
    }

    const printBoard = () => {
        console.table(board);
    }
    

    return {getBoard, markCell, printBoard};
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
        checkMove,
        playRound,
        getActivePlayer
    }
})();

const screenController = function () {
    const infoDiv = document.querySelector('.info-box');
    const gameDiv = document.querySelector('.game-board');
    
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
        
    };

    gameDiv.addEventListener('click', (e) => {
        gameController.playRound(e.target.dataset.rowIndex, e.target.dataset.colIndex);
        updateScreen();
    });
    

    updateScreen();
}

screenController();