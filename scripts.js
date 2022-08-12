//Missing Functions
//
//GameBoard Module
const gameboard = (() => {
  //Create an Array that represents the gameboard
  let board = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
  let turns = 1;
  //Fetch gameboard button elements
  let btns = Array.from(document.getElementsByClassName("field"));

  //Method for printing the token in the chosen field (button)
  btns.forEach((btn) => {
    btn.onclick = function (event) {
      btn.innerHTML = playerModule.player1.turn === true ? "X" : "O";
      currentPlayer =
        playerModule.player1.turn === true
          ? playerModule.player1
          : playerModule.player2;

      btn.disabled = true;
      playerModule.player1.turn = !playerModule.player1.turn;
      turns++;
      mapPositions();
      comparePosition();
    };
  });
  const winConditions = [
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"],
    ["A1", "B2", "C3"],
    ["A3", "B2", "C1"],
  ];

  const winnerParagraph = document.getElementById("winner");
  winnerParagraph.innerHTML = "";

  const mapPositions = () => {
    currentPlayer.position = [];
    btns.forEach((btn) => {
      if (btn.innerHTML === currentPlayer.token) {
        currentPlayer.position.push(btn.id);
      }
    });
  };

  const comparePosition = () => {
    //Clears property to avoid pushing duplicates.
    currentPlayer.finalPosition = [];

    //Loops Over Every Combination
    winConditions.forEach((combination) => {
      //For Every Combination, loops over every posible field.
      combination.forEach((field) => {
        //Checks if the current marked positions have a coincidence and pushes it.
        if (
          currentPlayer.position.includes(field) === true &&
          currentPlayer.finalPosition.includes(field) === false
        ) {
          currentPlayer.finalPosition.push(field);
        }
      });
      checkWinner();
      currentPlayer.finalPosition = [];
    });
  };
  const checkWinner = () => {
    winConditions.forEach((combination) => {
      if (currentPlayer.finalPosition.toString() === combination.toString()) {
        winnerParagraph.innerHTML = `${currentPlayer.name} is the winner`;
        btns.forEach((btn) => {
          btn.disabled = true;
        });
      }
      // } else if (turns === 10) {
      //   winnerParagraph.innerHTML = "It's a draw";
      // }
    });
  };
  //Restart Button
  const restartBtn = document.getElementById("restart");
  restartBtn.onclick = function (event) {
    //Reset Turn counter and status
    turns = 1;
    playerModule.player1.turn = true;
    playerModule.player2.turn = false;
    winnerParagraph.innerHTML = "";

    //Clean Board
    btns.forEach((btn) => {
      btn.innerHTML = "";
      btn.disabled = false;
    });
    //Re-enable Player Token Buttons
    playerModule.btns.forEach((btn) => {
      btn.disabled = false;
    });
  };
})();

//Player Module
const playerModule = (() => {
  //Fetch token btns
  let btns = Array.from(document.getElementsByClassName("choosePlayer"));

  //Player Factory Function
  const playerFactory = (player, token, turn) => {
    const position = [];
    const finalPosition = ["hello"];
    return { token, turn, position, name: player, finalPosition };
  };

  const player1 = playerFactory("player1", "X", true, true);
  const player2 = playerFactory("player2", "O", false, false);

  //Creates players based on token selection and disable token
  btns.forEach((btn) => {
    btn.onclick = function (event) {
      setPlayers(btn);
    };
  });

  //Create Players Function
  const setPlayers = function (btn) {
    if (btn.innerHTML === "X") {
      player1.status = true;
      player2.status = false;
    } else if (btn.innerHTML === "O") {
      player1.status = false;
      player2.status = true;
    }
    btns.forEach((btn) => {
      btn.disabled = true;
    });
  };

  return { btns, player1, player2 };
})();

//GameFlow Module:
