export interface IServiceFilter {
  id: number;
  name: string;
  values: string[];
  children: Partial<IServiceFilter>[];
}

export interface IService {
  id: number;
  name: string;
  description: string;
  filters: IServiceFilter[];
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  banner?: string;
  services: IService[];
  servers?: string[];
}
