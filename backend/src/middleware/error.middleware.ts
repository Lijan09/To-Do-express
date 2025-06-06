import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.code === "11000") {
    err.message = `Duplicate field value: ${
      Object.keys(err.keyValue)[0]
    }. Please use another value!`;
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
