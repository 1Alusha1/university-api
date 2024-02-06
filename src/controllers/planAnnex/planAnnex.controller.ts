import { Request, Response } from "express";
import { RequestWithBody } from "../../types";
import { planAnnexRepository } from "./planAnnex.repository";
export const planAnnexController = {
  async generatePlanAnnexTable(
    req: RequestWithBody<{ semestr: number }>,
    res: Response
  ) {
    let { semestr } = req.body;
    if (semestr > 8) {
      return res.status(400).json({ message: "Семестрів всього 8" });
    }
    let opt: any = {
      1: "ff1",
      2: "ff2",
      3: "ss1",
      4: "ss2",
      5: "tt1",
      6: "tt2",
      7: "th1",
      8: "th2",
    };
    let result = await planAnnexRepository.generatePlanAnnexTable(opt);
    res.status(200).json(result);
  },
};
