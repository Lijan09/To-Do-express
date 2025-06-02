import List, { IListSchema } from "../models/lists.model";
import { IListRepository } from "../interface/lists.repository.interface";
import {
  ICreate,
  IList,
  IUpdateComment,
  IUpdateDescription,
  IUpdateStatus,
} from "../interface/lists.interface";

export class ListRepository implements IListRepository {
  async create(data: ICreate) {
    const newList = new List({
      title: data.title,
      user: data.user,
      description: data.description,
      comments: data.comments,
    });
    await newList.save();
    return {
      title: newList.title,
      description: newList.description,
      comments: newList.comments,
    };
  }

  async findAllByUser(user: string) {
    const lists = await List.find({ user: user })
      .select("title description comments status createdAt -_id")
      .lean();
    if (!lists) {
      throw new Error("Lists not found");
    }
    return lists;
  }

  async updateStatus({ title, newStatus, user }: IUpdateStatus) {
    const list = await List.findOne({
      title: title,
      user: user,
    });
    if (!list) {
      throw new Error("List not found");
    }
    list.status = newStatus;
    await list.save();
  }

  async updateDescription({ title, newDescription, user }: IUpdateDescription) {
    const list = await List.findOne({ title: title, user: user });
    if (!list) {
      throw new Error("List not found");
    }
    list.description = newDescription;
    await list.save();
  }

  async updateComment({ title, newComment, user }: IUpdateComment) {
    const list = await List.findOne({ title: title, user: user });
    if (!list) {
      throw new Error("List not found");
    }
    list.comments = newComment;
    await list.save();
  }

  async delete(title: string) {
    const list = await List.findOne({ title });
    if (!list) {
      throw new Error("List not found");
    }
    await list.deleteOne();
    return {
      title: list.title,
      message: "List deleted successfully",
    };
  }
}
