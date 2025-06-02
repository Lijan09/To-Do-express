import express, { RequestHandler } from "express";
import { protect } from "../middleware/auth.middleware";
import { ListController } from "../controller/lists.controller";
import { ListService } from "../service/lists.service";
import { ListRepository } from "../repository/lists.repository";

const router = express.Router();

const listRepo = new ListRepository();
const listService = new ListService(listRepo);
const listController = new ListController(listService);

router.use(protect as RequestHandler);

router.post("/user/lists", listController.create as RequestHandler);
router.get("/user/lists/:title", listController.getByTitle as RequestHandler);
router.get("/user/lists", listController.getAll as RequestHandler);

router.put(
  "/user/lists/update-status",
  listController.updateStatus as RequestHandler
);
router.put(
  "/user/lists/update-comment",
  listController.updateComment as RequestHandler
);
router.put(
  "/user/lists/update-description",
  listController.updateDescription as RequestHandler
);

router.delete("/user/lists/:title", listController.delete as RequestHandler);

export default router;
