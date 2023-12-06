import type { INewUser, IUserDto } from "@/common/data/user";
import { signup } from "./FirebaseService";

export const signUpUser = async (user: INewUser) => {
  return await signup(user);
};

export const loginUser = async (user: INewUser) => {
  return await login(user);
};

export const logout = async () => {
  await logout();
};
export const login = (user: INewUser) => {
  throw new Error("Function not implemented.");
};
