import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";

const catchAsync = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

export default catchAsync;
 