import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../models/credentials-model";
import UserModel from "../models/user-model";
import authService from "../services/auth-service";

const router = express.Router(); // Capital R

// POST http://localhost:4000/api/auth/register
router.post(
  "/auth/register",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = new UserModel(request.body);
      const token = await authService.register(user);
      response.status(201).json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:4000/api/auth/login
router.post(
  "/auth/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await authService.login(credentials);
      response.json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
