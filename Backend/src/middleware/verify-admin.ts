import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../models/client-errors";
import cyber from "../utils/cyber";

async function verifyAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Verify admin - crash if not valid:
    const isAdmin = await cyber.verifyAdmin(request);

    if (!isAdmin) {
      next(new AuthenticationError("You are not an admin"));
    }

    // If admin - continue:
    next();
  } catch (err: any) {
    next(err);
  }
}

export default verifyAdmin;
