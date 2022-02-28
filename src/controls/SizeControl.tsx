import { Component, For } from "solid-js";
import { CellSize } from "../common";

const SpeedControl: Component<{
  value: CellSize;
  onChange: (value: CellSize) => void;
}> = (props) => {
  return (
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
              ["border-b border-sky-900 text-sky-900"]: x.value === props.value,
            }}
            onClick={[props.onChange, x.value]}
          >
            {x.label}
          </button>
        )}
      </For>
    </div>
  );
};

export default SpeedControl;
