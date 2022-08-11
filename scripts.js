const buttonFactory = (name) => {
  let usable = true;
  return { name, usable };
};

//GameBoard Module
const gameboard = (() => {
  //Create an Array that represents the gameboard
  let board = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

  //Fetch gameboard button elements
  let btns = Array.from(document.getElementsByClassName("field"));

  //Method for printing the token in the chosen field (button)
  btns.forEach((btn) => {
    btn.onclick = function (event) {
      btn.innerHTML = playerModule.player2.token;
      btn.disabled = true;
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

//Players Factory
const playerModule = (() => {
  //Fetch token btns
  let btns = Array.from(document.getElementsByClassName("choosePlayer"));

  //Player Factory Function
  const playerFactory = (_player, token, _turn, status) => {
    return { token, status };
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

// const gameFlow = ()();
