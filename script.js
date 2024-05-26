const gameboard = (function () {
  let board = [];
  const rows = 3;
  const columns = rows; //do I need it?

  const initBoard = function () {
    board = [];

    for (let i = 0; i < 3; i++) {
      let column = [];
      for (let j = 0; j < 3; j++) {
        let cell = {
          card: null,
          position: i * 3 + j,
        };
        column.push(cell);
      }
      board.push(column);
    }
    console.log("Board initialized empty");
  };

  initBoard();

  const getBoard = () => board;

  return { getBoard, initBoard };
})();

const players = (function () {
  const player = {
    name: "Player",
    score: 5, // represents the number of cards owned at anytime
  };

  const opponent = {
    name: "Opponent",
    score: 5,
  };

  let activePlayer = player;

  const toggleActivePlayer = function () {
    activePlayer = activePlayer == player ? opponent : player;
  };

  const getActivePlayer = () => activePlayer;
  const getPlayer = () => player;
  const getOpponent = () => opponent;

  return { toggleActivePlayer, getActivePlayer, getPlayer, getOpponent };
})();

const deck = (function () {
  const playerDeck = [];
  const opponentDeck = [];
  const decks = [playerDeck, opponentDeck];
  const deckSize = 5;
  let board = gameboard.getBoard();

  function setStat() {
    // sets a number from 0 to 10
    let stat = Math.floor(Math.random() * 11) % 11;
    return stat;
  }

  const initDecks = function () {
    for (let i = 0; i < decks.length; i++) {
      for (let j = 0; j < deckSize; j++) {
        const card = {
          id: deckSize * i + j, //sets a progressive number from 0 (0, 1, 2, ...)
          owner: i == 0 ? players.getPlayer().name : players.getOpponent().name,
          top: setStat(),
          right: setStat(),
          bottom: setStat(),
          left: setStat(),
        };
        decks[i].push(card);
      }
    }
  };
  initDecks();

  //for testing purposes only
  function fullfillBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let d = Math.floor(Math.random() * 10) % 2; // random deck
        let c = Math.floor(Math.random() * 10) % 5; // random card
        let randomCard = decks[d][c];

        board[i][j].card = randomCard;
      }
    }
    console.log("Board fullfilled");
  }
  fullfillBoard();

  return { decks };
})();

const game = (function () {
  board = gameboard.getBoard();

  function checkAvailability(row, column) {
    return board[row][column].card == null;
  }

  function getDefenders(row, column) {
    let defenders = [];
    positionIndex = row * 3 + column;

    switch (positionIndex) {
      case 0:
        if (checkAvailability(row, column + 1) == false) {
          defenders.push(board[row][column + 1].card);
        }
        if (checkAvailability(row + 1, column) == false) {
          defenders.push(board[row + 1][column].card);
        }
        break;

      case 1:
        if (checkAvailability(row, column + 1) == false) {
          defenders.push(board[row][column + 1].card);
        }
        if (checkAvailability(row + 1, column) == false) {
          defenders.push(board[row + 1][column].card);
        }
        if (checkAvailability(row, column - 1) == false) {
          defenders.push(board[row][column - 1].card);
        }
        break;

      case 2:
        if (checkAvailability(row + 1, column) == false) {
          defenders.push(board[row + 1][column].card);
        }
        if (checkAvailability(row, column - 1) == false) {
          defenders.push(board[row][column - 1].card);
        }
        break;

      case 3:
        if (checkAvailability(row - 1, column) == false) {
          defenders.push(board[row - 1][column].card);
        }
        if (checkAvailability(row, column + 1) == false) {
          defenders.push(board[row][column + 1].card);
        }
        if (checkAvailability(row + 1, column) == false) {
          defenders.push(board[row + 1][column].card);
        }
        break;

      case 4:
        if (checkAvailability(row - 1, column) == false) {
          defenders.push(board[row - 1][column].card);
        }
        if (checkAvailability(row, column + 1) == false) {
          defenders.push(board[row][column + 1].card);
        }
        if (checkAvailability(row + 1, column) == false) {
          defenders.push(board[row + 1][column].card);
        }
        if (checkAvailability(row, column - 1) == false) {
          defenders.push(board[row][column - 1].card);
        }
        break;

      case 5:
        if (checkAvailability(row - 1, column) == false) {
          defenders.push(board[row - 1][column].card);
        }
        if (checkAvailability(row + 1, column) == false) {
          defenders.push(board[row + 1][column].card);
        }
        if (checkAvailability(row, column - 1) == false) {
          defenders.push(board[row][column - 1].card);
        }
        break;

      case 6:
        if (checkAvailability(row - 1, column) == false) {
          defenders.push(board[row - 1][column].card);
        }
        if (checkAvailability(row, column + 1) == false) {
          defenders.push(board[row][column + 1].card);
        }
        break;

      case 7:
        if (checkAvailability(row - 1, column) == false) {
          defenders.push(board[row - 1][column].card);
        }
        if (checkAvailability(row, column + 1) == false) {
          defenders.push(board[row][column + 1].card);
        }
        if (checkAvailability(row, column - 1) == false) {
          defenders.push(board[row][column - 1].card);
        }
        break;

      case 8:
        if (checkAvailability(row, column - 1) == false) {
          defenders.push(board[row][column - 1].card);
        }
        if (checkAvailability(row - 1, column) == false) {
          defenders.push(board[row - 1][column].card);
        }
        break;
    }

    return defenders;
  }

  return { checkAvailability, getDefenders };
})();
