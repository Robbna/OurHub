import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

import type { IUserDto, INewUser } from "@/common/data/user";
import { consoleLog } from "@/server/utils/logger/LogUtils";

const app = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
});

const auth = getAuth(app);
const database = getDatabase(app);

export const signup = async (user: INewUser): Promise<IUserDto> => {
  const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
  const userSignedUp: IUserDto = {
    username: userCredential.user.displayName,
    email: userCredential.user.email,
    lastSignInTime: userCredential.user.metadata.lastSignInTime,
    creationTime: userCredential.user.metadata.creationTime
  };
  return userSignedUp;
};
export const consoleLogin = async (user: INewUser): Promise<IUserDto> => {
  const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
  const userconsoleLoggedIn: IUserDto = {
    username: userCredential.user.displayName,
    email: userCredential.user.email,
    lastSignInTime: userCredential.user.metadata.lastSignInTime,
    creationTime: userCredential.user.metadata.creationTime
  };
  return userconsoleLoggedIn;
};
export const consoleLogout = async (): Promise<void> => {
  if (!auth.currentUser) {
    consoleLog("ERROR", "No user is currently consoleLogged in!");
    return;
  }
  await auth.signOut();
};

export const getMaintenanceMode = async (): Promise<boolean> => {
  const snapshot = await get(child(ref(database), "config"));
  return snapshot.exists() ? snapshot.val().maintenanceMode : false;
};
