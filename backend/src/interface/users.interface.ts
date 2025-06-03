import { ExpressHandler } from "./../types/expressHandler";

export interface IUser {
  name: string;
  password: string;
  userName: string;
}

export interface IUpdate {
  userName: string;
  confirmPassword: string;
  password?: string;
  name?: string;
}

export interface IUserController {
  register: ExpressHandler;
  login: ExpressHandler;
  logout: ExpressHandler;
  updateUser: ExpressHandler;
  getProfile: ExpressHandler;
  deleteUser: ExpressHandler;
}

export interface IUserService {
  registerUser(user: IUser): Promise<Partial<IUser>>;
  loginUser(auth: Partial<IUser>): Promise<Partial<IUser>>;
  updateUser(updateData: IUpdate): Promise<Partial<IUser>>;
  getProfile(userName: Partial<IUser>): Promise<Partial<IUser>>;
  deleteUsers(userName: Partial<IUser>): Promise<Partial<IUser> | null>;
}

export interface IUserRepository {
  createUser(user: IUser): Promise<Partial<IUser>>;
  getUserData(
    username: Partial<IUser>,
    type: string
  ): Promise<string | Partial<IUser>>;
  updateUser(updateData: IUpdate): Promise<Partial<IUser>>;
  deleteUser(userName: Partial<IUser>): Promise<Partial<IUser> | null>;
}
