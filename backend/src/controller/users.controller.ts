import { ExpressHandler } from "../types/expressHandler";
import catchAsync from "../utils/catchAsync";
import { IUser } from "../interface/users.interface";
import { IUserService } from "../interface/users.service.interface";
import { IUserController } from "../interface/users.controller.interface";
import { Token } from "../utils/auth/token";

const tokenHandler = new Token();

export class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  register: ExpressHandler = catchAsync(async (req, res, next) => {
    const { name, password, userName } = req.body;
    const userData = await this.userService.registerUser({
      name,
      password,
      userName,
    } as IUser);
    const token = tokenHandler.generate(userName);
    return res.status(201).json({
      status: "success",
      token,
      data: { userData },
    });
  });

  login: ExpressHandler = catchAsync(async (req, res, next) => {
    const { userName, password } = req.body;
    const userData = await this.userService.loginUser({ userName, password });
    const token = tokenHandler.generate(userName);
    return res.status(200).json({
      status: "success",
      token,
      data: { userData },
    });
  });

  logout: ExpressHandler = catchAsync(async (req, res, next) => {
    res.clearCookie("token");
    return res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  });

  updatePassword: ExpressHandler = catchAsync(async (req, res, next) => {
    const { userName, password } = req.body;
    const userData = await this.userService.updatePwd({ userName, password });
    return res.status(200).json({
      status: "success",
      data: { userData },
    });
  });

  updateName: ExpressHandler = catchAsync(async (req, res, next) => {
    const { oldName, newName } = req.body;
    const userData = await this.userService.updateName({ oldName, newName });
    return res.status(200).json({
      status: "success",
      data: { userData },
    });
  });

  getProfile: ExpressHandler = catchAsync(async (req, res, next) => {
    const { userName } = req.body;
    const userData = await this.userService.getProfile({ userName });
    return res.status(200).json({
      status: "success",
      data: { userData },
    });
  });

  deleteUser: ExpressHandler = catchAsync(async (req, res, next) => {
    const { userName } = req.body;
    const userData = await this.userService.deleteUsers({ userName });
    return res.status(200).json({
      status: "success",
      data: `User ${userData.userName} deleted successfully`,
    });
  });
}
