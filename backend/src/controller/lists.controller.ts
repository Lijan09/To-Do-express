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
    const lists = await this.listService.getAll({ userID: user });
    return res.status(200).json({ lists, status: "success" });
  });

  updateList: ExpressHandler = catchAsync(async (req, res, next) => {
    const bodyData = req.body;
    const user = res.locals.user;
    const updatedList = await this.listService.updateList({
      title: bodyData.title,
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
    const { title } = req.body;
    const message = await this.listService.delete(title);
    return res.status(200).json({ message });
  });
}
