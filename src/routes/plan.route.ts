import { Router } from "express";
import { planController } from "../controllers/plan/plan.controller";

const router = Router();

router.get("/", planController.getSubjectPlan);
router.post("/get-plan-by-name", planController.getSubjectPlanByName);
router.post("/", planController.createSubjectPlan);
router.patch("/", planController.updateSubjectPlanById);

export default router;
