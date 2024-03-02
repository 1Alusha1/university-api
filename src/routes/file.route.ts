import { Router } from "express";
import { fileController } from "../controllers/file/file.controller";
const router = Router();

router.post("/read-CSV", fileController.readCSVAndCreatePlan);

export default router;
