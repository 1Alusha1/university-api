import { Router } from "express";
import { planAnnexController } from "../controllers/planAnnex/planAnnex.controller";

const router = Router();

router.get("/generateTable", planAnnexController.generatePlanAnnexTable);

export default router;
