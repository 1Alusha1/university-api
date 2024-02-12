import { Router } from "express";
import { planNameController } from "../controllers/planName/planName.controller";

const router = Router();

router.get("/", planNameController.getPlanName);
router.post("/", planNameController.createPlanName);
router.patch("/", planNameController.updatePlanName);

export default router;
