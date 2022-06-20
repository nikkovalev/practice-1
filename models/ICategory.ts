export interface IService {
  id: number;
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  services: IService[];
}
