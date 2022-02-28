interface CellState {
  alive: boolean;
}

export type GameState = CellState[][];

interface GameStateChange {
  row: number;
  col: number;
  cellState: CellState;
}

export const createGameState = (opts?: {
  cols: number;
  rows: number;
  fill?: (i: number, j: number) => CellState | undefined;
}): GameState => {
  const cells = new Array(opts?.rows ?? 0);

  for (let rowNr = 0; rowNr < cells.length; rowNr++) {
    const row: CellState[] = new Array(opts?.cols ?? 0);
    for (let colNr = 0; colNr < row.length; colNr++) {
      row[colNr] = opts?.fill?.(rowNr, colNr) ?? { alive: false };
    }
    cells[rowNr] = row;
  }

  return cells;
};

const updateCell = (cell: CellState, neighbourLiveCount: number): CellState => {
  if (cell.alive) {
    return { alive: neighbourLiveCount === 2 || neighbourLiveCount === 3 };
  }

  return {
    alive: neighbourLiveCount === 3,
  };
};

const getNeigbourLiveCount = (
  game: GameState,
  i: number,
  j: number
): number => {
  let r = 0;
  const incIfAlive = (i: number, j: number) => {
    if (
      i >= 0 &&
      i < game.length &&
      j >= 0 &&
      j < game[0].length &&
      game[i][j].alive
    ) {
      r++;
    }
  };

  incIfAlive(i + 1, j + 1);
  incIfAlive(i - 1, j + 1);
  incIfAlive(i - 1, j - 1);
  incIfAlive(i + 1, j - 1);
  incIfAlive(i, j - 1);
  incIfAlive(i, j + 1);
  incIfAlive(i - 1, j);
  incIfAlive(i + 1, j);

  return r;
};

export const updateGameState = (game: GameState): GameStateChange[] => {
  const r: GameStateChange[] = [];
  for (let rowNr = 0; rowNr < game.length; rowNr++) {
    const row = game[rowNr];
    for (let colNr = 0; colNr < row.length; colNr++) {
      const cellState = row[colNr];
      const neighbourLiveCount = getNeigbourLiveCount(game, rowNr, colNr);
      const newCellState = updateCell(cellState, neighbourLiveCount);
      if (cellState.alive !== newCellState.alive) {
        r.push({
          row: rowNr,
          col: colNr,
          cellState: newCellState,
        });
      }
    }
  }
  return r;
};
