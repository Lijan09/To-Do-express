import {
  IUpdate,
  IUser,
  IUserService,
  IUserRepository,
} from "../interface/users.interface";
import { PasswordUtils } from "../utils/auth/auth";
import ErrorHandler from "../utils/errorHandler";

const passwordUtils = new PasswordUtils();

export class UserService implements IUserService {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async registerUser(userData: IUser) {
    console.log("User Data: ", userData);
    const user = await this.userRepo.createUser(userData);
    if (!user) {
      const err = new ErrorHandler("User Registration failed!", 404);
    }
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
    const hashedPassword = (await this.userRepo.getUserData(
      { userName: authData.userName },
      "password"
    )) as string;
    const isValid = await passwordUtils.validatePassword(
      authData.password as string,
      hashedPassword
    );

    if (!isValid) throw new ErrorHandler("Invalid Password!", 403);

    return {
      userName: user!.userName,
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
    if (!isValid) throw new ErrorHandler("Invalid Password!", 403);
    const user = await this.userRepo.updateUser(updateData);
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

    return {
      name: user!.name,
      userName: user!.userName,
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
