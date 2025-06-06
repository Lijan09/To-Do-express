import List from "../models/lists.model";
import { IList, IListRepository, IPage } from "../interface/lists.interface";
import ErrorHandler from "../utils/errorHandler";
import { Types } from "mongoose";

export class ListRepository implements IListRepository {
  async create(data: Partial<IList>) {
    const newList = new List({
      title: data.title,
      userID: data.userID,
      description: data.description,
      comments: data.comments,
    });
    console.log("Creating new list with data:", newList);
    await newList.save();
    return {
      title: newList.title,
      description: newList.description,
      comments: newList.comments,
      status: newList.status,
    };
  }

  async findAllByUser(listData: Partial<IList>, pageData: IPage) {
    const startIndex = (pageData.page - 1) * pageData.limit;
    const lists = await List.find({ userID: listData.userID })
      .limit(pageData.limit)
      .skip(startIndex)
      .lean();
    return lists.map((list: any) => ({
      title: list.title,
      description: list.description,
      comments: list.comments,
      status: list.status,
      createdAt: list.createdAt,
      userID: list.userID?.toString?.() ?? list.userID,
    }));
  }

  async findByTitle(listData: Partial<IList>) {
    const list = await List.findOne({
      userID: listData.userID,
      title: listData.title,
    }).lean();
    if (!list) {
      throw new ErrorHandler("List not found", 404);
    }
    return {
      title: list.title,
      description: list.description,
      comments: list.comments,
      status: list.status,
      createdAt: list.createdAt,
      userID: list.userID?.toString?.() ?? list.userID,
    };
  }

  async updateList(updateData: Partial<IList>) {
    const list = await List.findOne({
      title: updateData.title,
      userID: updateData.userID,
    });
    if (!list) {
      throw new ErrorHandler("cannot update, list not found", 404);
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
      userID: deleteData.userID,
    });
    if (!list) {
      throw new ErrorHandler("Cannot delete, list not found", 404);
    }
    await list.deleteOne();
    return {
      title: list.title,
    };
  }
}
