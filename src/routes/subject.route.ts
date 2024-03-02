import { Router } from "express";
import { subjectController } from "../controllers/subject/subject.controller";

const router = Router();

router.get("/", subjectController.getSubjects);
router.post("/", subjectController.createSubject);

export default router;
