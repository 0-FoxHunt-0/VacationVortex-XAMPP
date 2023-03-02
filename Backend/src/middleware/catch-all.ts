import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

function catchAll(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // Log error to the console:
  console.log(err);

  if (err.status === 500) {
    logger.logError(err);
  }

  // Take error status code:
  const statusCode = err.status || 500;

  // Return back error:
  response.status(statusCode).send(err.message);
}

export default catchAll;
