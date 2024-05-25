const gameboard = (function () {
  let board = [];
  const rows = 3;
  const columns = rows;

  //parameter _card is passed for testing purposes only
  const initBoard = function (_card) {
    board = [];
    let cell = {
      card: _card,
      empty: true,
    };

    let column = [];
    for (let j = 0; j < 3; j++) {
      column.push(cell);
    }

    for (let i = 0; i < 3; i++) {
      board.push(column);
    }
    return "board initialized";
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

const decks = (function () {
  const playerDeck = [];
  const opponentDeck = [];
  const decks = [playerDeck, opponentDeck];
  const deckSize = 5;

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
  function placeCard() {
    gameboard.initBoard(playerDeck[0]);
  }

  return { decks, placeCard };
})();

const game = (function () {
  board = gameboard.getBoard();

  function checkAvailability(row, column) {
    return board[column][row].empty == true;
  }

  function getDefenders(row, column) {
    let defenders = [];

    if (checkAvailability(row + 1, column) == true) {
      defenders.push(board[row + 1][column].card);
    }
    if (checkAvailability(row - 1, column) == true) {
      defenders.push(board[row - 1][column].card);
    }
    if (checkAvailability(row, column + 1) == true) {
      defenders.push(board[row][column + 1].card);
    }
    if (checkAvailability(row, column - 1) == true) {
      defenders.push(board[row][column - 1].card);
    }

    return defenders;
  }

  return { checkAvailability, getDefenders };
})();
