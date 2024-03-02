import { Router } from "express";
import { planAnnexController } from "../controllers/planAnnex/planAnnex.controller";

const router = Router();

router.get("/", planAnnexController.getPlanAnnexTable);
router.post("/get-plan-by-name", planAnnexController.getPlanAnnexByName);
router.post("/generateTable", planAnnexController.generatePlanAnnexTable);
router.patch("/updateTable", planAnnexController.updatePlanAnnexRecordById);

export default router;
