import User, { IUserSchema } from "../models/users.model";
import {
  IUser,
  IUserName,
  IAuth,
  IUpdateName,
} from "../interface/users.interface";
import { IUserRepository } from "../interface/users.repository.interface";

export class UserRepository implements IUserRepository {
  async createUser({ name, password, userName }: IUser) {
    const user: IUserSchema = new User({
      name,
      userName,
      password,
    });
    await user.save();
    return {
      name,
      userName,
    };
  }

  async findUserByUsername({ userName }: IUserName) {
    const user = await User.findOne({ userName }).select("+password");
    if (!user) {
      throw new Error("User not found");
    }
    return {
      userName: user.userName,
      name: user.name,
      password: user.password,
    };
  }

  async updatePassword({ userName, password }: IAuth) {
    const user: IUserSchema | null = await User.findOne({ userName });
    if (!user) {
      throw new Error("User not found");
    }
    user.password = password;
    await user.save();
  }

  async updateName({ oldName, newName }: IUpdateName) {
    const user: IUserSchema | null = await User.findOne({ userName: oldName });
    if (!user) {
      throw new Error("User not found");
    }
    user.name = newName;
    await user.save();
  }

  async deleteUser({ userName }: IUserName) {
    const user: IUserSchema | null = await User.findOne({ userName });
    if (!user) {
      throw new Error("User not found");
    }
    await user.deleteOne();
    return {
      userName: user.userName,
      message: "User deleted successfully",
    };
  }

  async getUserID(userName: string) {
    const user = await User.findOne({ userName }).select("_id");
    if (!user) {
      throw new Error("User not found");
    }
    return user._id as string;
  }
}
