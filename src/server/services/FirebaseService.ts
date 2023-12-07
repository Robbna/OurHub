import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import type { IUserDto, IPublicUser } from "@/common/data/user";
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
const googleProvider = new GoogleAuthProvider();

const signupUserWithEmailAndPassword = async (user: IPublicUser): Promise<IUserDto> => {
  const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
  const userSignedUp: IUserDto = {
    username: userCredential.user.displayName,
    email: userCredential.user.email,
    lastSignInTime: userCredential.user.metadata.lastSignInTime,
    creationTime: userCredential.user.metadata.creationTime
  };
  return userSignedUp;
};

const loginUserWithGoogle = async (): Promise<IUserDto> => {
  const result = await signInWithPopup(auth, googleProvider);
  // This gives you a Google Access Token. You can use it to access the Google API.
  // const credential = GoogleAuthProvider.credentialFromResult(result);
  // if (credential) {
  //   const token = credential.accessToken;
  //   const user = result.user;
  // }
  const userLoggedIn: IUserDto = {
    username: result.user.displayName,
    email: result.user.email,
    lastSignInTime: result.user.metadata.lastSignInTime,
    creationTime: result.user.metadata.creationTime
  };

  return userLoggedIn;
};

const loginWithEmailAndPassword = async (user: IPublicUser): Promise<IUserDto> => {
  const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
  const userLoggedIn: IUserDto = {
    username: userCredential.user.displayName,
    email: userCredential.user.email,
    lastSignInTime: userCredential.user.metadata.lastSignInTime,
    creationTime: userCredential.user.metadata.creationTime
  };
  return userLoggedIn;
};
const logout = async (): Promise<void> => {
  if (!auth.currentUser) {
    consoleLog("ERROR", "No user is currently consoleLogged in!");
    return;
  }
  await auth.signOut();
};

const getMaintenanceMode = async (): Promise<boolean> => {
  const snapshot = await get(child(ref(database), "config"));
  return snapshot.exists() ? snapshot.val().maintenanceMode : false;
};

export default { signupUserWithEmailAndPassword, loginUserWithGoogle, loginWithEmailAndPassword, logout, getMaintenanceMode };
