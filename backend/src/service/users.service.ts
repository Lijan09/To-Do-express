import {
  IAuth,
  IUpdateName,
  IUser,
  IUserName,
} from "../interface/users.interface";
import { Response } from "express";
import { IUserRepository } from "../interface/users.repository.interface";
import { IPasswordUtil } from "../interface/utils.interface";
import { IUserService } from "../interface/users.service.interface";

export class UserService implements IUserService {
  private userRepo: IUserRepository;
  private passwordUtil: IPasswordUtil;

  constructor(userRepo: IUserRepository, passwordUtil: IPasswordUtil) {
    this.userRepo = userRepo;
    this.passwordUtil = passwordUtil;
  }

  async registerUser({ name, password, userName }: IUser) {
    const hashed = await this.passwordUtil.hashPassword(password);
    await this.userRepo.createUser({ name, password: hashed, userName });

    return { name, userName };
  }

  async loginUser({ userName, password }: IAuth) {
    const user = await this.userRepo.findUserByUsername({ userName });
    if (!user) throw new Error("User not found");

    const isValid = await this.passwordUtil.validatePassword(
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
