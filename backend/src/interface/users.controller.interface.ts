import { ExpressHandler } from "../type/expressHandler";

export interface IUserController {
  register: ExpressHandler;
  login: ExpressHandler;
  logout: ExpressHandler;
  updatePassword: ExpressHandler;
  updateName: ExpressHandler;
  getProfile: ExpressHandler;
  deleteUser: ExpressHandler;
}
