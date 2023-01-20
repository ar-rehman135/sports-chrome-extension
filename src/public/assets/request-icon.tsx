import React from "react";

interface Props {
  color?: string;
}
export const RequestIcon = ({ color }: Props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.99603 14.586L16.603 5.979L18.017 7.393L9.41103 16H16.996V18H5.99603L5.99603 7H7.99603L7.99603 14.586Z"
      fill={color}
    />
  </svg>
);
