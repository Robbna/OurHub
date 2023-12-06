import type { IPublicUser } from "@/common/data/user";
import { signupUserWithEmailAndPassword, loginWithEmailAndPassword, logout } from "./FirebaseService";

export const signupUser = async (user: IPublicUser) => {
  return await signupUserWithEmailAndPassword(user);
};

export const loginUser = async (user: IPublicUser) => {
  return await loginWithEmailAndPassword(user);
};

export const logoutUser = async () => {
  await logout();
};
