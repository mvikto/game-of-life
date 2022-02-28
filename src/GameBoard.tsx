import { Component, For, onCleanup } from "solid-js";
import { DeepReadonly } from "solid-js/store";
import { CellPos, CellSize } from "./common";
import { GameState } from "./game";

export const GameBoard: Component<{
  cells: DeepReadonly<GameState>;
  cellSize: CellSize;
  onCellPaint?: (pos: CellPos) => void;
  onResize?: (width: number, height: number) => void;
}> = (props) => {
  const resizeObserver = new ResizeObserver((entries) =>
    props.onResize?.(
      entries[0].contentRect.width,
      entries[0].contentRect.height
    )
  );
  onCleanup(() => resizeObserver.disconnect());

  const handleMouseOnCell = (pos: CellPos, e: MouseEvent) =>
    e.buttons === 1 && props.onCellPaint?.(pos);

  return (
    <div
      class="flex items-center justify-center h-full cells-container"
      classList={{ [props.cellSize]: true }}
      ref={(container) => {
        resizeObserver.disconnect();
        resizeObserver.observe(container);
      }}
    >
      <div class="flex flex-col">
        <For each={props.cells}>
          {(row, rowNr) => (
            <div class="flex flex-row">
              <For each={row}>
                {(cell, colNr) => (
                  <div
                    onMouseEnter={[handleMouseOnCell, [rowNr(), colNr()]]}
                    onMouseDown={[handleMouseOnCell, [rowNr(), colNr()]]}
                    class="cell border select-none hover:opacity-50 border-slate-600 touch-none"
                    classList={{
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
  );
};
