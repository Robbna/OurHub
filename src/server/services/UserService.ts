import type { INewUser, IUserDto } from "../data";
import { FirebaseRepository } from "../repositories/firebase/FirebaseRepository";
import type { IUserRepository } from "../repositories/types";

class UserService {
  private service: IUserRepository;

  constructor() {
    this.service = new FirebaseRepository();
  }

  signUpUser = async (user: INewUser): Promise<IUserDto | null> => {
    return await this.service.signup(user);
  };

  loginUser = async (user: INewUser): Promise<IUserDto | null> => {
    return await this.service.login(user);
  };

  logout = async (): Promise<void> => {
    await this.service.logout();
  };
}

export const userService = new UserService();
