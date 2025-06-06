import User, { IUserSchema } from "../models/users.model";
import { IUser, IUpdate, IUserRepository } from "../interface/users.interface";
import ErrorHandler from "../utils/errorHandler";

export class UserRepository implements IUserRepository {
  async createUser(userData: IUser) {
    const user: IUserSchema = new User({
      name: userData.name,
      userName: userData.userName,
      password: userData.password,
    });
    await user.save();
    
    return {
      name: userData.name,
      userName: userData.userName,
    };
  }

  async getUserData(username: Partial<IUser>, type: string) {
    const user = await User.findOne({ userName: username.userName }).select(
      "+password +_id"
    );
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }
    type = type.toLowerCase();
    if (type === "password") {
      return user.password;
    } else if (type === "id") {
      return user._id as string;
    }
    return {
      userName: user.userName,
      name: user.name,
    };
  }

  async updateUser(updateData: IUpdate) {
    const user = await User.findOne({ userName: updateData.userName }).select(
      "+password"
    );
    if (!user) {
      throw new ErrorHandler("Cannot update, User not found", 404);
    }
    if (updateData.password) {
      user.password = updateData.password;
    }
    if (updateData.name) {
      user.name = updateData.name;
    }
    await user.save();
    return {
      userName: user.userName,
      name: user.name,
    };
  }

  async deleteUser(userName: Partial<IUser>) {
    const user: IUserSchema | null = await User.findOne({
      userName: userName.userName,
    });
    if (!user) {
      throw new ErrorHandler("Cannot delete, User not found", 404);
    }
    await user.deleteOne();
    return {
      userName: user.userName,
    };
  }
}
