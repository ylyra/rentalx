import { ErrorRequestHandler } from "express";

import { AppError } from "./AppError";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    error,
  });
};

export default errorHandler;
