import { Request, Response } from "express";
import { RequestWithBody } from "../../types";
import IPlan from "./plan.interface";
import { PlanRepository } from "./plan.repository";
import planModel from "../../models/plan.model";
import { TrequestUpdateDTO } from "../workLoad/types";

export const planController = {
  async getSubjectPlan(req: Request, res: Response) {
    let result: IPlan[] = await PlanRepository.getSubjectPlan();
    if (!result.length) {
      return res.status(404).json({ message: "Записи відсутні" });
    }
    return res
      .status(200)
      .json({ data: result, message: "Список успішно отримано" });
  },
  async createSubjectPlan(req: RequestWithBody<IPlan>, res: Response) {
    const dto = req.body;
    const result: IPlan = await PlanRepository.createSubjectPlan(dto);

    res.status(201).json({
      data: result,
      message: `План для предмету додано`,
    });
  },
  async updateSubjectPlanById(
    req: RequestWithBody<TrequestUpdateDTO>,
    res: Response
  ) {
    let { id, field } = req.body;

    if (!field.value) {
      field.value = null;
    }

    if (typeof field.value === "string") {
      field.value.trim();
    }

    const result = await PlanRepository.updateSubjectPlanById(id, field);

    res.status(201).json({ data: result, message: `Поле успішно оновлено` });
  },
  async createPlanAnnex(
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
    let result = await PlanRepository.createPlanAnnex(opt);
    res.status(200).json(result);
  },
};
