import {
  IList,
  IListRepository,
  IListService,
  IPage,
} from "../interface/lists.interface";
import { IUserRepository } from "../interface/users.interface";
import ErrorHandler from "../utils/errorHandler";

export class ListService implements IListService {
  private listRepo: IListRepository;
  private userRepo: IUserRepository;

  constructor(listRepo: IListRepository, userRepo: IUserRepository) {
    this.userRepo = userRepo;
    this.listRepo = listRepo;
  }

  async create(data: Partial<IList>) {
    const userID = await this.userRepo.getUserData(
      { userName: data.userID },
      "id"
    );
    console.log("User ID:", userID);
    const response = await this.listRepo.create({
      title: data.title,
      userID: userID as string,
      description: data.description,
      comments: data.comments,
    });
    return {
      title: response.title,
      description: response.description,
      comments: response.comments,
      status: response.status,
      message: "List created successfully",
    };
  }

  async getByTitle(listData: Partial<IList>) {
    const userID = await this.userRepo.getUserData(
      { userName: listData.userID },
      "id"
    );
    listData.userID = userID as string;
    const list = await this.listRepo.findByTitle(listData);
    return list;
  }

  async getAll(listData: Partial<IList>, pageData: IPage) {
    const userID = await this.userRepo.getUserData(
      { userName: listData.userID },
      "id"
    );
    listData.userID = userID as string;
    return this.listRepo.findAllByUser(listData, pageData);
  }

  async updateList(updateData: IList) {
    const userID = await this.userRepo.getUserData(
      { userName: updateData.userID },
      "id"
    );
    updateData.userID = userID as string;
    const list = await this.listRepo.updateList(updateData);
    return list;
  }

  async delete(deleteData: Partial<IList>) {
    const userID = await this.userRepo.getUserData(
      { userName: deleteData.userID },
      "id"
    );
    deleteData.userID = userID as string;
    return this.listRepo.delete(deleteData);
  }
}
