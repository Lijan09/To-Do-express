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
    const user = await this.userRepo.createUser(userData);
    if (!user) throw new ErrorHandler("User registration failed", 404);
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
    if (!user) throw new ErrorHandler("User not found", 404);
    const hashedPassword = (await this.userRepo.getUserData(
      { userName: authData.userName },
      "password"
    )) as string;
    const isValid = await passwordUtils.validatePassword(
      authData.password as string,
      hashedPassword
    );

    if (!isValid) throw new ErrorHandler("Invalid password", 401);

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
    if (!user) throw new ErrorHandler("User update failed", 404);
    return {
      userName: user.userName,
      name: user.name,
      message: "User updated successfully",
    };
  }

  async resetPassword(resetData: Partial<IUser>) {
    resetData.resetToken = passwordUtils.hashResetToken(
      resetData.resetToken as string
    );
    await this.userRepo.getUserData(
      { resetToken: resetData.resetToken },
      "token"
    );
    const user = await this.userRepo.resetPassword(resetData);
    if (!user) throw new ErrorHandler("Password reset failed", 500);
    return user;
  }

  async forgotPassword(resetData: Partial<IUser>) {
    const user = (await this.userRepo.getUserData(
      { userName: resetData.userName },
      "userName"
    )) as Partial<IUser> | null;
    if (!user) throw new ErrorHandler("User not found", 404);

    const resetToken = await passwordUtils.generateResetToken();
    const resetTokenHash = await passwordUtils.hashResetToken(resetToken);
    const token = await this.userRepo.updateUser({
      userName: user.userName,
      resetToken: resetTokenHash,
      tokenExpiry: new Date(Date.now() + 3600000), // 1 hour expiry
    });
    return {
      userName: token.userName,
      resetToken,
      message: "Reset token generated successfully",
    };
  }

  async getProfile(userData: IUser) {
    const user = (await this.userRepo.getUserData(
      { userName: userData.userName },
      "userName"
    )) as IUser | null;

    if (!user) throw new ErrorHandler("User not found", 404);

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
