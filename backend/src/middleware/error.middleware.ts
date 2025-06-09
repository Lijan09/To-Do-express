import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";

const duplicateValue = (err: any) => {
  return new ErrorHandler(
    `Duplicate Value: ${
      Object.keys(err.keyValue)[0]
    }. Please use another value!`,
    400
  );
};

const jwtErrorHandler = (err: any) => {
  return new ErrorHandler(`Invalid Json Web Token`, 400);
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.code === "11000") err = duplicateValue(err);
  if (err.message === "JsonWebTokenError") err = jwtErrorHandler(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
