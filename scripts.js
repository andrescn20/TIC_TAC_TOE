//Missing Functions
//
//GameBoard Module
const gameFLow = (() => {
  //Initialize variable to count turns
  let turns = 1;
  //Fetch gameboard button elements and save them in array
  let btns = Array.from(document.getElementsByClassName("field"));

  //DOM Element for displaying who won.
  const winnerParagraph = document.getElementById("winner");
  winnerParagraph.innerHTML = "";

  //Add actions for every click on an empty field:
  btns.forEach((btn) => {
    //Loops through the array of buttons to add functions and change relevant conditions
    btn.onclick = function (event) {
      btn.innerHTML = playerModule.player1.active === true ? "X" : "O"; //Determines token to write based on active plaver
      currentPlayer =
        playerModule.player1.active === true
          ? playerModule.player1
          : playerModule.player2; //Defines Current Player to simplify certain functions

      btn.disabled = true; //Disables the used field
      playerModule.player1.active = !playerModule.player1.active; //Defines the active player for next turn.
      turns++; // +1 to the turn counter
      mapPositions(); //Saves,  for every player, used positions until now.
      comparePosition(); //Compares used positions to "winning combinations".
    };
  });

  //Defining the 8 possible conditions for a player to win.
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

  //After a player selects a field, loops through the whole board to save used positions until now (for the current player)
  const mapPositions = () => {
    currentPlayer.position = []; //Cleans past save to avoid duplicates
    btns.forEach((btn) => {
      if (btn.innerHTML === currentPlayer.token) {
        currentPlayer.position.push(btn.id); //***Fields are identified by their Id.
      }
    });
  };
  //*** Field's Ids are based on their position: Id = RowColumn. Rows: A B C and Columns: 1 2 3

  //Compares current positioning of the player with the possible winning combinations to determine if player won.
  const comparePosition = () => {
    //Clears last saved iteration to avoid duplicates
    currentPlayer.finalPosition = [];

    //Loops Over Every Combination
    winConditions.forEach((combination) => {
      //For Every Combination, loops over every posible field.
      combination.forEach((field) => {
        //Checks if the current marked positions have a coincidence with current combination and pushes it
        //This 'Cleans' field positions that are not part of current compared winning combination.
        //Loops comparing with every possible combination or until win condition is met.
        if (
          currentPlayer.position.includes(field) === true &&
          currentPlayer.finalPosition.includes(field) === false
        ) {
          currentPlayer.finalPosition.push(field);
        }
      });
      checkWinner(); //Checks if current position has full coincidence with current combination
      currentPlayer.finalPosition = []; //Resets if theres no coincidence to start next comparison
    });
  };
  const checkWinner = () => {
    //Simply compares the 'cleaned' position to current combination
    winConditions.forEach((combination) => {
      if (currentPlayer.finalPosition.toString() === combination.toString()) {
        winnerParagraph.innerHTML = `${currentPlayer.name} is the winner`;
        btns.forEach((btn) => {
          btn.disabled = true;
        }); //If theres a coincidence, winner is announced and buttons are disabled. Otherwise, it just continues
      }
    });
  };

  //Restart Button
  const restartBtn = document.getElementById("restart");
  restartBtn.onclick = function (event) {
    //Reset Turn counter and active player for
    turns = 1;
    playerModule.player1.turn = true;
    playerModule.player2.turn = false;
    winnerParagraph.innerHTML = ""; //Cleans winner announcement paragraph

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
  const playerFactory = (player, token, active) => {
    const position = [];
    const finalPosition = ["hello"];
    return { token, active, position, name: player, finalPosition };
  };
  //Create Player Objects
  const player1 = playerFactory("player1", "X", true, true);
  const player2 = playerFactory("player2", "O", false, false);

  //Creates players based on token selection and disable token
  // btns.forEach((btn) => {
  //   btn.onclick = function (event) {
  //     setPlayers(btn);
  //   };
  // });

  //Create Players Function
  // const setPlayers = function (btn) {
  //   if (btn.innerHTML === "X") {
  //     player1.status = true;
  //     player2.status = false;
  //   } else if (btn.innerHTML === "O") {
  //     player1.status = false;
  //     player2.status = true;
  //   }
  //   btns.forEach((btn) => {
  //     btn.disabled = true;
  //   });
  // };

  return { btns, player1, player2 };
})();

//GameFlow Module:
