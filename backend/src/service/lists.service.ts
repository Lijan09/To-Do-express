import {
  ICreate,
  IList,
  IUpdateComment,
  IUpdateDescription,
  IUpdateStatus,
} from "../interface/lists.interface";
import { IListRepository } from "../interface/lists.repository.interface";
import { IListService } from "../interface/lists.service.interface";
import { IUserRepository } from "../interface/users.repository.interface";

export class ListService implements IListService {
  private listRepo: IListRepository;
  private userRepo: IUserRepository;

  constructor(listRepo: IListRepository, userRepo: IUserRepository) {
    this.userRepo = userRepo;
    this.listRepo = listRepo;
  }

  async create(data: ICreate) {
    const userID = await this.userRepo.getUserID(data.user);
    return await this.listRepo.create({
      title: data.title,
      user: userID,
      description: data.description,
      comments: data.comments,
    });
  }

  async getByTitle(title: string, user: string) {
    const userID = await this.userRepo.getUserID(user);
    const lists = await this.listRepo.findAllByUser(userID);
    const list = lists.find(
      (list) => list.title.toLowerCase() === title.toLowerCase()
    );
    if (!list) {
      throw new Error("No List matching Title");
    }
    return list;
  }

  async getAll(user: string) {
    const userID = await this.userRepo.getUserID(user);
    return this.listRepo.findAllByUser(userID);
  }

  async updateStatus({ title, newStatus, user }: IUpdateStatus) {
    const userID = await this.userRepo.getUserID(user);
    await this.listRepo.updateStatus({ title, newStatus, user: userID });
    return {
      title,
      message: `Status updated to ${newStatus}`,
    };
  }

  async updateDescription({ title, newDescription, user }: IUpdateDescription) {
    const userID = await this.userRepo.getUserID(user);
    await this.listRepo.updateDescription({
      title,
      newDescription,
      user: userID,
    });
    return {
      title,
      message: `Description updated to ${newDescription}`,
    };
  }

  async updateComment({ title, newComment, user }: IUpdateComment) {
    const userID = await this.userRepo.getUserID(user);
    await this.listRepo.updateComment({ title, newComment, user: userID });
    return {
      title,
      message: `Comment updated to ${newComment}`,
    };
  }

  async delete(title: string) {
    return this.listRepo.delete(title);
  }
}
