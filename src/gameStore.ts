import { batch } from "solid-js";
import { createStore } from "solid-js/store";
import { createGameState, updateGameState } from "./game";

export type Size = "small" | "medium" | "big";

export const createGameStore = () => {
  const storeObj = {
    cells: createGameState(),
    get rows() {
      return this.cells?.length ?? 0;
    },
    get cols() {
      return this.cells[0]?.length ?? 0;
    },
  };

  const [store, setStore] = createStore(storeObj);

  return [
    store,
    {
      tick() {
        const oldCells = storeObj.cells;
        const gameStateChanges = updateGameState(oldCells);
        batch(() => {
          for (const c of gameStateChanges) {
            setStore("cells", c.row, c.col, c.cellState);
          }
        });
      },
      toggleCell(col: number, row: number) {
        setStore("cells", col, row, "alive", (alive) => !alive);
      },
      resize(rows: number, cols: number) {
        setStore(
          "cells",
          createGameState({
            rows,
            cols,
            fill: (row, col) => storeObj.cells[row]?.[col],
          })
        );
      },
      randomize() {
        setStore(
          "cells",
          createGameState({
            rows: store.rows,
            cols: store.cols,
            fill: () => ({
              alive: Math.random() < 0.3,
            }),
          })
        );
      },
    },
  ] as const;
};
