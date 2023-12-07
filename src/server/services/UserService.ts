import type { IPublicUser } from "@/common/data/user";
import firebaseService from "./FirebaseService";

export const signupUser = async (user: IPublicUser) => {
  return await firebaseService.signupUserWithEmailAndPassword(user);
};

export const loginUser = async (user: IPublicUser) => {
  return await firebaseService.loginWithEmailAndPassword(user);
};

export const logoutUser = async () => {
  await firebaseService.logout();
};

export const loginUserWithGoogle = async () => {
  return await firebaseService.loginUserWithGoogle();
};
