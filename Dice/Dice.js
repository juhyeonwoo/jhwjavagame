const diceElement = document.getElementById('dice');
const player1ScoreElement = document.getElementById('player1Score');
const player2ScoreElement = document.getElementById('player2Score');
const resultElement = document.getElementById('result');

let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let round = 1;

function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;

    diceElement.textContent = `주사위 결과: ${dice1}, ${dice2}, ${dice3}`;

    let roundScore = dice1 + dice2 + dice3;
    if (dice1 === dice2 && dice2 === dice3) {
        roundScore *= 2;
    }

    if (currentPlayer === 1) {
        player1Score += roundScore;
        player1ScoreElement.textContent = player1Score;
    } else {
        player2Score += roundScore;
        player2ScoreElement.textContent = player2Score;
    }

    round++;

    if (round > 20) {
        endGame();
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
}


function endGame() {
    resultElement.textContent = player1Score > player2Score ? '플레이어 1 승리!' : '플레이어 2 승리!';
    document.getElementById('rollBtn').disabled = true;
}

document.getElementById('rollBtn').addEventListener('click', rollDice);
