// Colore delle carte assegnato erroneamente
// verifica - incapace!

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
    console.log(board);
  };

  initBoard();

  function positionTo2D(position) {
    let row = Math.floor(position / 3);
    let column = position % 3;
    return { row, column };
  }

  const getBoard = () => board;

  return { getBoard, initBoard, positionTo2D };
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
    return activePlayer;
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

  function setStat() {
    // sets a random number from 1 to 10
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
    players.getPlayer().deck = playerDeck;
    players.getOpponent().deck = opponentDeck;
    console.log("Decks intialized");
  };
  initDecks();

  return { decks, initDecks };
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

  function placeCard(card, position) {
    let row = Math.floor(position / 3);
    let column = position % 3;

    if (isOccupied(row, column) != true) {
      board[row][column].card = card;
      DOM.printCard(card, position);
    }
  }

  function getDefendersCell(position) {
    let row = Math.floor(position / 3);
    let column = position % 3;
    defenders = [];

    // need to implement condition to avoid getting friendly card
    // FIX!!

    switch (position) {
      case 0:
        if (
          isOccupied(row, column + 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column + 1]);
        }
        if (
          isOccupied(row + 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row + 1][column]);
        }
        break;

      case 1:
        if (
          isOccupied(row, column + 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column + 1]);
        }
        if (
          isOccupied(row + 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row + 1][column]);
        }
        if (
          isOccupied(row, column - 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column - 1]);
        }
        break;

      case 2:
        if (
          isOccupied(row + 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row + 1][column]);
        }
        if (
          isOccupied(row, column - 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column - 1]);
        }
        break;

      case 3:
        if (
          isOccupied(row - 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row - 1][column]);
        }
        if (
          isOccupied(row, column + 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column + 1]);
        }
        if (
          isOccupied(row + 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row + 1][column]);
        }
        break;

      case 4:
        if (
          isOccupied(row - 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row - 1][column]);
        }
        if (
          isOccupied(row, column + 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column + 1]);
        }
        if (
          isOccupied(row + 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row + 1][column]);
        }
        if (
          isOccupied(row, column - 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column - 1]);
        }
        break;

      case 5:
        if (
          isOccupied(row - 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row - 1][column]);
        }
        if (
          isOccupied(row + 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row + 1][column]);
        }
        if (
          isOccupied(row, column - 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column - 1]);
        }
        break;

      case 6:
        if (
          isOccupied(row - 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row - 1][column]);
        }
        if (
          isOccupied(row, column + 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column + 1]);
        }
        break;

      case 7:
        if (
          isOccupied(row - 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row - 1][column]);
        }
        if (
          isOccupied(row, column + 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column + 1]);
        }
        if (
          isOccupied(row, column - 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column - 1]);
        }
        break;

      case 8:
        if (
          isOccupied(row - 1, column) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row - 1][column]);
        }
        if (
          isOccupied(row, column - 1) &&
          board[row][column].card.owner != activePlayer.name.toLocaleLowerCase()
        ) {
          defenders.push(board[row][column - 1]);
        }

        break;
    }

    console.log("Defenders List");
    console.log(defenders);
    return defenders;
  }

  const getAttacker = function (cardIndex) {
    if (activePlayer == players.getPlayer()) {
      attacker = activePlayer.deck[cardIndex];
    }
    if (activePlayer == players.getOpponent()) {
      // needs to -5 as card index is from 0 to 8 qhile cards in deck are indexed from 0 to 4
      attacker = activePlayer.deck[cardIndex - 5];
    }
    console.log("Attacker set to: ", attacker);
  };

  const selectBattleCell = function (cell) {
    let row = Math.floor(cell.classList[0].substring(9) / 3);
    let column = cell.classList[0].substring(9) % 3;

    console.log(cell.classList[0].substring(9), row, column);

    if (!isOccupied(row, column)) {
      battleCell = board[row][column];
      console.log("Battle Cell set to: ", battleCell);
      return true;
    } else {
      console.log("Position already taken");
      return false;
    }
  };

  function setCardColor(card, position) {
    if (card.owner == players.getPlayer().name) {
      console.log(
        "Setting color of card id",
        card.id,
        "in position ",
        position
      );
      DOM.cardDivs[position].setAttribute("class", "card player");
    }
    if (card.owner == players.getOpponent().name) {
      console.log(
        "Setting color of card id",
        card.id,
        "in position ",
        position
      );
      console.log("CardDiv = ", DOM.cardDivs);
      DOM.cardDivs[position].setAttribute("class", "card opponent");
    }
  }

  const playBattle = function (cell) {
    if (selectBattleCell(cell)) {
      placeCard(attacker, battleCell.position);
      getDefendersCell(battleCell.position);

      let attackerPosition = battleCell.position;
      defenders.forEach((defenderCell) => {
        let defender = defenderCell.card;

        switch (defenderCell.position) {
          case attackerPosition - 3:
            console.log("Fight TOP");
            if (attacker.top > defender.bottom) {
              defender.owner = activePlayer.name;
              console.log("Fight won against TOP");
            }
            break;
          case attackerPosition + 1:
            console.log("Fight RIGHT");
            if (attacker.right > defender.left) {
              defender.owner = activePlayer.name;
              console.log("Fight won against RIGHT");
            }
            break;
          case attackerPosition + 3:
            console.log("Fight BOTTOM");
            if (attacker.bottom > defender.top) {
              defender.owner = activePlayer.name;
              console.log("Fight won against BOTTOM");
            }
            break;
          case attackerPosition - 1:
            console.log("Fight LEFT");
            if (attacker.left > defender.right) {
              defender.owner = activePlayer.name;
              console.log("Fight won against LEFT");
            }
            break;
        }
        setCardColor(defender, defenderCell.position);
      });
      DOM.removeCardFromHand(attacker.id);
      if (checkEnd()) {
        // invoke function to print reset
        DOM.printReset();
      }
      attacker = null;
      activePlayer = players.toggleActivePlayer();
    }
  };

  const checkEnd = function () {
    let counter = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j].card != null) {
          counter++;
        }
      }
    }
    return counter == 9;
  };

  return {
    playBattle,
    isOccupied,
    getDefendersCell,
    getAttacker,
    selectBattleCell,
    placeCard,
    setCardColor,
    activePlayer,
    battleCell,
    defenders,
  };
})();

