import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../middleware/verify-logged-in";
import userVacationService from "../services/user-vacation-service";
import cyber from "../utils/cyber";
import imageHandler from "../utils/image-handler";

const userRouter = express.Router(); // Capital R

// GET http://localhost:4000/api/user/vacations
userRouter.get(
  "/user/vacations",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = cyber.getUserFromToken(request)
      const vacations = await userVacationService.getAllVacations(user)
      response.json(vacations)
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:4000/api/user/follow/:vacationId([0-9]+)
userRouter.post(
  "/user/follow/:vacationId([0-9]+)",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = cyber.getUserFromToken(request)
      const vacationId = +request.params.vacationId;
      await userVacationService.follow(user.userId, vacationId)
      response.sendStatus(201)
    } catch (err: any) {
      next(err);
    }
  }
);

// DELETE http://localhost:4000/api/user/unfollow/:vacationId([0-9]+)
userRouter.delete(
  "/user/unfollow/:vacationId([0-9]+)",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = cyber.getUserFromToken(request)
      const vacationId = +request.params.vacationId;
      await userVacationService.unfollow(user.userId, vacationId)
      response.sendStatus(204)
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:4000/api/user/vacation/images/:imageName
userRouter.get(
  "/user/vacation/images/:imageName",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const absolutePath = imageHandler.getAbsolutePath(imageName)
      response.sendFile(absolutePath)
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:4000/api/admin/vacations
userRouter.get(
  "/user/vacations/images/:imageName",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const absolutePath = imageHandler.getAbsolutePath(imageName);
      response.sendFile(absolutePath);
    } catch (err: any) {
      next(err);
    }
  }
);

export default userRouter;