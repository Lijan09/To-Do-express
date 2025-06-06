import catchAsync from "../utils/catchAsync";
import { ExpressHandler } from "../types/expressHandler";
import { IListService, IListController } from "../interface/lists.interface";

export class ListController implements IListController {
  private listService: IListService;

  constructor(listService: IListService) {
    this.listService = listService;
  }

  create: ExpressHandler = catchAsync(async (req, res, next) => {
    const bodyData = req.body;
    const user = res.locals.user;
    console.log("User ID:", user);
    const listData = await this.listService.create({
      title: bodyData.title,
      description: bodyData.description,
      comments: bodyData.comments,
      userID: user,
    });
    return res.status(201).json({
      data: { listData },
      message: "Task successfully created",
    });
  });

  getByTitle: ExpressHandler = catchAsync(async (req, res, next) => {
    const title = req.params.title;
    const user = res.locals.user;
    const listData = await this.listService.getByTitle({
      title: title,
      userID: user,
    });
    return res.status(200).json({ listData, status: "success" });
  });

  getAll: ExpressHandler = catchAsync(async (req, res, next) => {
    const user = res.locals.user;
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offset = req.query.offset || 0;
    const pageData = {
      limit: Number(limit),
      page: Number(page),
      offset: Number(offset),
    };
    const lists = await this.listService.getAll({ userID: user }, pageData);
    return res.status(200).json({ lists, status: "success" });
  });

  updateList: ExpressHandler = catchAsync(async (req, res, next) => {
    const bodyData = req.body;
    const title = req.params.title;
    const user = res.locals.user;
    const updatedList = await this.listService.updateList({
      title: title,
      description: bodyData.description,
      comments: bodyData.comments,
      status: bodyData.status,
      userID: user,
    });
    return res.status(200).json({
      data: { updatedList },
      message: "List updated successfully",
    });
  });

  delete: ExpressHandler = catchAsync(async (req, res, next) => {
    const title = req.params.title;
    const user = res.locals.user;
    const message = await this.listService.delete({
      title: title,
      userID: user,
    });
    return res
      .status(200)
      .json({ message: message, status: `Successfully deleted ${title}` });
  });
}
