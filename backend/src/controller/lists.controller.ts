import { IListService } from "../interface/lists.service.interface";
import catchAsync from "../utils/catchAsync";
import { ExpressHandler } from "../types/expressHandler";
import { IListController } from "../interface/lists.controller.interface";

export class ListController implements IListController {
  private listService: IListService;

  constructor(listService: IListService) {
    this.listService = listService;
  }

  create: ExpressHandler = catchAsync(async (req, res, next) => {
    const { title, description, comments, status, user } = req.body;
    const listData = await this.listService.create({
      title,
      description,
      comments,
      status,
      user,
    });
    return res.status(201).json({
      data: { listData },
      message: "Task successfully created",
    });
  });

  getByTitle: ExpressHandler = catchAsync(async (req, res, next) => {
    const { title, user } = req.body;
    const listData = await this.listService.getByTitle(title, user);
    return res.status(200).json({ listData, status: "success" });
  });

  getAll: ExpressHandler = catchAsync(async (req, res, next) => {
    const { user } = req.body;
    const lists = await this.listService.getAll(user);
    return res.status(200).json({ lists, status: "success" });
  });

  updateStatus: ExpressHandler = catchAsync(async (req, res, next) => {
    const { title, newStatus } = req.body;
    const message = await this.listService.updateStatus({ title, newStatus });
    return res.status(200).json({ message });
  });

  updateComment: ExpressHandler = catchAsync(async (req, res, next) => {
    const { title, newComment } = req.body;
    const message = await this.listService.updateComment({ title, newComment });
    return res.status(200).json({ message });
  });

  updateDescription: ExpressHandler = catchAsync(async (req, res, next) => {
    const { title, newDescription } = req.body;
    const message = await this.listService.updateDescription({
      title,
      newDescription,
    });
    return res.status(200).json({ message });
  });

  delete: ExpressHandler = catchAsync(async (req, res, next) => {
    const { title } = req.body;
    const message = await this.listService.delete(title);
    return res.status(200).json({ message });
  });
}
