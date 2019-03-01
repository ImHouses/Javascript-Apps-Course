/**
 * Clase para representar tableros, desde aquí se manejarán todos los eventos
 * de las celdas en el tablero.
 */
class Board {

  /**
   * Constructor para una clase tablero.
   * @param {Array} cells Las celdas del tablero. (Objectos del DOM).
   * @param {Function(Int)} onGameFinished Callback para avisar que el juego ha terminado.
   * @param {Function(Int)} onTurnChanged Callback para avisar que es turno de otro jugador. 
   * El callback recibe el número de jugador ganador (int).
   */
  constructor(cells, onGameFinished, onTurnChanged) {
    this.cellsObjects = this.createCellsObjects();
    this.cellsElements = cells;
    this.onGameFinished = onGameFinished;
    this.onTurnChanged = onTurnChanged;
    this.turn = 1;
    this.configureButtons();
  }

  /**
   * Configura el evento "click" de cada celda.
   */
  configureButtons() {
    this.cellsElements[0].addEventListener("click", (e) => {
      this.handleCellClicked(this.cellsObjects[0][0], this.cellsElements[0]);
    });
    this.cellsElements[1].addEventListener("click", (e) => {
      this.handleCellClicked(this.cellsObjects[0][1], this.cellsElements[1]);
    });
    this.cellsElements[2].addEventListener("click", (e) => {
      this.handleCellClicked(this.cellsObjects[0][2], this.cellsElements[2]);
    });
    this.cellsElements[3].addEventListener("click", (e) => {
      this.handleCellClicked(this.cellsObjects[1][0], this.cellsElements[3]);
    });
    this.cellsElements[4].addEventListener("click", (e) => {
      this.handleCellClicked(this.cellsObjects[1][1], this.cellsElements[4]);
    });
    this.cellsElements[5].addEventListener("click", (e) => {
      this.handleCellClicked(this.cellsObjects[1][2], this.cellsElements[5]);
    });
    this.cellsElements[6].addEventListener("click", (e) => {
      this.handleCellClicked(this.cellsObjects[2][0], this.cellsElements[6]);
    });
    this.cellsElements[7].addEventListener("click", (e) => {
      this.handleCellClicked(this.cellsObjects[2][1], this.cellsElements[7]);
    });
    this.cellsElements[8].addEventListener("click", (e) => {
      this.handleCellClicked(this.cellsObjects[2][2], this.cellsElements[8]);
    });
  }

  /**
   * Crea un arreglo de 3x3 para representar los valores de cada celda.
   * 
   * @returns Un arreglo de 3x3 para representar los valores de cada celda.
   */
  createCellsObjects() {
    return [
        [{ belongsToPlayer: null}, { belongsToPlayer: null}, { belongsToPlayer: null}],
        [{ belongsToPlayer: null}, { belongsToPlayer: null}, { belongsToPlayer: null}],
        [{ belongsToPlayer: null}, { belongsToPlayer: null}, { belongsToPlayer: null}]
    ];
  }

  /**
   * Analiza el arreglo de valores de las celdas para verificar si hubo un 
   * ganador o no.
   * Si hubo un ganador notifica al callback de onGameFinished.
   */
  checkForWinner() {
    for (let row of this.cellsObjects) {
      let slower = 0;
      let faster = 1;
      while (faster < row.length) {
        const slowerPlayer = row[slower].belongsToPlayer;
        const fasterPlayer = row[faster].belongsToPlayer;
        if (slowerPlayer == null || fasterPlayer == null) {
          break;
        }
        if (slowerPlayer != fasterPlayer) {
          break;
        }
        if (slower == 1 && faster == 2 && slowerPlayer == fasterPlayer) {
          this.onGameFinished(slowerPlayer);
          return;
        }
        slower++;
        faster++;
      }
    }
    let column = 0;
    while (column < 3) {
      let slower = 0;
      let faster = 1;
      while(faster < 3) {
        const slowerPlayer = this.cellsObjects[slower][column].belongsToPlayer;
        const fasterPlayer = this.cellsObjects[faster][column].belongsToPlayer;
        if (slowerPlayer == null || fasterPlayer == null) {
          break;
        }
        if (slowerPlayer != fasterPlayer) {
          break;
        }
        if (slower == 1 && faster == 2 && slowerPlayer == fasterPlayer) {
          this.onGameFinished(slowerPlayer);
          return;
        }
        slower++;
        faster++;
      }
      column++;
    }
    /* First diagonal. */
    let firstDiagonal = this.cellsObjects[0][0].belongsToPlayer;
    let secondDiagonal = this.cellsObjects[1][1].belongsToPlayer;
    let thirdDiagonal = this.cellsObjects[2][2].belongsToPlayer;
    if (firstDiagonal == null || secondDiagonal == null || thirdDiagonal == null) {
      return;
    }
    if (firstDiagonal == secondDiagonal && secondDiagonal == thirdDiagonal) {
      this.onGameFinished(firstDiagonal);
      return;
    }
    /* Second diagonal. */
    firstDiagonal = this.cellsObjects[0][2].belongsToPlayer;
    thirdDiagonal = this.cellsObjects[2][0].belongsToPlayer;
    if (firstDiagonal == secondDiagonal && secondDiagonal == thirdDiagonal) {
      this.onGameFinished(firstDiagonal);
      return;
    }
    /* Case when there is no winner. */
    let allNotNull = true;
    for (let row of this.cellsObjects) {
      for (let cellObject of row) {
        if (cellObject.belongsToPlayer == null) {
          allNotNull = false;
        }
      }
    }
    if (allNotNull) {
      this.onGameFinished(0);
    }
  }

  /**
   * Función auxiliar para manejar los eventos "click" de cada celda.
   * @param {CellObject} cellObject - El valor de la celda que fue clickeada.
   * @param {Element} cellElement - El elemento DOM de la celda clickeada.
   */
  handleCellClicked(cellObject, cellElement) {
    if (cellObject.belongsToPlayer == null) {
      cellElement.style.backgroundImage = this.turn == 2 ? "url('../assets/cross.svg')" : "url('../assets/circle.svg')";
      cellObject.belongsToPlayer = this.turn;
      this.turn = this.turn == 1 ? 2 : 1;
      this.onTurnChanged(this.turn);
      this.checkForWinner();
    }
  }

  /**
   * Reinicia el tablero limpiando los valores de las celdas y los background
   * de cada celda.
   */
  restart() {
    for (let row of this.cellsObjects) {
      for (let cellObject of row) {
        cellObject.belongsToPlayer = null;
      }
    }
    for (let element of this.cellsElements) {
      element.style.backgroundImage = "";
    }
    this.turn = 1;
    this.onTurnChanged(this.turn);
  }
}

export { Board };