function gameController() {
  const dimensions = 3;
  let board;

  const intializeBoard = () => {
    board = [];
    for (let i = 0; i < dimensions; i++) {
      board.push([]);
      for (let j = 0; j < dimensions; j++) {
        board[i].push("-");
      }
    }
  };

  const getBoard = () => board;

  const addMark = (row, column, mark) => {
    if (board[row][column] === "-") {
      board[row][column] = mark;
      return true;
    } else return false;
  };

  const checkWinState = (mark) => {
    let filledDiagonalRight = 0;
    let filledDiagonalLeft = 0;

    for (let i = 0; i < dimensions; i++) {
      let filledColumns = 0;
      let filledRows = 0;
      for (let j = 0; j < dimensions; j++) {
        if (board[i][j] === mark) filledColumns++;
        if (board[j][i] === mark) filledRows++;
      }
      if (filledColumns === dimensions) return true;
      if (filledRows === dimensions) return true;

      if (board[i][i] === mark) filledDiagonalRight++;
      if (board[dimensions - (i + 1)][i] === mark) filledDiagonalLeft++;
    }
    if (filledDiagonalRight === dimensions) return true;
    if (filledDiagonalLeft === dimensions) return true;
  };

  const boardFilled = () => {
    const filledRows = board.filter(
      (row) => row.filter((column) => column !== "-").length === dimensions
    );
    if (filledRows.length === dimensions) return true;
  };

  return { intializeBoard, getBoard, addMark, checkWinState, boardFilled };
}

function playerFactory(name, mark) {
  return { name, mark };
}

function displayController() {
  const gameBoard = gameController();
  gameBoardboardFilled.intializeBoard();

  const players = [playerFactory("p1", "x"), playerFactory("p2", "o")];
  let activePlayer = players[0];
  const renderGameBoard = () => {
    const containerDiv = document.getElementById("container");
    containerDiv.replaceChildren();
    const board = gameBoard.getBoard();
    board.forEach((row, rowIndex) => {
      const rowEl = document.createElement("div");
      row.forEach((column, columnIndex) => {
        const cellEl = document.createElement("button");
        cellEl.setAttribute("row", rowIndex);
        cellEl.setAttribute("column", columnIndex);
        cellEl.addEventListener("click", addMark);
        cellEl.textContent = board[rowIndex][columnIndex];
        rowEl.appendChild(cellEl);
      });
      containerDiv.appendChild(rowEl);
    });
  };

  const addMark = (event) => {
    const row = event.target.getAttribute("row");
    const column = event.target.getAttribute("column");

    let validMove = gameBoard.addMark(row, column, activePlayer.mark);
    if (validMove) {
      renderGameBoard();
      checkWinState();
      switchActivePlayer();
    }
  };

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const checkWinState = () => {
    if (gameBoard.checkWinState(activePlayer.mark)) {
      alert(`${activePlayer.name}  wins!`);
      gameBoard.intializeBoard();
      renderGameBoard();
    }
    if (gameBoard.boardFilled()) {
      alert("Draw");
      gameBoard.intializeBoard();
      renderGameBoard();
    }
  };

  renderGameBoard();
}

displayController();
