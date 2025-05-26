import { ExpressHandler } from "../type/expressHandler";
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
    res.status(201).json({
      status: "success",
      token,
      data: { userData },
    });
  });

  login: ExpressHandler = catchAsync(async (req, res, next) => {
    const { userName, password } = req.body;
    const userData = await this.userService.loginUser({ userName, password });
    const token = tokenHandler.generate(userName);
    res.status(200).json({
      status: "success",
      token,
      data: { userData },
    });
  });

  logout: ExpressHandler = catchAsync(async (req, res, next) => {
    await this.userService.logoutUser(res);
    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  });

  updatePassword: ExpressHandler = catchAsync(async (req, res, next) => {
    const { userName, password } = req.body;
    const userData = await this.userService.updatePwd({ userName, password });
    res.status(200).json({
      status: "success",
      data: { userData },
    });
  });

  updateName: ExpressHandler = catchAsync(async (req, res, next) => {
    const { oldName, newName } = req.body;
    const userData = await this.userService.updateUser({ oldName, newName });
    res.status(200).json({
      status: "success",
      data: { userData },
    });
  });

  getProfile: ExpressHandler = catchAsync(async (req, res, next) => {
    const { userName } = req.body;
    const userData = await this.userService.getProfile({ userName });
    res.status(200).json({
      status: "success",
      data: { userData },
    });
  });

  deleteUser: ExpressHandler = catchAsync(async (req, res, next) => {
    const { userName } = req.body;
    const userData = await this.userService.deleteUsers({ userName });
    res.status(200).json({
      status: "success",
      data: { userData },
    });
  });
}
