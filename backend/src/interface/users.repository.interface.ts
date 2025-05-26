import { IUser, IUserName, IAuth,IUpdateName, IProfile } from "./users.interface";
export interface IUserRepository {
    createUser(user: IUser): Promise<IProfile>;
    findUserByUsername(userName: IUserName): Promise<IUser | null>;
    updatePassword(auth: IAuth): Promise<void>;
    updateUsername(updateName: IUpdateName): Promise<void>;
    deleteUser(userName: IUserName): Promise<{ userName: string; message: string }>;
}