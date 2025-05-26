import { Response, Request, NextFunction } from 'express';

export type ExpressHandler = (
  req: Request<{},{},any>,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

