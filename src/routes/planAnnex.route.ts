import { Router } from "express";
import { planAnnexController } from "../controllers/planAnnex/planAnnex.controller";

const router = Router();

router.get("/", planAnnexController.generatePlanAnnexTable);
router.patch("/updateTable", planAnnexController.updatePlanAnnexRecordById);

export default router;
