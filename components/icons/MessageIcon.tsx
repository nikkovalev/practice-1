import React, { FC } from "react";
import cn from "classnames";

export const MessageIcon: FC<{ className?: string; noDark?: boolean }> = ({
  className,
  noDark,
}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className={cn(className, { "dark:fill-white-100": !noDark })}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.341 19.4971C15.7811 19.39 16.2455 19.4525 16.6415 19.6719L20.1744 21.6299L19.4528 18.3906C19.3261 17.8222 19.4837 17.2278 19.8753 16.7961C21.3214 15.202 22.2 13.0925 22.2 10.774C22.2 5.81538 18.1706 1.79566 13.2 1.79566H10.8C5.82944 1.79566 1.8 5.81538 1.8 10.774C1.8 15.7325 5.82944 19.7522 10.8 19.7522H13.2C13.9399 19.7522 14.6566 19.6636 15.341 19.4971ZM21.341 22.2764L21.3399 22.2759L21.341 22.2764ZM0 10.774C0 4.82366 4.83533 0 10.8 0H13.2C19.1647 0 24 4.82366 24 10.774C24 13.5549 22.9439 16.0897 21.2099 18.001L22.221 22.54C22.4455 23.5478 21.3715 24.3475 20.4668 23.8461L15.7674 21.2416C14.9445 21.4418 14.0847 21.5479 13.2 21.5479H10.8C4.83533 21.5479 0 16.7242 0 10.774Z"
      fill="#616D85"
    />
  </svg>
);
