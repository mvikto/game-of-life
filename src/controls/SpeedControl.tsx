import { Component, For, splitProps } from "solid-js";
import { ChevronRight } from "../icons";

const SpeedControl: Component<{
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}> = (props) => {
  return (
    <div class="flex ">
      <For each={new Array(props.max).fill(0).map((_, i) => i + props.min)}>
        {(speed) => (
          <ChevronRight
            class="hover:opacity-50 rounded-lg -ml-2"
            classList={{
              ["stroke-sky-900  first:ml-0"]: speed <= props.value,
            }}
            onClick={[props.onChange, speed]}
          />
        )}
      </For>
    </div>
  );
};

export default SpeedControl;
