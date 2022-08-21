import { IUser } from "./IUser";

export interface IOffer {
  id?: number;
  seller: IUser;
  filters: string[];
  categoryId: number;
  serviceId: number;
  server: number;
  description: string;
  countable: boolean;
  quantity: number;
  price: number;
  currency: "RUB";
}
