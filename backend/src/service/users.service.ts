import {
  IAuth,
  IUpdateName,
  IUser,
  IUserName,
} from "../interface/users.interface";
import { Response } from "express";
import { IUserRepository } from "../interface/users.repository.interface";
import { IUserService } from "../interface/users.service.interface";
import { PasswordUtils } from "../utils/auth/auth";

const passwordUtils = new PasswordUtils();

export class UserService implements IUserService {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async registerUser({ name, password, userName }: IUser) {
    const hashed = await passwordUtils.hashPassword(password);
    await this.userRepo.createUser({ name, password: hashed, userName });

    return { name, userName };
  }

  async loginUser({ userName, password }: IAuth) {
    const user = await this.userRepo.findUserByUsername({ userName });
    if (!user) throw new Error("User not found");

    const isValid = await passwordUtils.validatePassword(
      password,
      user.password
    );
    if (!isValid) throw new Error("Invalid password");

    return {
      userName: user.userName,
      message: "Login successful",
    };
  }

  async logoutUser(response: Response) {
    response.clearCookie("token");
  }

  async updatePwd({ userName, password }: IAuth) {
    await this.userRepo.updatePassword({ userName, password });
    return {
      userName,
      message: "Password updated successfully",
    };
  }

  async updateUser({ oldName, newName }: IUpdateName) {
    await this.userRepo.updateUsername({ oldName, newName });
    return {
      oldName,
      newName,
      message: "Username updated successfully",
    };
  }

  async getProfile({ userName }: IUserName) {
    const user = await this.userRepo.findUserByUsername({ userName });
    if (!user) throw new Error("User not found");

    return {
      name: user.name,
      userName: user.userName,
    };
  }

  async deleteUsers({ userName }: IUserName) {
    await this.userRepo.deleteUser({ userName });
    return {
      userName,
      message: "User deleted successfully",
    };
  }
}
