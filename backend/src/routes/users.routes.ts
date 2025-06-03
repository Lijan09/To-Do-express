import express, { RequestHandler } from "express";
import { protect, allowSelfOnly } from "../middleware/auth.middleware";
import { UserController } from "../controller/users.controller";
import { UserService } from "../service/users.service";
import { UserRepository } from "../repository/users.repository";

const router = express.Router();

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.post("/register", userController.register as RequestHandler);
router.post("/login", userController.login as RequestHandler);

router.use(protect as RequestHandler);

router.post("/logout", userController.logout as RequestHandler);

router.use(allowSelfOnly as RequestHandler);

router.put("/update/:user", userController.updateUser as RequestHandler);
router.get("/:user", userController.getProfile as RequestHandler);
router.delete(
  "/delete/:user",
  userController.deleteUser as RequestHandler
);

export default router;
