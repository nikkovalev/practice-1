import React, { FC } from "react";

export const CardsIcon: FC<{ color?: "primary" | "black" }> = ({ color = "primary" }) => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 1.5H6C5.72386 1.5 5.5 1.72386 5.5 2V4H14C15.1046 4 16 4.89543 16 6V10.5H18C18.2761 10.5 18.5 10.2761 18.5 10V2C18.5 1.72386 18.2761 1.5 18 1.5ZM16 12H18C19.1046 12 20 11.1046 20 10V2C20 0.895431 19.1046 0 18 0H6C4.89543 0 4 0.895431 4 2V4H2C0.895431 4 0 4.89543 0 6V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V12ZM2 5.5H14C14.2761 5.5 14.5 5.72386 14.5 6V14C14.5 14.2761 14.2761 14.5 14 14.5H2C1.72386 14.5 1.5 14.2761 1.5 14V6C1.5 5.72386 1.72386 5.5 2 5.5Z"
      fill={color === "primary" ? "#7F86E8" : "#14161B"}
    />
  </svg>
);
