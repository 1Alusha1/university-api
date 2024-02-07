import { Request, Response } from "express";
import { RequestWithBody } from "../../types";
import { planAnnexRepository } from "./planAnnex.repository";
import { opt } from "../../option";
export const planAnnexController = {
  async generatePlanAnnexTable(
    req: RequestWithBody<{ semestr: number }>,
    res: Response
  ) {
    let { semestr } = req.body;
    if (semestr > 8) {
      return res.status(400).json({ message: "Семестрів всього 8" });
    }

    let result = await planAnnexRepository.generatePlanAnnexTable(opt);
    res.status(200).json(result);
  },
};