const eventHandler = (function () {
  function addEventToDeck(element) {
    element.addEventListener("click", () => {
      // the number 2 is the children div with class 'id' with value 'innerHTML'
      game.getAttacker(element.children[2].innerHTML);
      console.log(element.children[2].innerHTML);
    });
  }

  function addEventToCell(element) {
    element.addEventListener("click", () => {
      game.playBattle(element);
    });
  }

  function addEventToReset(element) {
    element.addEventListener("click", () => {
      gameboard.initBoard();
      deck.initDecks();
      DOM.printDecks();
      DOM.emptyBoard();
    });
  }

  return { addEventToDeck, addEventToCell, addEventToReset };
})();

const DOM = (function () {
  const cardDivs = [, , , , , , , ,];
  const cellDivs = document.querySelectorAll(".cell");
  const playerDeckDiv = document.querySelector(".player-deck");
  const opponentDeckDiv = document.querySelector(".opponent-deck");
  const scorePanelDiv = document.querySelector(".score-panel");
  const gameboardDiv = document.querySelector(".gameboard");

  const removeCardFromHand = function (handIndex) {
    // playerDeckDiv and opponentDeckDiv have dynamic length that changes everytime an element is removed
    // it is require to look for the element to remove
    if (players.getActivePlayer().name == players.getPlayer().name) {
      for (let i = 0; i < playerDeckDiv.children.length; i++) {
        if (playerDeckDiv.children[i].children[2].innerHTML == handIndex) {
          cardToRemove = playerDeckDiv.children[i];
          break;
        }
      }
      playerDeckDiv.removeChild(cardToRemove);
    }
    if (players.getActivePlayer().name == players.getOpponent().name) {
      let cardToRemove = null;
      for (let i = 0; i < opponentDeckDiv.children.length; i++) {
        if (opponentDeckDiv.children[i].children[2].innerHTML == handIndex) {
          cardToRemove = opponentDeckDiv.children[i];
          break;
        }
      }
      opponentDeckDiv.removeChild(cardToRemove);
    }
  };

  const printCard = function (card, position) {
    let r = gameboard.positionTo2D(position).row;
    let c = gameboard.positionTo2D(position).column;

    let cellDiv = document.querySelector(`.position-${position}`);
    let cardDiv = document.createElement("div");
    let pos = document.createElement("div");
    let top = document.createElement("div");
    let id = document.createElement("div");
    let left = document.createElement("div");
    let right = document.createElement("div");
    let bottom = document.createElement("div");

    pos.textContent = position;
    top.textContent = card.top;
    id.textContent = card.id;
    left.textContent = card.left;
    right.textContent = card.right;
    bottom.textContent = card.bottom;

    cardDiv.classList.add("card");
    cardDiv.classList.add(card.owner.toLowerCase());
    pos.classList.add("position");
    top.classList.add("top");
    id.classList.add("id");
    left.classList.add("left");
    right.classList.add("right");
    bottom.classList.add("bottom");

    cardDiv.appendChild(pos);
    cardDiv.appendChild(top);
    cardDiv.appendChild(id);
    cardDiv.appendChild(left);
    cardDiv.appendChild(right);
    cardDiv.appendChild(bottom);
    cellDiv.appendChild(cardDiv);
    cardDivs.splice(position, 1, cardDiv); //1 element at index 'position' is replaced with 'cardDiv'
    console.log(cardDivs);
  };

  const printDecks = function () {
    players.getPlayer().deck.forEach((card) => {
      let cardDiv = document.createElement("div");
      let pos = document.createElement("div");
      let top = document.createElement("div");
      let id = document.createElement("div");
      let left = document.createElement("div");
      let right = document.createElement("div");
      let bottom = document.createElement("div");

      pos.textContent = card.position;
      top.textContent = card.top;
      id.textContent = card.id;
      left.textContent = card.left;
      right.textContent = card.right;
      bottom.textContent = card.bottom;

      cardDiv.classList.add("card");
      cardDiv.classList.add(card.owner.toLowerCase());
      pos.classList.add("position");
      top.classList.add("top");
      id.classList.add("id");
      left.classList.add("left");
      right.classList.add("right");
      bottom.classList.add("bottom");

      cardDiv.appendChild(pos);
      cardDiv.appendChild(top);
      cardDiv.appendChild(id);
      cardDiv.appendChild(left);
      cardDiv.appendChild(right);
      cardDiv.appendChild(bottom);
      playerDeckDiv.appendChild(cardDiv);
      eventHandler.addEventToDeck(cardDiv);
    });

    players.getOpponent().deck.forEach((card) => {
      let cardDiv = document.createElement("div");
      let pos = document.createElement("div");
      let top = document.createElement("div");
      let id = document.createElement("div");
      let left = document.createElement("div");
      let right = document.createElement("div");
      let bottom = document.createElement("div");

      pos.textContent = card.position;
      top.textContent = card.top;
      id.textContent = card.id;
      left.textContent = card.left;
      right.textContent = card.right;
      bottom.textContent = card.bottom;

      cardDiv.classList.add("card");
      cardDiv.classList.add(card.owner.toLowerCase());
      pos.classList.add("position");
      top.classList.add("top");
      id.classList.add("id");
      left.classList.add("left");
      right.classList.add("right");
      bottom.classList.add("bottom");

      cardDiv.appendChild(pos);
      cardDiv.appendChild(top);
      cardDiv.appendChild(id);
      cardDiv.appendChild(left);
      cardDiv.appendChild(right);
      cardDiv.appendChild(bottom);
      opponentDeckDiv.appendChild(cardDiv);
      eventHandler.addEventToDeck(cardDiv);
    });
  };
  printDecks();

  const emptyBoard = function () {
    for (let i = 0; i < gameboardDiv.children.length; i++) {
      while (gameboardDiv.children[i].firstChild) {
        gameboardDiv.children[i].removeChild(
          gameboardDiv.children[i].firstChild
        );
      }
    }
  };

  //function to print Reset Button
  const printReset = function () {
    const resetButton = document.createElement("button");
    resetButton.textContent = "Start New Game";
    scorePanelDiv.appendChild(resetButton);
    eventHandler.addEventToReset(resetButton);
  };

  // set event to playTurn on gameboard Cells
  const assignPlayBattle = (function () {
    cellDivs.forEach((cellDiv) => {
      eventHandler.addEventToCell(cellDiv);
    });
  })();

  return {
    printCard,
    removeCardFromHand,
    printReset,
    printDecks,
    emptyBoard,
    cardDivs,
  };
})();
