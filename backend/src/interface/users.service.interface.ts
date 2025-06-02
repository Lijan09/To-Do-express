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
  updatePwd(auth: IAuth): Promise<IUserName>;
  updateName(updateName: IUpdateName): Promise<IUpdateName>;
  getProfile(userName: IUserName): Promise<IProfile>;
  deleteUsers(
    userName: IUserName
  ): Promise<{ userName: string; message: string }>;
}
