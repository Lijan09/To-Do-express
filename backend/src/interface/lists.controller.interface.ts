import { ExpressHandler } from "../type/expressHandler";

export interface IListController {
  create: ExpressHandler;
  getByTitle: ExpressHandler;
  getAll: ExpressHandler;
  updateStatus: ExpressHandler;
  updateComment: ExpressHandler;
  updateDescription: ExpressHandler;
  delete: ExpressHandler;
}
