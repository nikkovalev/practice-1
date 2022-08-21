export interface IFilterData {
  serviceId: number;
  categoryId: number;
  server?: number;
  query?: string;
  order: "ASC" | "DESC";
  onlineOnly: boolean;
}
