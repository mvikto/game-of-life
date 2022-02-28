import { Component, ComponentProps } from "solid-js";

export const PlayIcon: Component<ComponentProps<"svg">> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-play"
    {...props}
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

export const PauseIcon: Component<ComponentProps<"svg">> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-pause"
    {...props}
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

export const XIcon: Component<ComponentProps<"svg">> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-x"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const ChevronRight: Component<ComponentProps<"svg">> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-chevron-right"
    {...props}
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export const Dice: Component<ComponentProps<"svg">> = (props) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 485 485"
    style="enable-background:new 0 0 485 485;"
    {...props}
  >
    <g>
      <path d="M0,0v485h485V0H0z M455,455H30V30h425V455z" />
      <path d="M118.75,401.25c19.299,0,35-15.701,35-35s-15.701-35-35-35s-35,15.701-35,35S99.451,401.25,118.75,401.25z" />
      <path d="M242.5,277.5c19.299,0,35-15.701,35-35s-15.701-35-35-35c-19.299,0-35,15.701-35,35S223.201,277.5,242.5,277.5z" />
      <path d="M366.25,153.75c19.299,0,35-15.701,35-35s-15.701-35-35-35s-35,15.701-35,35S346.951,153.75,366.25,153.75z" />
    </g>
  </svg>
);
