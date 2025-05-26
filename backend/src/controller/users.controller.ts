import { Request, Response, NextFunction } from 'express';
import { Token } from '../utils/auth/token';
import { ExpressHandler } from '../type/expressHandler';
import catchAsync from '../utils/catchAsync';
import {
  registerUser,
  loginUser,
  logoutUser,
  updatePwd,
  getProfile,
  updateUser,
  deleteUsers,
} from '../service/users.service';

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, password, username } = req.body;
  const userData = await registerUser(name, password, username);
  const token = new Token({ username }).generate();
  res.status(201).json({
    status: "success",
    token,
    data: { userData },
  });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const userData = await loginUser(username, password);
  const token = new Token({username}).generate();
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

exports.updateName = catchAsync(async (req, res, next) => {
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
