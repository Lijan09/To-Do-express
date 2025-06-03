import List from "../models/lists.model";
import { IList, IListRepository } from "../interface/lists.interface";

export class ListRepository implements IListRepository {
  async create(data: Partial<IList>) {
    const newList = new List({
      title: data.title,
      userID: data.userID,
      description: data.description,
      comments: data.comments,
    });
    await newList.save();
    return {
      title: newList.title,
      description: newList.description,
      comments: newList.comments,
      status: newList.status,
    };
  }

  async findAllByUser(listData: Partial<IList>) {
    const lists = await List.find({ userID: listData.userID }).lean();
    if (!lists) {
      throw new Error("Lists not found");
    }
    return lists.map((list: any) => ({
      title: list.title,
      description: list.description,
      comments: list.comments,
      status: list.status,
      createdAt: list.createdAt,
      userID: list.userID?.toString?.() ?? list.userID,
    }));
  }

  async updateList(updateData: Partial<IList>) {
    const list = await List.findOne({
      title: updateData.title,
      userID: updateData.userID,
    });
    if (!list) {
      throw new Error("List not found");
    }
    if (updateData.description) {
      list.description = updateData.description;
    }
    if (updateData.comments) {
      list.comments = updateData.comments;
    }
    if (updateData.status) {
      list.status = updateData.status;
    }
    await list.save();
    return {
      title: list.title,
      description: list.description,
      comments: list.comments,
      status: list.status,
    };
  }

  async delete(deleteData: Partial<IList>) {
    const list = await List.findOne({
      title: deleteData.title,
    });
    if (!list) {
      throw new Error("List not found");
    }
    await list.deleteOne();
    return {
      title: list.title,
    };
  }
}
