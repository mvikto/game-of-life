interface CellState {
  alive: boolean;
}

export type GameState = CellState[][];

interface GameStateChange {
  i: number;
  j: number;
  cellState: CellState;
}

export const createGameState = (opts?: {
  width: number;
  height: number;
  fill?: (i: number, j: number) => CellState | undefined;
}): GameState => {
  const cells = new Array(opts?.height ?? 0);

  for (let i = 0; i < cells.length; i++) {
    const row: CellState[] = new Array(opts?.width ?? 0);
    for (let j = 0; j < row.length; j++) {
      row[j] = opts?.fill?.(i, j) ?? { alive: false };
    }
    cells[i] = row;
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
  for (let i = 0; i < game.length; i++) {
    const row = game[i];
    for (let j = 0; j < row.length; j++) {
      const cellState = row[j];
      const neighbourLiveCount = getNeigbourLiveCount(game, i, j);
      const newCellState = updateCell(cellState, neighbourLiveCount);
      if (cellState.alive !== newCellState.alive) {
        r.push({
          i,
          j,
          cellState: newCellState,
        });
      }
    }
  }
  return r;
};
