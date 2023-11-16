export interface INewUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserDto {
  username: string | null;
  email: string | null;
  creationTime: string | undefined;
  lastSignInTime: string | undefined;
}
