import { hashPassword, validatePassword } from "../utils/auth/auth";
import {
  createUser,
  findUserByUsername,
  updatePassword,
  updateUsername,
  deleteUser,
} from "../repository/users.repository";
import {IAuth, IUpdateName, IUser, IUserName} from "../interface/users.interface";
import { Response } from "express";

export const registerUser = async ({name, password, userName}: IUser) => {
  password = await hashPassword(password);
  createUser({name, password, userName});
  return {
    name,
    userName,
  };
};

export const loginUser = async ({userName, password}: IAuth) => {
  const user = await findUserByUsername({userName});
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await validatePassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }
  return {
    userName: user.userName,
    message: "Login successful",
  }
};

export const logoutUser = async (response: Response) => {
  response.clearCookie("token");
};

export const updatePwd = async ({userName, password}: IAuth) => {
  updatePassword({userName, password});
  return {
    userName,
    message: "Password updated successfully",
  };
};

export const updateUser = async ({oldName, newName}: IUpdateName) => {
  updateUsername({oldName, newName});
  return {
    oldName,
    newName,
    message: "Username updated successfully",
  };
};

export const getProfile = async ({userName}: IUserName) => {
  const user = await findUserByUsername({userName});
  if (!user) {
    throw new Error("User not found");
  }
  return {
    name: user.name,
    username: user.userName,
  };
};

export const deleteUsers = async ({userName}: IUserName) => {
  deleteUser({userName});
  return {
    userName,
    message: "User deleted successfully",
  };
};
