import { Router } from "express";
import { workPlanController } from "../controllers/workPlan/workPlan.controller";

const router = Router();

router.get("/", workPlanController.generateWorkPlan);

export default router;
