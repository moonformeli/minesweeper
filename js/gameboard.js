const cellBlock = document.getElementById('cellblock');

const cells = createArrayToTrackCells(9);
const mines = createMines(9, 10);
const marks = createMarks(9, mines);

/**
 * create an empty array that is 2-dimensions array
 * @param {number} n the size of the game board
 * @param {Types} defaultValue default is Types.Closed
 */
function createEmpty2DimensionArray(n, defaultValue = Types.Closed) {
  return new Array(n + 2)
    .fill(defaultValue)
    .map(() => new Array(n + 2).fill(defaultValue));
}

/**
 * create an array that has references to each cell
 * @param {number} n the size of the game board
 */
function createArrayToTrackCells(n) {
  const cellBlock = document.getElementById('cellblock');
  const cells = createEmpty2DimensionArray(n);

  // give it a reference to an each cell
  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      cells[i][j] = cellBlock.querySelector(
        `.row:nth-child(${i}) .cell:nth-child(${j})`
      );
    }
  }

  return cells;
}

/**
 * create an array that has mines, they are placed randomly
 * @param {number} n the size of the game board
 * @param {number} mineCount the number of mines
 */
function createMines(n, mineCount) {
  const mines = createEmpty2DimensionArray(n);
  let leftMines = mineCount;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  while (leftMines > 0) {
    const row = getRandomInt(1, n);
    const col = getRandomInt(1, n);

    if (mines[row][col] === Types.Closed) {
      leftMines -= 1;
      mines[row][col] = Types.Mine;
    }
  }

  return mines;
}

/**
 * create an array that marks where mines are and how many mines are around a cell that doesn't have a mine
 * @param {number} n the size of the game board
 * @param {number[][]} mines array with location information of where mines are
 */
function createMarks(n, mines) {
  const marks = createEmpty2DimensionArray(n, Types.Opened);

  // adjance 8 cells
  const dx = [-1, 0, 1, -1, 1, -1, 0, 1];
  const dy = [-1, -1, -1, 0, 0, 1, 1, 1];

  // iterates over the marks and mark the number of how many adjacent mines are of a cell
  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      for (let k = 0; k < dx.length; k += 1) {
        const posX = i + dx[k];
        const posY = j + dy[k];

        if (mines[posX][posY] === Types.Mine) {
          marks[i][j] += 1;
        }
      }
    }
  }

  return marks;
}

function displayMines(n, mines) {
  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (mines[i][j] === Types.Mine) {
        cells[i][j].classList = [];
        cells[i][j].classList.add('cell', 'mine');
      }
    }
  }
}

function displayMarks(n, marks) {
  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (mines[i][j] === Types.Mine) {
        continue;
      }

      cells[i][j].classList = [];
      cells[i][j].classList.add('cell');

      if (marks[i][j] === Types.Closed) {
        cells[i][j].classList.add('pressed');
      } else {
        cells[i][j].classList.add(`cell-number-${marks[i][j]}`);
      }
    }
  }
}

displayMines(9, mines);
displayMarks(9, marks);
