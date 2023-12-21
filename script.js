document.addEventListener("DOMContentLoaded", function () {
  // Variables that are used in the game
  let currentPlayer = "X"; // Initial player is A (X)

  let gameBoard = ["", "", "", "", "", "", "", "", ""]; //each cell of the game
  let gameActive = true; //state of game
  let playerAWins = 0;
  let playerBWins = 0;

  // Selectors
  const cells = document.querySelectorAll(".cell"); //to select each cell of game
  const restartButton = document.querySelector(".restartButton"); //to select restart button
  const gameName = document.querySelector(".gameName h1"); //to select Title of the Game
  const playerAScore = document.querySelector(".playerAScore");
  const playerBScore = document.querySelector(".playerBScore");

  // Event listener for cell clicks
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  // Event listener for restart button
  restartButton.addEventListener("click", restartGame);

  // Function to handle cell clicks
  function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.dataset.cellIndex; // Extracting the data-cell-index attribute from the clicked cell

    // Checking if the cell is already marked or if the game is over
    if (!gameBoard[cellIndex] && gameActive) {
      // Updating the cell with the current player's mark
      //places either "X" or "O"
      gameBoard[cellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;

      // Checking for a winner or a draw
      if (checkWinner()) {
        announceWinner();
      } else if (checkDraw()) {
        announceDraw();
      } else {
        // Switching to the next player
        switchPlayer();
      }
    }
  }

  // Function to switch players
  function switchPlayer() {
    // Toggles between "X" and "O"
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Removes playerActive from both player positions
    document
      .querySelectorAll(".playerPostionA, .playerPostionB")
      .forEach((playerPosition) => {
        playerPosition.classList.remove("playerActive");
      });

    // Adding playerActive to the current player position
    const currentPlayerPosition =
      currentPlayer === "X" ? ".playerPostionA" : ".playerPostionB";
    document.querySelector(currentPlayerPosition).classList.add("playerActive");
  }

  // Function to check for a winner
  function checkWinner() {
    //all the possible winning combinations
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Iterating over each win pattern
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;

      // Checking if the values at indices a, b, and c in the game board are equal and not null or undefined
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[b] === gameBoard[c]
      ) {
        //if winner is found
        return true;
      }
    }
    //if no winner is found
    return false;
  }

  // Function to announce the winner
  function announceWinner() {
    // Setting the game to inactive
    gameActive = false;

    // Selecting player position elements
    const playerPositionA = document.querySelector(".playerPostionA");
    const playerPositionB = document.querySelector(".playerPostionB");

    // Checking which player won and updating wins accordingly
    if (currentPlayer === "X") {
      // Updating player A's wins
      playerAWins++;
      playerAScore.textContent = playerAWins;

      // Updating game name and style when player A wins
      gameName.textContent = "PLAYER A WON!!!!";
      gameName.style.backgroundColor = "green";
      playerPositionA.classList.add("playerWinner");
    } else {
      playerBWins++;
      playerBScore.textContent = playerBWins;
      gameName.textContent = "PLAYER B WON!!!!";
      gameName.style.backgroundColor = "green";
      playerPositionB.classList.add("playerWinner");
    }
    //changing the restart button to New Game
    restartButton.textContent = "New Game";
  }

  // Function to check for a draw
  function checkDraw() {
    // Checking if the game board does not include any empty cells and there is no winner
    return !gameBoard.includes("") && !checkWinner();
  }

  // Function to announce a draw
  function announceDraw() {
    gameActive = false;
    // Updating UI and style for a draw
    gameName.textContent = "It's a Draw!";
    gameName.style.backgroundColor = "gray";
    restartButton.textContent = "New Game";
  }

  // Function to restart the game
  function restartGame() {
    // Reset game variables
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    // Reset UI
    cells.forEach((cell) => {
      cell.textContent = "";
    });

    gameName.textContent = "Tic-Tac-Toe";
    gameName.style.backgroundColor = "transparent";
    restartButton.textContent = "Restart";

    // Reset player positions
    document
      .querySelectorAll(".playerPostionA, .playerPostionB")
      .forEach((playerPosition) => {
        playerPosition.classList.remove("playerActive");
        playerPosition.classList.remove("playerWinner");
      });
    document.querySelector(".playerPostionA").classList.add("playerActive");
  }
});
