import express, { RequestHandler } from "express";
import { protect, allowSelfOnly } from "../middleware/auth.middleware";
import { UserController } from "../controller/users.controller";
import { UserService } from "../service/users.service";
import { UserRepository } from "../repository/users.repository";

const router = express.Router();

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.post("/logout", userController.logout as RequestHandler);

router.put(
  "/update/:user",
  allowSelfOnly as RequestHandler,
  userController.updateUser as RequestHandler
);
router.get(
  "/:user",
  allowSelfOnly as RequestHandler,
  userController.getProfile as RequestHandler
);
router.delete(
  "/delete/:user",
  allowSelfOnly as RequestHandler,
  userController.deleteUser as RequestHandler
);

export default router;
