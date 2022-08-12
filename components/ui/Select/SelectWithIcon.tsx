import React, { FC } from "react";
import { ISelect, Select } from "./";

export const SelectWithIcon: FC<{ rootRef?: any } & ISelect> = ({ rootRef, ...props }) => (
  <Select
    {...props}
    ref={rootRef}
    iconClassName={props.iconClassName ?? "mr-[10px]"}
    color="light"
    padding={!!props.icon ? "sm" : "l"}
    size="l"
  />
);
