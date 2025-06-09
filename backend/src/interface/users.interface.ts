import { ExpressHandler } from "./../types/expressHandler";

export interface IUser {
  name: string;
  password: string;
  userName: string;
  resetToken?: string;
  tokenExpiry?: Date;
}

export interface IUpdate {
  userName: string;
  confirmPassword: string;
  password?: string;
  name?: string;
  resetToken?: string;
  tokenExpiry?: Date;
}

export interface IUserController {
  register: ExpressHandler;
  login: ExpressHandler;
  logout: ExpressHandler;
  updateUser: ExpressHandler;
  forgotPassword: ExpressHandler;
  getProfile: ExpressHandler;
  deleteUser: ExpressHandler;
}

export interface IUserService {
  registerUser(user: IUser): Promise<Partial<IUser>>;
  loginUser(auth: Partial<IUser>): Promise<Partial<IUser>>;
  updateUser(updateData: IUpdate): Promise<Partial<IUser>>;
  forgotPassword(resetData: Partial<IUser>): Promise<Partial<IUser>>;
  resetPassword(resetData: Partial<IUser>): Promise<Partial<IUser>>;
  getProfile(userName: Partial<IUser>): Promise<Partial<IUser>>;
  deleteUsers(userName: Partial<IUser>): Promise<Partial<IUser> | null>;
}

export interface IUserRepository {
  createUser(user: IUser): Promise<Partial<IUser>>;
  getUserData(
    userName: Partial<IUser>,
    type: string
  ): Promise<string | Partial<IUser>>;
  getUserByID(id: string): Promise<Partial<IUser>>;
  resetPassword(resetData: Partial<IUser>): Promise<Partial<IUser>>;
  updateUser(updateData: Partial<IUpdate>): Promise<Partial<IUser>>;
  deleteUser(userName: Partial<IUser>): Promise<Partial<IUser> | null>;
}
