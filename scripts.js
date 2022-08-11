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
      let position = btn.id.split("");
      if (turns % 2 === 0) {
        playerModule.player2.rows.push(position[0]);
        playerModule.player2.columns.push(position[1]);
        console.log(`Player 2 Rows: ${playerModule.player2.rows}`);
        console.log(`Player 2 Columns: ${playerModule.player2.columns}`);
      } else {
        playerModule.player1.rows.push(position[0]);
        playerModule.player1.columns.push(position[1]);
        console.log(`Player 1 Rows: ${playerModule.player1.rows}`);
        console.log(`Player 1 Columns: ${playerModule.player1.columns}`);
      }

      btn.disabled = true;
      playerModule.player1.turn = !playerModule.player1.turn;
      turns++;
    };
  });

  //Restart Button
  const restartBtn = document.getElementById("restart");
  restartBtn.onclick = function (event) {
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
  const playerFactory = (_player, token, turn, status) => {
    const rows = [];
    const columns = [];
    return { token, turn, rows, columns };
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
