import { UserController } from "./../controller/users.controller";
import { Router, RequestHandler } from "express";
import { UserService } from "../service/users.service";
import { UserRepository } from "../repository/users.repository";

const router = Router();

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.post("/register", userController.register as RequestHandler);
router.post("/login", userController.login as RequestHandler);

export default router;
