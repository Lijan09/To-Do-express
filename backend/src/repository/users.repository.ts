import User from "../models/users.model";
import {
  IUser,
  IUserName,
  IAuth,
  IUpdateName,
} from "../interface/users.interface";
import { Document } from "mongoose";
import { PasswordUtils } from "../utils/auth/auth";
import { IUserRepository } from "../interface/users.repository.interface";

interface IUserUpdate extends IUser, Document {}

const passwordUtils = new PasswordUtils();

export class UserRepository implements IUserRepository {
  async createUser({ name, password, userName }: IUser) {
    const hashedPassword = await passwordUtils.hashPassword(password);
    const user: IUserUpdate = new User({
      name,
      userName,
      password: hashedPassword,
    });
    await user.save();
    return {
      name,
      userName,
    };
  }

  async findUserByUsername({ userName }: IUserName) {
    const user = await User.findOne({ userName });
    return {
      userName: user?.userName || "",
      name: user?.name || "",
      password: user?.password || "",
    };
  }

  async updatePassword({ userName, password }: IAuth) {
    const user: IUserUpdate | null = await User.findOne({ userName });
    if (!user) {
      throw new Error("User not found");
    }
    const hashedPassword = await passwordUtils.hashPassword(password);
    user.password = hashedPassword;
    await user.save();
  }

  async updateUsername({ oldName, newName }: IUpdateName) {
    const user: IUserUpdate | null = await User.findOne({ userName: oldName });
    if (!user) {
      throw new Error("User not found");
    }
    user.name = newName;
    await user.save();
  }

  async deleteUser({ userName }: IUserName) {
    const user: IUserUpdate | null = await User.findOne({ userName });
    if (!user) {
      throw new Error("User not found");
    }
    await user.deleteOne();
    return {
      userName: user.userName,
      message: "User deleted successfully",
    };
  }
}
