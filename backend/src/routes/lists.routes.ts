import express, { RequestHandler } from "express";
import { protect, allowSelfOnly } from "../middleware/auth.middleware";
import { ListController } from "../controller/lists.controller";
import { ListService } from "../service/lists.service";
import { ListRepository } from "../repository/lists.repository";
import { UserRepository } from "../repository/users.repository";

const router = express.Router();

const userRepo = new UserRepository();
const listRepo = new ListRepository();
const listService = new ListService(listRepo, userRepo);
const listController = new ListController(listService);

router.post("/", listController.create as RequestHandler);

router.get("/:title", listController.getByTitle as RequestHandler);
router.get("/", listController.getAll as RequestHandler);

router.put("/update/:title", listController.updateList as RequestHandler);
router.delete("/delete/:title", listController.delete as RequestHandler);

export default router;
