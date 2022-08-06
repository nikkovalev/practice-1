import React, { useEffect } from "react";
import cn from "classnames";
import { useOutside } from "@/hooks/useOutside";

import { Button } from "@/components/ui";
import { ArrowIcon, FilterIcon, InfoIcon, LikeIcon, SearchIcon } from "@/components/icons";
import { Select } from "@/components/ui/Select/Select";

import { styles as offersStyles } from "@/components/screens/profile/offers";
import styles from "./User.module.scss";

const buttons = [
  { title: "Call of Duty", count: 1, active: true },
  { title: "FIFA", count: 21 },
  { title: "Battle.net", count: 5 },
  { title: "Aion", count: 2 },
];

export const UserOffers = () => {
  const { ref: inputRef, isShow: isShowInput, setIsShow: setIsShowInput } = useOutside(false);
  const { ref: filterRef, isShow: isShowFilter, setIsShow: setIsShowFilter } = useOutside(false);

  const handleShowInput = () => {
    setIsShowInput(true);
  };

  const handleShowFilter = () => {
    setIsShowFilter(true);
  };
  const handleHideFilter = () => {
    setIsShowFilter(false);
  };

  //eslint-disable-next-line
  useEffect(() => inputRef.current?.focus(), [isShowInput]);
  useEffect(() => {
    const blurEl = document.getElementById("blur");
    if (blurEl) blurEl.className = isShowFilter ? "active" : "";
  }, [isShowFilter]);

  return (
    <div>
      <div className={styles.offersButtons}>
        {buttons.map(({ title, count, active }) => (
          <Button
            key={title}
            color="black"
            variant="outlined"
            size="extra-small"
            isActiveOutlined={active}
          >
            {title}
            <b className="text-gray-400">({count})</b>
          </Button>
        ))}
      </div>
      <div
        ref={filterRef}
        className={cn(styles.offersFilters, { [styles.offersFiltersActive]: isShowFilter })}
      >
        <div className="filter_menu_top hidden sm:flex items-center">
          <button onClick={handleHideFilter}>
            <ArrowIcon direction="left" color="primary" />
          </button>
          <h3>Фильтр</h3>
        </div>
        <div className={styles.offersSearch}>
          <button onClick={handleShowInput}>
            <SearchIcon color="primary" />
          </button>
          <input
            ref={inputRef}
            className={cn(styles.offersInput, { [styles.offersInputActive]: isShowInput })}
            type="text"
            placeholder="Поиск по описанию"
          />
        </div>
        <Select className={styles.select} label="Сервер" items={[]} />
        <Select className={styles.select} label="Тип" items={[]} />
        <div className="text_with_icon sm:pt-[10px] sm:ml-[25px]">
          <ArrowIcon variant="two" />
          По популярности
        </div>
      </div>
      <Button className={styles.offersButton} variant="outlined" onClick={handleShowFilter}>
        <FilterIcon />
        Фильтр
      </Button>
      <div>
        <div className={offersStyles.itemWrapper}>
          <h3 className={offersStyles.itemTitle}>Буст</h3>
          <div className={offersStyles.item}>
            <div className={offersStyles.itemList}>
              <div>
                <div className={offersStyles.itemText}>Сервер</div>
                <div className={cn(offersStyles.itemText, offersStyles.itemText_white)}>
                  FIFA 22 Ultimate Team (PS)
                </div>
              </div>
              <div>
                <div className={offersStyles.itemText}>Описание</div>
                <div className={cn(offersStyles.itemText, offersStyles.itemText_white)}>
                  Сыграю вл за вас на 5 ранг, пишите в любое время как буду онлайн отвечу
                </div>
              </div>
            </div>
            <div className={offersStyles.itemFooter}>
              <b className={offersStyles.itemPrice}>от 500₽</b>
              <div className={offersStyles.itemIcons}>
                <button>
                  <InfoIcon />
                </button>
                <button>
                  <LikeIcon isSmall={true} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={offersStyles.itemWrapper}>
          <h3 className={offersStyles.itemTitle}>Монеты</h3>
          <div className={offersStyles.item}>
            <div className={offersStyles.itemList}>
              <div>
                <div className={offersStyles.itemText}>Сервер</div>
                <div className={cn(offersStyles.itemText, offersStyles.itemText_white)}>
                  FIFA 22 Ultimate Team (PS)
                </div>
              </div>
              <div>
                <div className={offersStyles.itemText}>Наличие</div>
                <div className={cn(offersStyles.itemText, offersStyles.itemText_white)}>
                  1 000 000 000 монет
                </div>
              </div>
            </div>
            <div className={offersStyles.itemFooter}>
              <b className={offersStyles.itemPrice}>
                1000 <span>монет</span> / 50₽
              </b>
              <div className={offersStyles.itemIcons}>
                <button>
                  <InfoIcon />
                </button>
                <button>
                  <LikeIcon isSmall={true} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
