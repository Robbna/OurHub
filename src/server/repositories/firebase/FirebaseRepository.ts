import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import type { IUserRepository } from "../types";
import type { IUserDto, INewUser } from "@/server/data";
import { Log } from "@/server/utils/logger/LogUtils";

export class FirebaseRepository implements IUserRepository {
  private app;
  private auth;
  private database;

  constructor() {
    this.app = initializeApp({
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PROJECT_ID,
      databaseURL: import.meta.env.VITE_DATABASE_URL,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
      measurementId: import.meta.env.VITE_MEASUREMENT_ID
    });

    this.auth = getAuth(this.app);
    this.database = getDatabase(this.app);
  }

  signup = async (user: INewUser): Promise<IUserDto | null> => {
    let userSignedUp: IUserDto | null = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        user.email,
        user.password
      );

      userSignedUp = {
        username: userCredential.user.displayName,
        email: userCredential.user.email,
        lastSignInTime: userCredential.user.metadata.lastSignInTime,
        creationTime: userCredential.user.metadata.creationTime
      };
      Log("INFO", "User signed up!");
    } catch (error: any) {
      Log("ERROR", error.message);
    }
    return userSignedUp;
  };
  login = async (user: INewUser): Promise<IUserDto | null> => {
    let userLoggedIn: IUserDto | null = null;
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        user.email,
        user.password
      );
      userLoggedIn = {
        username: userCredential.user.displayName,
        email: userCredential.user.email,
        lastSignInTime: userCredential.user.metadata.lastSignInTime,
        creationTime: userCredential.user.metadata.creationTime
      };
      Log("INFO", "User logged in!");
    } catch (error: any) {
      Log("ERROR", error.message);
    }
    return userLoggedIn;
  };
  logout = async (): Promise<void> => {
    try {
      if (!this.auth.currentUser) {
        Log("ERROR", "No user is currently logged in!");
        return;
      }
      await this.auth.signOut();
      Log("INFO", "User logged out!");
    } catch (error: any) {
      Log("ERROR", error.message);
    }
  };
}
