import { ExpressHandler } from "../types/expressHandler";

export interface IListController {
  create: ExpressHandler;
  getByTitle: ExpressHandler;
  getAll: ExpressHandler;
  updateStatus: ExpressHandler;
  updateComment: ExpressHandler;
  updateDescription: ExpressHandler;
  delete: ExpressHandler;
}
