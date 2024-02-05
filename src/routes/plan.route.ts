import { Router } from "express";
import { planController } from "../controllers/plan/plan.controller";

const router = Router();

router.get("/", planController.getSubjectPlan);
router.post("/", planController.createSubjectPlan);
router.post("/planAnnex", planController.createPlanHelper);
router.patch("/", planController.updateSubjectPlanById);

export default router;
