import { Response, Request, NextFunction } from "express";

export type ExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void | Response<any>;
