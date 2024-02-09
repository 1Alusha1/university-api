import { Router } from "express";
import { workPlanController } from "../controllers/workPlan/workPlan.controller";

const router = Router();

router.get("/", workPlanController.generateWorkPlan);
router.patch("/updateTable", workPlanController.updateWorkPlanRecordById);

export default router;
