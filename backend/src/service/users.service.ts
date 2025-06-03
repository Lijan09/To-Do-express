import {
  IUpdate,
  IUser,
  IUserService,
  IUserRepository,
} from "../interface/users.interface";
import { PasswordUtils } from "../utils/auth/auth";

const passwordUtils = new PasswordUtils();

export class UserService implements IUserService {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async registerUser(userData: IUser) {
    const user = await this.userRepo.createUser(userData);
    if (!user) throw new Error("User registration failed");
    return {
      name: user.name,
      userName: user.userName,
      message: "User registered successfully",
    };
  }

  async loginUser(authData: Partial<IUser>) {
    const user = (await this.userRepo.getUserData(
      { userName: authData.userName },
      "userName"
    )) as IUser | null;
    if (!user) throw new Error("User not found");
    const hashedPassword = (await this.userRepo.getUserData(
      { userName: authData.userName },
      "password"
    )) as string;
    const isValid = await passwordUtils.validatePassword(
      authData.password as string,
      hashedPassword
    );

    if (!isValid) throw new Error("Invalid password");

    return {
      userName: user.userName,
      message: "Login successful",
    };
  }

  async updateUser(updateData: IUpdate) {
    const hashedPassword = (await this.userRepo.getUserData(
      { userName: updateData.userName },
      "password"
    )) as string;
    const isValid = await passwordUtils.validatePassword(
      updateData.confirmPassword,
      hashedPassword
    );
    if (!isValid) throw new Error("Invalid password");
    const user = await this.userRepo.updateUser(updateData);
    if (!user) throw new Error("User update failed");
    return {
      userName: user.userName,
      name: user.name,
      message: "User updated successfully",
    };
  }

  async getProfile(userData: IUser) {
    const user = (await this.userRepo.getUserData(
      { userName: userData.userName },
      "userName"
    )) as IUser | null;

    if (!user) throw new Error("User not found");

    return {
      name: user.name,
      userName: user.userName,
    };
  }

  async deleteUsers({ userName }: Partial<IUser>) {
    await this.userRepo.deleteUser({ userName });
    return {
      userName,
      message: "User deleted successfully",
    };
  }
}
