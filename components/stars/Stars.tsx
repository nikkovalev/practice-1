import React, { FC } from "react";
import cn from "classnames";

export const Stars: FC<{ className?: string; rating: number }> = ({ className, rating }) => {
  return (
    <div className={cn("flex items-center", className)}>
      {[1, 1, 1, 1, 1].map((_, idx) => {
        const id = `star-${Date.now()}-${idx}`;
        let offset = idx < rating ? 100 : 0;
        if (idx < rating && idx + 1 > rating) offset = (rating - Math.floor(rating)) * 100;
        return (
          <svg
            className="mr-[7px] last:mr-0"
            key={id}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={id}>
                <stop offset={`${offset}%`} stopColor="#FFDB59" />
                {offset !== 100 && <stop offset={`${offset}%`} stopColor="#616D85" />}
              </linearGradient>
            </defs>
            <path
              d="M10.4729 0.329426L13.0169 6.64343L19.5298 7.23016C19.9815 7.27107 20.1653 7.8621 19.8224 8.17322L14.8822 12.6614L16.3626 19.3382C16.4653 19.8022 15.9859 20.1671 15.5978 19.9206L10.0006 16.3809L4.40348 19.9206C4.01439 20.1661 3.53598 19.8011 3.63865 19.3382L5.11904 12.6614L0.177895 8.17215C-0.164997 7.86102 0.0177418 7.26999 0.470483 7.22908L6.98339 6.64236L9.52736 0.329426C9.70394 -0.109809 10.2963 -0.109809 10.4729 0.329426Z"
              fill={`url(#${id})`}
            />
          </svg>
        );
      })}
    </div>
  );
};
