import { Token } from '../utils/auth/token';
import { ExpressHandler } from '../type/expressHandler';
import catchAsync from '../utils/catchAsync';
import { IUser } from '../interface/users.interface';
import { }
import { IPasswordUtil } from '../interface/utils.interface';


export const register: ExpressHandler = catchAsync(async (req, res, next) => {
  const { name, password, userName } = req.body;
  const userData = await registerUser({name, password, userName} as IUser);
  const token = new Token({ userName }).generate();
  res.status(201).json({
    status: "success",
    token,
    data: { userData },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;
  const userData = await loginUser({userName, password});
  const token = new Token({userName}).generate();
  res.status(200).json({
    status: "success",
    token,
    data: { userData },
  });
});

export const logout: ExpressHandler = catchAsync(async (req, res, next) => {
  logoutUser(res);
  res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;
  const userData = updatePwd({userName, password});
  res.status(200).json({
    status: "success",
    data: { userData },
  });
});

export const updateName: ExpressHandler = catchAsync(async (req, res, next) => {
  const { username } = req.user;
  const { newUsername } = req.body;
  const userData = updateUser(username, newUsername);
  res.status(200).json({
    status: "success",
    data: { userData },
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const { username } = req.user;
  const userData = getProfile(username);
  res.status(200).json({
    status: "success",
    data: { userData },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { username } = req.user;
  const userData = deleteUser(username);
  res.status(200).json({
    status: "success",
    data: { userData },
  });
});
