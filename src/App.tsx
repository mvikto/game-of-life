import {
  Component,
  createEffect,
  onCleanup,
  For,
  Show,
  createMemo,
} from "solid-js";
import { createStore } from "solid-js/store";
import { CellSize } from "./common";
import { SizeControl, SpeedControl } from "./controls";
import { GameBoard } from "./GameBoard";
import { createGameStore } from "./gameStore";
import { ChevronRight, Dice, PauseIcon, PlayIcon, XIcon } from "./icons";

const maxSpeed = 6;

const cellSizes = {
  small: 12, // w-3
  medium: 16, // w-4
  big: 20, // w-5
};

const App: Component = () => {
  const [gameStore, gameStoreMut] = createGameStore();

  const [store, setStore] = createStore({
    cellSize: "medium" as CellSize,
    rectSize: {
      width: 0,
      height: 0,
    },
    running: false,
    speed: 6,
  });

  const getIntervalDelay = createMemo(() => Math.pow(2, 10 - store.speed));
  const getCellSizePx = () => cellSizes[store.cellSize];

  createEffect(() =>
    gameStoreMut.resize(
      Math.floor(store.rectSize.height / getCellSizePx()),
      Math.floor(store.rectSize.width / getCellSizePx())
    )
  );

  const setSpeed = (speed: number) => setStore({ speed });

  const setSize = (size: CellSize) => setStore({ cellSize: size });

  const onKeyPress = (e: KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case " ":
        setStore("running", (running) => !running);
        break;

      case "w":
        setStore("speed", (speed) => Math.min(maxSpeed, speed + 1));
        break;

      case "s":
        setStore("speed", (speed) => Math.max(1, speed - 1));
        break;
    }
  };

  let interval: number = 0;
  createEffect(() => {
    if (interval) clearInterval(interval);
    interval = setInterval(
      () => store.running && gameStoreMut.tick(),
      getIntervalDelay()
    );
  });
  onCleanup(() => clearInterval(interval));

  document.body.addEventListener("keypress", onKeyPress);
  onCleanup(() => document.body.removeEventListener("keypress", onKeyPress));

  return (
    <div class="flex flex-col h-screen bg-slate-900 [-webkit-user-drag:none]">
      <div class="flex flex-row justify-center">
        <div class="bg-slate-800 my-2 rounded-lg px-3 py-2 flex items-center justify-center text-slate-400 stroke-slate-400">
          <SpeedControl
            min={1}
            max={6}
            value={store.speed}
            onChange={(speed) => setStore({ speed })}
          />
          <button
            class="ml-1 hover:opacity-50"
            onClick={() => setStore("running", (running) => !running)}
          >
            <Show when={store.running} fallback={<PlayIcon />}>
              <PauseIcon />
            </Show>
          </button>
          <div class="flex justify-center text-lg items-center ml-2 text-slate-300 w-18">
            <div>{gameStore.cols}</div>
            <XIcon class="w-5" />
            <div>{gameStore.rows}</div>
          </div>
          <SizeControl
            value={store.cellSize}
            onChange={(cellSize) => setStore({ cellSize })}
          />
          <button
            class="w-6 ml-2 flex justify-center items-center hover:opacity-50"
            onClick={gameStoreMut.randomize}
          >
            <Dice class="fill-slate-400" />
          </button>
        </div>
      </div>
      <GameBoard
        cells={gameStore.cells}
        cellSize={store.cellSize}
        onResize={(width, height) => setStore("rectSize", { width, height })}
        onCellPaint={([col, row]) => gameStoreMut.toggleCell(col, row)}
      />
    </div>
  );
};

export default App;
