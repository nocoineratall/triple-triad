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
          position: i * 3 + j,
          card: null,
        };
        column.push(cell);
      }
      board.push(column);
    }
    console.log("Board initialized empty");
  };

  initBoard();

  // for testing only - helps visualize the board
  // move into DOM controller when finished testing
  const printBoard = function () {
    let gameBoardDiv = document.querySelector(".gameboard");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // prints only occupied cells
        if (board[i][j].card != null) {
          let cell = document.createElement("div");
          let pos = document.createElement("div");
          let top = document.createElement("div");
          let id = document.createElement("div");
          let left = document.createElement("div");
          let right = document.createElement("div");
          let bottom = document.createElement("div");

          pos.textContent = board[i][j].position;
          top.textContent = board[i][j].card.top;
          id.textContent = board[i][j].card.id;
          left.textContent = board[i][j].card.left;
          right.textContent = board[i][j].card.right;
          bottom.textContent = board[i][j].card.bottom;

          cell.setAttribute("class", "cell");
          cell.classList.add(board[i][j].card.owner.toLowerCase());
          pos.setAttribute("class", "position");
          top.setAttribute("class", "top");
          id.setAttribute("class", "id");
          left.setAttribute("class", "left");
          right.setAttribute("class", "right");
          bottom.setAttribute("class", "bottom");

          cell.appendChild(pos);
          cell.appendChild(top);
          cell.appendChild(id);
          cell.appendChild(left);
          cell.appendChild(right);
          cell.appendChild(bottom);
          gameBoardDiv.appendChild(cell);
        }
      }
    }
  };

  const getBoard = () => board;

  return { getBoard, initBoard, printBoard };
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
    // sets a number from 1 to 10
    let stat = Math.floor(Math.random() * 11) % 11;
    return stat == 0 ? 1 : stat;
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
    board[0][0].card = playerDeck[0];
    board[0][1].card = opponentDeck[1];
    board[1][0].card = opponentDeck[0];

    // let rowLenght = 3;
    // let columnLength = 3;

    // for (let i = 0; i < rowLenght; i++) {
    //   for (let j = 0; j < columnLength; j++) {
    //     let d = Math.floor(Math.random() * 10) % 2; // random deck
    //     let c = Math.floor(Math.random() * 10) % 5; // random card
    //     let randomCard = decks[d][c];

    //     board[i][j].card = randomCard;
    //   }
    // }
    console.log("Board fullfilled");
    console.log(board);
  }
  fullfillBoard();
  gameboard.printBoard();

  return { decks };
})();

const game = (function () {
  board = gameboard.getBoard();
  let attacker = null;
  let activePlayer = players.getActivePlayer();
  let battleCell = null;
  let defenders = [];

  function isOccupied(row, column) {
    return board[row][column].card != null;
  }

  function getDefendersCell(positionIndex) {
    let row = Math.floor(positionIndex / 3);
    let column = positionIndex % 3;
    defenders = [];

    // need to implement condition to avoid getting friendly card
    // FIX!!

    switch (positionIndex) {
      case 0:
        if (isOccupied(row, column + 1)) {
          defenders.push(board[row][column + 1]);
        }
        if (isOccupied(row + 1, column)) {
          defenders.push(board[row + 1][column]);
        }
        break;

      case 1:
        if (isOccupied(row, column + 1)) {
          defenders.push(board[row][column + 1]);
        }
        if (isOccupied(row + 1, column)) {
          defenders.push(board[row + 1][column]);
        }
        if (isOccupied(row, column - 1)) {
          defenders.push(board[row][column - 1]);
        }
        break;

      case 2:
        if (isOccupied(row + 1, column)) {
          defenders.push(board[row + 1][column]);
        }
        if (isOccupied(row, column - 1)) {
          defenders.push(board[row][column - 1]);
        }
        break;

      case 3:
        if (isOccupied(row - 1, column)) {
          defenders.push(board[row - 1][column]);
        }
        if (isOccupied(row, column + 1)) {
          defenders.push(board[row][column + 1]);
        }
        if (isOccupied(row + 1, column)) {
          defenders.push(board[row + 1][column]);
        }
        break;

      case 4:
        if (isOccupied(row - 1, column)) {
          defenders.push(board[row - 1][column]);
        }
        if (isOccupied(row, column + 1)) {
          defenders.push(board[row][column + 1]);
        }
        if (isOccupied(row + 1, column)) {
          defenders.push(board[row + 1][column]);
        }
        if (isOccupied(row, column - 1)) {
          defenders.push(board[row][column - 1]);
        }
        break;

      case 5:
        if (isOccupied(row - 1, column)) {
          defenders.push(board[row - 1][column]);
        }
        if (isOccupied(row + 1, column)) {
          defenders.push(board[row + 1][column]);
        }
        if (isOccupied(row, column - 1)) {
          defenders.push(board[row][column - 1]);
        }
        break;

      case 6:
        if (isOccupied(row - 1, column)) {
          defenders.push(board[row - 1][column]);
        }
        if (isOccupied(row, column + 1)) {
          defenders.push(board[row][column + 1]);
        }
        break;

      case 7:
        if (isOccupied(row - 1, column)) {
          defenders.push(board[row - 1][column]);
        }
        if (isOccupied(row, column + 1)) {
          defenders.push(board[row][column + 1]);
        }
        if (isOccupied(row, column - 1)) {
          defenders.push(board[row][column - 1]);
        }
        break;

      case 8:
        if (isOccupied(row - 1, column)) {
          defenders.push(board[row - 1][column]);
        }
        if (isOccupied(row, column - 1)) {
          defenders.push(board[row][column - 1]);
        }

        break;
    }

    return defenders;
  }

  const getAttacker = function () {
    let cardIndex = prompt("Select Attacker card: 0 - 4");
    attacker =
      activePlayer == players.getPlayer()
        ? deck.decks[0][cardIndex]
        : deck.decks[1][cardIndex];
    console.log("Attacker set to: ", attacker);
  };

  const selectBattleCell = function () {
    let row = prompt("Select Row (0 - 2)");
    let column = prompt("Select Column (0 - 2)");

    if (isOccupied(row, column) == false) {
      battleCell = board[row][column];
      console.log("Battle Cell set to: ", battleCell);
    } else {
      console.log("Position already taken");
    }
  };

  const playBattle = function () {
    getAttacker();
    selectBattleCell();
    getDefendersCell(battleCell.position);

    let attackerPosition = battleCell.position;
    defenders.forEach((defenderCell) => {
      let defender = defenderCell.card;

      switch (defenderCell.position) {
        case attackerPosition - 3:
          console.log("Fighting on TOP");
          if (attacker.top > defender.bottom) {
            defender.owner = activePlayer.name;
            console.log("Fight won against defender on TOP");
          }
          break;
        case attackerPosition + 1:
          console.log("Fighting on RIGHT");
          if (attacker.right > defender.left) {
            defender.owner = activePlayer.name;
            console.log("Fight won against defender on RIGHT");
          }
          break;
        case attackerPosition + 3:
          console.log("Fighting on BOTTOM");
          if (attacker.bottom > defender.top) {
            defender.owner = activePlayer.name;
            console.log("Fight won against defender on BOTTOM");
          }
          break;
        case attackerPosition - 1:
          console.log("Fighting on LEFT");
          if (attacker.left > defender.right) {
            defender.owner = activePlayer.name;
            console.log("Fight won against defender on LEFT");
          }
          break;
      }
    });
  };

  return {
    playBattle,
    isOccupied,
    getDefendersCell,
    getAttacker,
    selectBattleCell,
    activePlayer,
    battleCell,
    defenders,
  };
})();
