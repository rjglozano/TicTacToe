document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tiles');
    const reset = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameover = false;
    const player = document.getElementById('player');
    const winnerBoard = document.querySelector('.winnerBoard');
    let gameBoard = ['', '', '', '', '', '', '', '', ''];




    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
            if (!gameover && gameBoard[index] === '') {
                tile.textContent = currentPlayer;
                gameBoard[index] = currentPlayer;

                if (checkWinner(currentPlayer)) {
                    const winnerMessage = `${currentPlayer} WINS THE GAME!`;
                    player.textContent = winnerMessage;
                    const winPattern = getWinningPattern(currentPlayer);
                        
                    winPattern.forEach(index => {
                            tiles[index].classList.add(`winner-tile`);
                        });   

                    winnerBoard.classList.add('winner');
                    gameover = true;

                    setTimeout(() => {
                        alert(winnerMessage)}, 500)                
            } else if (Array.from(tiles).every(tile => tile.textContent !== '')) {
                    const tieMessage = "THE MATCH IS DRAW, TRY AGAIN!!!";
                    player.textContent = tieMessage;
                    winnerBoard.classList.add('tie');
                    gameover = true;
                    setTimeout(() => {
                        alert("It's a draw!")}, 50)
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    player.textContent = `Player ${currentPlayer} to move!`;


                }
            }
        });
    });



      // Check for a winner
    function checkWinner(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return tiles[a].textContent === player &&
                tiles[b].textContent === player &&
                tiles[c].textContent === player;
        });
    }
        // Check for winning pattern
    function getWinningPattern(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        return winPatterns.find(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] === player &&
                gameBoard[b] === player &&
                gameBoard[c] === player;
        });
    }
    
    

    // Reset the game
    reset.addEventListener('click', () => {
        tiles.forEach((tile, index) =>{
            tile.textContent = '';
            tile.classList.remove('winner-tile');
            gameBoard[index] = ''
        });

        currentPlayer = 'X';
        player.textContent = 'Player X to move!'
        winnerBoard.classList.remove('winner');
        winnerBoard.classList.remove('tie');
        gameover = false;
    });

});






