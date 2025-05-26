import {
  IUser,
  IUserName,
  IAuth,
  IUpdateName,
  IProfile,
} from "./users.interface";
export interface IUserService {
  registerUser(user: IUser): Promise<IProfile>;
  loginUser(auth: IAuth): Promise<IUserName>;
  logoutUser(response: any): Promise<void>;
  updatePwd(auth: IAuth): Promise<IUserName>;
  updateUser(updateName: IUpdateName): Promise<IUpdateName>;
  getProfile(userName: IUserName): Promise<IProfile>;
  deleteUsers(
    userName: IUserName
  ): Promise<{ userName: string; message: string }>;
}
