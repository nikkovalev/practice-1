import React, { FC } from "react";
import { IService } from "@/models/ICategory";

import styles from "./Offers.module.scss";

interface IOffersService {
  service: IService;
}

export const OffersService: FC<IOffersService> = ({ service }) => {
  return <div>OffersService</div>;
};
