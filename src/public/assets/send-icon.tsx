import React from "react";

interface Props {
  color?: string;
}

export const SendIcon = ({color}: Props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.004 9.414L7.39703 18.021L5.98303 16.607L14.589 8H7.00403V6L18.004 6V17H16.004V9.414Z"
      fill={color}
    />
  </svg>
);
