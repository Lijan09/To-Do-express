import {
  ICreate,
  IList,
  IUpdateComment,
  IUpdateDescription,
  IUpdateStatus,
} from "./lists.interface";

export interface IListRepository {
  create(data: IList): Promise<ICreate>;
  findAllByUser(userId: string): Promise<IList[] | []>;
  updateStatus(updateStatus: IUpdateStatus): Promise<void>;
  updateDescription(updateDescription: IUpdateDescription): Promise<void>;
  updateComment(updateComment: IUpdateComment): Promise<void>;
  delete(title: string): Promise<{ title: string; message: string }>;
}
