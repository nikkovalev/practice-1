import { IService } from "./ICategory";

export interface IUser {
  id: number;
  username: string;
  email: string;
  displayName: string;
  photoUrl: string;
  regDate: string;
  online: boolean;
  isBanned: boolean;
  isSuspended: boolean;
  emailVerified: boolean;
  likedServices: IService[];
  telegramId: number | null;
}
