import { Router } from "express";
import { workPlanController } from "../controllers/workPlan/workPlan.controller";

const router = Router();

router.get("/", workPlanController.getWorkPlan);
router.post("/get-plan-by-name", workPlanController.getWorkPlanByName);
router.post("/generateTable", workPlanController.generateWorkPlan);
router.patch("/updateTable", workPlanController.updateWorkPlanRecordById);

export default router;
