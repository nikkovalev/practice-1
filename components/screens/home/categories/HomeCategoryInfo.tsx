import React, { FC } from "react";
import cn from "classnames";
import { ICategory, IService } from "@/models/ICategory";

import { Text } from "@/components/ui";

import styles from "../Home.module.scss";
import { LikeIcon } from "@/components/icons";

interface IHomeCategoryInfo {
  isAuth: boolean;
  isLiked: boolean;
  category: ICategory;
  service: IService;
  handleLike: (id: number) => void;
}

export const HomeCategoryInfo: FC<IHomeCategoryInfo> = ({
  category,
  isAuth,
  isLiked,
  service,
  handleLike,
}) => {
  const handleClick = () => handleLike(service.id);

  return (
    <li
      className={cn(styles.categoryListItem, {
        [styles.categoryListItem_icon]: isAuth,
        [styles.categoryListItem_liked]: isLiked,
      })}
      key={service.id}
    >
      <div>
        <Text
          className={cn("text-ellipsis", styles.link)}
          color="gray"
          size="l"
          as="a"
          weight={500}
          href={`/categories/${category.id}?page=${service.id}`}
        >
          {service.name}
        </Text>
        {isAuth && (
          <button>
            <LikeIcon isSmall={true} isFill={isLiked} onClick={handleClick} />
          </button>
        )}
      </div>
    </li>
  );
};
