const mineBoard = document.getElementById('mineboard');
const timeBoard = document.getElementById('timeboard');
const gameStartButton = document.getElementById('gamestart');

function displayMineBoard(mines) {
  // ex) if mines = 123, stringedMines = ['1', '2', '3']
  const stringedMines = String(mines).split('');

  stringedMines.forEach((mineCount, i) => {
    // reset the class
    mineBoard.children[i].classList = [];
    mineBoard.children[i].classList.add(`number-${mineCount}`);
  });
}

function displayTimeBoard(time) {
  // ex) if time = 123, stringedTime = ['1', '2', '3']
  const stringedTime = String(time).padStart(3, '0').split('');

  stringedTime.forEach((timeCount, i) => {
    // reset the class
    timeBoard.children[i].classList = [];
    timeBoard.children[i].classList.add(`number-${timeCount}`);
  });
}

// type = 'win' | 'lose'
function changeGameStatus(type) {
  gameStartButton.classList = [];

  if (type === 'win') {
    gameStartButton.classList.add('face', 'win');
  } else if (type === 'lose') {
    gameStartButton.classList.add('face', 'lose');
  }
}
