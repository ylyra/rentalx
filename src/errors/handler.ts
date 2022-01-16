import { ErrorRequestHandler } from "express";

import { AppError } from "./AppError";

const errorHandler: ErrorRequestHandler = (error, _, response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    message: "Internal Server Error",
    error,
  });
};

export default errorHandler;
