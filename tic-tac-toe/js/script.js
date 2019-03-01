import { Board } from "./board.js";

window.addEventListener("load", (event) => {
  /* Contenedor de las celdas. */
  const cellsElement = document.getElementById("cells").children;
  /* Información del turno del jugador. */
  const turnInstructions = document.getElementById("turn-instructions");
  /* Imagen del jugaodr en turno. */
  const playerImage = document.getElementById("player-image").children[0];
  /* El elemento donde contiene el ganador. */
  const winnerMessage = document.getElementById("winner-message");
  /* El header donde se dice quién ganó. */
  const headingWinner = winnerMessage.children[0];
  /* El botón para jugar de nuevo. */
  const buttonPlayAgain = winnerMessage.children[1];
  /* Función flecha llamada cuando un jugador gana. */
  const onGameFinished = (playerNumber) => {
    if (playerNumber == 0) {
      winnerMessage.style.visibility = "visible";
      headingWinner.innerHTML = "No one won.";
      return;
    }
    winnerMessage.style.visibility = "visible";
    headingWinner.innerHTML = `Player ${playerNumber} won`;
  }
  /* Función flecha llamada cuando tira un jugador. */
  const onTurnChanged = (playerNumber) => {
    console.log(`Is the turn of the player: ${playerNumber}.`);
    turnInstructions.innerHTML = `Player's ${playerNumber} turn`;
    playerImage.src = playerNumber == 1 ? "../assets/circle.svg" : "../assets/cross.svg";
  }
  /* El tablero. */
  const board = new Board(cellsElement, onGameFinished, onTurnChanged);
  /* Configuramos el botón para jugar de nuevo. */
  buttonPlayAgain.addEventListener("click", (e) => {
    winnerMessage.style.visibility = "hidden";
    board.restart();
  });
});