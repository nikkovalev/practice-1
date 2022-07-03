import React, { FC } from "react";

interface IListIcon {
  type?: "tile";
  isActive: boolean;
}

export const ListIcon: FC<IListIcon> = ({ type, isActive }) => {
  const rectClassName = isActive ? `stroke-primary-400` : "";
  if (type === "tile") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className={rectClassName}
          x="1"
          y="1"
          width="8.43478"
          height="8.43478"
          rx="1"
          stroke="#616D85"
          strokeWidth="2"
        />
        <rect
          className={rectClassName}
          x="14.5654"
          y="1"
          width="8.43478"
          height="8.43478"
          rx="1"
          stroke="#616D85"
          strokeWidth="2"
        />
        <rect
          className={rectClassName}
          x="14.5654"
          y="14.5652"
          width="8.43478"
          height="8.43478"
          rx="1"
          stroke="#616D85"
          strokeWidth="2"
        />
        <rect
          className={rectClassName}
          x="1"
          y="14.5652"
          width="8.43478"
          height="8.43478"
          rx="1"
          stroke="#616D85"
          strokeWidth="2"
        />
      </svg>
    );
  }
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        className={rectClassName}
        x="1"
        y="1"
        width="26"
        height="4.10526"
        rx="1.5"
        stroke="#616D85"
        strokeWidth="2"
      />
      <rect
        className={rectClassName}
        x="1"
        y="9.42108"
        width="26"
        height="4.10526"
        rx="1.5"
        stroke="#616D85"
        strokeWidth="2"
      />
      <rect
        className={rectClassName}
        x="1"
        y="18.8947"
        width="26"
        height="4.10526"
        rx="1.5"
        stroke="#616D85"
        strokeWidth="2"
      />
    </svg>
  );
};
