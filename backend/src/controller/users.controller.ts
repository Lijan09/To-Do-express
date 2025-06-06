import { ExpressHandler } from "../types/expressHandler";
import catchAsync from "../utils/catchAsync";
import {
  IUser,
  IUserController,
  IUserService,
} from "../interface/users.interface";
import { Token } from "../utils/auth/token";

const tokenHandler = new Token();

export class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  register: ExpressHandler = catchAsync(async (req, res, next) => {
    const bodyData = req.body;
    const userData = await this.userService.registerUser({
      name: bodyData.name,
      password: bodyData.password,
      userName: bodyData.userName,
    } as IUser);
    const token = tokenHandler.generate(bodyData.userName);
    return res.status(201).json({
      status: "success",
      token,
      data: { userData },
    });
  });

  login: ExpressHandler = catchAsync(async (req, res, next) => {
    const bodyData = req.body;
    const userData = (await this.userService.loginUser({
      userName: bodyData.userName,
      password: bodyData.password,
    })) as Partial<IUser>;
    const token = tokenHandler.generate(bodyData.userName);
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

  updateUser: ExpressHandler = catchAsync(async (req, res, next) => {
    const bodyData = req.body;
    const userName = req.params.user;
    const userData = await this.userService.updateUser({
      userName: userName,
      password: bodyData.password,
      name: bodyData.name,
      confirmPassword: bodyData.confirmPassword,
    });
    return res.status(200).json({
      status: "success",
      data: { userData },
    });
  });

  getProfile: ExpressHandler = catchAsync(async (req, res, next) => {
    const userName = req.params.user;
    const userData = await this.userService.getProfile({ userName });
    return res.status(200).json({
      status: "success",
      data: { userData },
    });
  });

  deleteUser: ExpressHandler = catchAsync(async (req, res, next) => {
    const userName = req.params.user;
    console.log("Deleting user:", userName);
    const userData = await this.userService.deleteUsers({ userName });
    return res.status(200).json({
      status: "success",
      data: `User ${userData?.userName} deleted successfully`,
    });
  });
}
