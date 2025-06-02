import {
  ICreate,
  ICreateReturn,
  IList,
  IUpdateComment,
  IUpdateDescription,
  IUpdateStatus,
} from "./lists.interface";

export interface IListService {
  create(data: ICreate): Promise<ICreateReturn>;
  getByTitle(title: string, user: string): Promise<IList>;
  getAll(user: string): Promise<[] | IList[]>;
  updateStatus(
    updateStatus: IUpdateStatus
  ): Promise<{ title: string; message: string }>;
  updateDescription(
    updateDescription: IUpdateDescription
  ): Promise<{ title: string; message: string }>;
  updateComment(
    updateComment: IUpdateComment
  ): Promise<{ title: string; message: string }>;
  delete(title: string): Promise<{ title: string; message: string }>;
}
