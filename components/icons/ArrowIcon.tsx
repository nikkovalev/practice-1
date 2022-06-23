import React, { FC } from "react";
interface IArrowIcon {
  pathClassName: string;
}
export const ArrowIcon: FC<IArrowIcon> = ({ pathClassName }) => (
  <svg width="14" height="5" viewBox="0 0 14 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className={pathClassName}
      d="M2.48276 1L6.96552 3.47826L11.5172 1.0559L12 1.3354L6.93103 4L2 1.26087L2.48276 1Z"
      fill="#616D85"
      stroke="#616D85"
    />
  </svg>
);
