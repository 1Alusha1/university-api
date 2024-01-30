import { Router } from "express";
import { workLoadController } from "../controllers/workLoad/workLoad.controller";

const router = Router();

router.get("/", workLoadController.getRecords);
router.post("/", workLoadController.createRecord);
router.patch("/",workLoadController.updateRecord);

export default router;
