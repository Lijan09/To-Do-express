import {
  IUser,
  IUserName,
  IAuth,
  IUpdateName,
  IProfile,
} from "./users.interface";
export interface IUserRepository {
  createUser(user: IUser): Promise<IProfile>;
  findUserByUsername(userName: IUserName): Promise<IUser>;
  updatePassword(auth: IAuth): Promise<void>;
  updateName(updateName: IUpdateName): Promise<void>;
  deleteUser(
    userName: IUserName
  ): Promise<{ userName: string; message: string }>;
}
