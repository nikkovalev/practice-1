import { IUser } from "./IUser";

export interface IGetOffer {
  categoryId: number;
  server?: number;
  query?: string;
  serviceId?: number;
  sellerId?: number;
  order?: "ASC" | "DESC";
  page?: number;
  onlineOnly?: boolean;
}

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
