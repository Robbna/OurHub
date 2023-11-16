import type { INewUser, IUserDto } from "@/server/data";

export interface IUserRepository {
  signup(user: INewUser): Promise<IUserDto | null>;
  login(user: INewUser): Promise<IUserDto | null>;
  logout(): Promise<void>;
}
