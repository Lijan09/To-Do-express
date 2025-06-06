import { ExpressHandler } from "../types/expressHandler";

export interface IList {
  title: string;
  description?: string;
  comments?: string;
  status: "active" | "doing" | "completed";
  userID: string;
}

export interface IPage {
  limit: number;
  page: number;
  offset: number;
}

export interface IListRepository {
  create(data: Partial<IList>): Promise<Partial<IList>>;
  findAllByUser(
    listData: Partial<IList>,
    pageData: IPage
  ): Promise<IList[] | []>;
  findByTitle(listData: Partial<IList>): Promise<IList>;
  updateList(updateData: IList): Promise<Partial<IList>>;
  delete(deleteData: Partial<IList>): Promise<Partial<IList>>;
}

export interface IListService {
  create(data: Partial<IList>): Promise<Partial<IList>>;
  getByTitle(listData: Partial<IList>): Promise<IList>;
  getAll(listData: Partial<IList>, pageData: IPage): Promise<[] | IList[]>;
  updateList(updateData: IList): Promise<Partial<IList>>;
  delete(deleteData: Partial<IList>): Promise<Partial<IList>>;
}

export interface IListController {
  create: ExpressHandler;
  getByTitle: ExpressHandler;
  getAll: ExpressHandler;
  updateList: ExpressHandler;
  delete: ExpressHandler;
}
