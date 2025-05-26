import { hashPassword } from './../utils/auth/auth';
import User from '../models/users.model';
import { IUser, IUserName, IAuth, IUpdateName } from '../interface/users.interface';
import { Document } from 'mongoose';

interface IUserUpdate extends IUser, Document {}

export const createUser = async ({name, password, userName}: IUser) => {
  const user = new User({
    name,
    password,
    userName,
  });
  await user.save();
};

export const findUserByUsername = async ({userName}: IUserName) => {
  const user = await User.findOne({ userName });
  return user;
};

export const updatePassword = async ({userName, password}: IAuth) => {
  const user = await User.findOne({ userName });
  if (!user) {
    throw new Error("User not found");
  }
  const hashedPassword = await hashPassword(password);
  user.password = hashedPassword;
  await user.save();
};

export const updateUsername = async ({oldName, newName}: IUpdateName) => {
  const user: IUserUpdate | null = await User.findOne({ userName: oldName });
  if (!user) {
    throw new Error("User not found");
  }
  user.name = newName;
  await user.save();
};

export const deleteUser = async ({userName}: IUserName) => {
  const user: IUserUpdate | null = await User.findOne({ userName });
  if (!user) {
    throw new Error("User not found");
  }
  await user.deleteOne();
  return {
    userName: user.userName,
    message: "User deleted successfully",
  };
};
