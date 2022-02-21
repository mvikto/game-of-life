import {
  Component,
  createEffect,
  onCleanup,
  For,
  Show,
  batch,
  onMount,
} from "solid-js";
import { createStore } from "solid-js/store";
import { createGameState, updateGameState } from "./game";
import { ChevronRight, PauseIcon, PlayIcon, XIcon } from "./icons";

const maxSpeed = 6;

const cellSizes = {
  small: 12, // w-3
  medium: 16, // w-4
  big: 20, // w-5
};

type Size = keyof typeof cellSizes;

const App: Component = () => {
  const storeObj = {
    cellSize: "medium" as Size,
    get cellSizePx() {
      return cellSizes[this.cellSize];
    },
    rectSize: {
      width: 0,
      height: 0,
    },
    get gameSize() {
      return {
        width: Math.floor(this.rectSize.width / this.cellSizePx),
        height: Math.floor(this.rectSize.height / this.cellSizePx),
      };
    },
    gameState: createGameState(),
    running: false,
    speed: 6,
    get intervalDelay() {
      return Math.pow(2, 10 - this.speed);
    },
  };

  const [store, setStore] = createStore(storeObj);

  const resizeObserver = new ResizeObserver((entries) => {
    setStore("rectSize", {
      width: entries[0].contentRect.width,
      height: entries[0].contentRect.height,
    });
  });

  const toggleCell = (i: number, j: number) => {
    setStore("gameState", i, j, "alive", (alive) => !alive);
  };

  const handleMouseEnterOrDown = ([i, j]: [number, number], e: MouseEvent) => {
    if (e.buttons === 1) {
      toggleCell(i, j);
    }
  };

  const setSpeed = (speed: number) => {
    setStore({ speed });
  };

  const setSize = (size: Size) => {
    setStore("cellSize", size);
  };

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

  createEffect(() => {
    const oldCells = storeObj.gameState;

    setStore({
      gameState: createGameState({
        width: store.gameSize.width,
        height: store.gameSize.height,
        fill: (i, j) => oldCells[i]?.[j],
      }),
    });
  });

  let interval: number = 0;
  createEffect(() => {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      if (!store.running) return;
      const gameStateChanges = updateGameState(storeObj.gameState);
      batch(() => {
        for (let change of gameStateChanges) {
          setStore("gameState", change.i, change.j, change.cellState);
        }
      });
    }, store.intervalDelay);
  });

  onMount(() => {
    document.body.addEventListener("keypress", onKeyPress);
  });

  onCleanup(() => {
    document.body.removeEventListener("keypress", onKeyPress);
    clearInterval(interval);
    resizeObserver.disconnect();
  });

  return (
    <div class="flex flex-col h-screen bg-slate-900 [-webkit-user-drag:none]">
      <div class="flex flex-row justify-center">
        <div class="bg-slate-800 my-2 rounded-lg px-3 py-2 flex items-center justify-center text-slate-400 stroke-slate-400">
          <div class="flex ">
            <For each={new Array(maxSpeed).fill(0).map((_, i) => i + 1)}>
              {(speed) => (
                <ChevronRight
                  class="hover:opacity-50 rounded-lg -ml-2"
                  classList={{
                    ["stroke-sky-900  first:ml-0"]: speed <= store.speed,
                  }}
                  onClick={[setSpeed, speed]}
                />
              )}
            </For>
          </div>
          <button class="ml-1 hover:opacity-50">
            <Show
              when={store.running}
              fallback={
                <PlayIcon onClick={() => setStore({ running: true })} />
              }
            >
              <PauseIcon onClick={() => setStore({ running: false })} />
            </Show>
          </button>
          <div class="flex justify-center text-lg items-center ml-2 text-slate-300 w-18">
            <div>{store.gameSize.width}</div>
            <XIcon class="w-5" />
            <div>{store.gameSize.height}</div>
          </div>
          <div class="flex">
            <For
              each={[
                { label: "sm", value: "small" },
                { label: "md", value: "medium" },
                { label: "bg", value: "big" },
              ]}
            >
              {(x) => (
                <button
                  class="ml-2 hover:opacity-50"
                  classList={{
                    ["border-b border-sky-900 text-sky-900"]:
                      x.value === store.cellSize,
                  }}
                  onClick={[setSize, x.value]}
                >
                  {x.label}
                </button>
              )}
            </For>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-center h-full"
        ref={(container) => {
          resizeObserver.disconnect();
          resizeObserver.observe(container);
        }}
      >
        <div class="flex flex-col">
          <For each={store.gameState}>
            {(row, i) => (
              <div class="flex flex-row">
                <For each={row}>
                  {(cell, j) => (
                    <div
                      onMouseEnter={[handleMouseEnterOrDown, [i(), j()]]}
                      onMouseDown={[handleMouseEnterOrDown, [i(), j()]]}
                      class="border select-none hover:opacity-50 border-slate-600 touch-none"
                      classList={{
                        [{
                          small: "w-3 h-3",
                          medium: "w-4 h-4",
                          big: "w-5 h-5",
                        }[store.cellSize]]: true,
                        ["bg-slate-700"]: !cell.alive,
                        ["bg-green-600"]: cell.alive,
                      }}
                    />
                  )}
                </For>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default App;
