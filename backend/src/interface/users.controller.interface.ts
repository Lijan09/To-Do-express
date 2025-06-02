import { ExpressHandler } from "../types/expressHandler";

export interface IUserController {
  register: ExpressHandler;
  login: ExpressHandler;
  logout: ExpressHandler;
  updatePassword: ExpressHandler;
  updateName: ExpressHandler;
  getProfile: ExpressHandler;
  deleteUser: ExpressHandler;
}
