'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // Elements
  const whosTurn = document.querySelector('.turn span');
  const winsXEl = document.querySelector('.winsX span');
  const winsOEl = document.querySelector('.winsO span');
  const drawsEl = document.querySelector('.draws span');
  const statisticBox = document.querySelector('.statistic');
  const cells = document.querySelectorAll('.cell');
  const resetBtn = document.querySelector('.btn-reset');
  const winnerEl = document.querySelector('.winner');

  // Init conditionals
  const data = {
    x: [],
    o: [],
    turnsInTotal() {
      return [...this.x, ...this.o];
    },
    turns: 1,
    xPlayer: 0,
    draws: 0,
    oPlayer: 0,
  };

  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let turn = 'x';
  let playing = true;

  cells.forEach((cell) => {
    cell.addEventListener('click', function (e) {
      if (playing && e.target.className === 'cell') {
        const totalTurns = data.turnsInTotal();
        const cellNum = Number(cell.dataset.cell);

        if (totalTurns.includes(cellNum)) {
          return;
        }
        cell.textContent = turn;
        data[turn].push(cellNum);

        checkWinner(data[turn]);
        switchPlayer();
      }
    });
  });

  function checkWinner(playerTurns) {
    winningCombination.forEach((combination) => {
      const [a, b, c] = combination;

      if (playerTurns.includes(a) && playerTurns.includes(b) && playerTurns.includes(c)) {
        playing = false;

        displayWinner(turn);
        updateUI();
      }
    });

    if (data.turns == 9 && playing) {
      playing = false;

      displayWinner();
      updateUI();
    }
  }

  function switchPlayer() {
    turn = turn === 'x' ? 'o' : 'x';
    whosTurn.textContent = turn;
    data.turns++;
  }

  function displayWinner(whoWon) {
    let text;

    switch (whoWon) {
      case 'x':
        text = 'Winner is X';
        data.xPlayer++;
        break;
      case 'o':
        text = 'Winner is O';
        data.oPlayer++;
        break;
      default:
        text = "It's draw";
        data.draws++;
    }

    winnerEl.textContent = text;

    updateUI();
  }

  function updateUI() {
    winsXEl.textContent = data.xPlayer;
    winsOEl.textContent = data.oPlayer;
    drawsEl.textContent = data.draws;
  }

  function resetUI() {
    turn = 'x';
    playing = true;

    cells.forEach((cell) => (cell.textContent = ''));
    data.o = [];
    data.x = [];
    data.turns = 1;

    whosTurn.textContent = turn;
    winnerEl.textContent = '';
  }

  resetBtn.addEventListener('click', resetUI);
});
