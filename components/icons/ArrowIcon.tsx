import React, { FC } from "react";

interface IArrowIcon {
  variant?: "two" | "long";
  direction?: "left" | "bottom";
  color?: "gray" | "primary";
}

export const ArrowIcon: FC<IArrowIcon> = ({ variant, direction, color }) => {
  if (variant === "two") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-black-400 dark:fill-white-100 md:fill-white-100"
          d="M1.66249 5.70422L4.01254 3.35941V19.0267C4.01254 19.5629 4.44746 19.997 4.98508 19.997C5.52254 19.997 5.95763 19.5631 5.95763 19.0267V3.35941L8.30767 5.70422C8.49775 5.89387 8.74765 5.98853 8.99508 5.98853C9.24252 5.98853 9.49263 5.8937 9.68249 5.70422C10.0625 5.32508 10.0625 4.70894 9.68249 4.32983L5.67508 0.331171C5.5851 0.24139 5.47506 0.169007 5.35508 0.119069C5.35003 0.116633 5.34514 0.116633 5.34009 0.114023C5.23005 0.0691324 5.11007 0.0442505 4.98504 0.0442505C4.86 0.0442505 4.74002 0.0691319 4.62999 0.114023C4.62493 0.116459 4.62005 0.116459 4.61499 0.119069C4.49501 0.169007 4.38498 0.241216 4.29499 0.331171L0.28499 4.33224C-0.0949966 4.71138 -0.0949966 5.32751 0.28499 5.70662C0.664977 6.08315 1.28254 6.08336 1.66249 5.70422Z"
          fill="white"
        />
        <path
          className="fill-black-400 dark:fill-white-100 md:fill-white-100"
          d="M18.3375 14.3403L15.9874 16.6851V1.01518C15.9874 0.478922 15.5525 0.0448019 15.0149 0.0448019C14.4774 0.0448019 14.0424 0.478752 14.0424 1.01518V16.6824L11.6923 14.3376C11.3123 13.9585 10.6973 13.9585 10.3149 14.3376C9.93487 14.7167 9.93487 15.3329 10.3149 15.712L14.3249 19.7131C14.4148 19.8028 14.5249 19.8752 14.6449 19.9252C14.6499 19.9276 14.6548 19.9276 14.6599 19.9302C14.7699 19.9751 14.8899 20 15.0149 20C15.1399 20 15.2599 19.9751 15.37 19.9302C15.375 19.9278 15.3799 19.9278 15.385 19.9252C15.5049 19.8752 15.615 19.803 15.705 19.7131L19.715 15.712C20.0949 15.3329 20.0949 14.7167 19.715 14.3376C19.335 13.9611 18.7174 13.9611 18.3375 14.3403Z"
          fill="white"
        />
      </svg>
    );
  } else if (variant === "long") {
    return (
      <svg
        width="71"
        height="19"
        viewBox="0 0 71 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.000485641 9.5L69.0005 9.5M69.0005 9.5L60.8686 18M69.0005 9.5L60.8686 1"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </svg>
    );
  } else if (direction === "left" && color === "gray") {
    return (
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.73783 7.5L2 7.5M2 7.5L8 1M2 7.5L8 14"
          stroke="#616D85"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </svg>
    );
  } else if (direction === "bottom" && color === "gray") {
    return (
      <svg width="14" height="5" viewBox="0 0 14 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.48276 1L6.96552 3.47826L11.5172 1.0559L12 1.3354L6.93103 4L2 1.26087L2.48276 1Z"
          fill="#616D85"
          stroke="#616D85"
        />
      </svg>
    );
  } else if (direction === "bottom" && color === "primary") {
    return (
      <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.5 6.26217L7.5 7M7.5 7L0.999999 1M7.5 7L14 1"
          stroke="#7F86E8"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </svg>
    );
  } else if (direction === "left" && color === "primary") {
    return (
      <svg width="6" height="18" viewBox="0 0 6 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 2.67586L1.69565 8.95172L4.92547 15.3241L4.55279 16L1 8.90345L4.65217 2L5 2.67586Z"
          fill="#7F86E8"
          stroke="#7F86E8"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="6" viewBox="0 0 18 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.67586 1L8.95173 4.30435L15.3241 1.07453L16 1.44721L8.90345 5L2 1.34783L2.67586 1Z"
        fill="#7F86E8"
        stroke="#7F86E8"
      />
    </svg>
  );
};
