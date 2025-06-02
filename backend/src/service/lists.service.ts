import {
  IList,
  IUpdateComment,
  IUpdateDescription,
  IUpdateStatus,
} from "../interface/lists.interface";
import { IListRepository } from "../interface/lists.repository.interface";
import { IListService } from "../interface/lists.service.interface";

export class ListService implements IListService {
  private listRepo: IListRepository;

  constructor(listRepo: IListRepository) {
    this.listRepo = listRepo;
  }

  async create(data: IList) {
    return await this.listRepo.create(data);
  }

  async getByTitle(title: string, user: string) {
    const lists = await this.getAll(user);
    const list = lists.find(
      (list) => list.title.toLowerCase() === title.toLowerCase()
    );
    if (!list) {
      throw new Error("No List matching Title");
    }
    return list;
  }

  async getAll(user: string) {
    return this.listRepo.findAllByUser(user);
  }

  async updateStatus({ title, newStatus }: IUpdateStatus) {
    await this.listRepo.updateStatus({ title, newStatus });
    return {
      title,
      message: `Status updated to ${newStatus}`,
    };
  }

  async updateDescription({ title, newDescription }: IUpdateDescription) {
    await this.listRepo.updateDescription({ title, newDescription });
    return {
      title,
      message: `Description updated to ${newDescription}`,
    };
  }

  async updateComment({ title, newComment }: IUpdateComment) {
    await this.listRepo.updateComment({ title, newComment });
    return {
      title,
      message: `Comment updated to ${newComment}`,
    };
  }

  async delete(title: string) {
    return this.listRepo.delete(title);
  }
}
