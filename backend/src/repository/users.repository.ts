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
    if (type.toLowerCase() === "token") {
      const user = await User.findOne({
        resetToken: username.resetToken,
      }).select("+resetToken +tokenExpiry");
      if (!user) {
        throw new ErrorHandler("Invalid Token", 404);
      }
      if (user.tokenExpiry && user.tokenExpiry < new Date()) {
        throw new ErrorHandler("Token has expired", 400);
      }
      return user.resetToken || "";
    }

    const user = await User.findOne({ userName: username.userName }).select(
      "+password +_id +resetToken"
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

  async resetPassword(resetData: Partial<IUser>) {
    const user = await User.findOne({
      resetToken: resetData.resetToken,
    }).select("+resetToken +tokenExpiry");
    if (!user) {
      throw new ErrorHandler("Invalid reset token", 400);
    }
    if (resetData.password) {
      user.password = resetData.password as string;
    } else {
      throw new ErrorHandler("Password is required", 400);
    }
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();
    return {
      userName: user.userName,
      message: "Password reset successfully",
    };
  }

  async getUserByID(id: string) {
    const user = await User.findOne({ _id: id });
    return user!;
  }

  async updateUser(updateData: Partial<IUpdate>) {
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
    if (updateData.resetToken) {
      user.resetToken = updateData.resetToken;
      user.tokenExpiry = updateData.tokenExpiry;
      user.save();
      return {
        userName: user.userName,
      };
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
