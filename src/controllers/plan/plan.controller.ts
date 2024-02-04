import { Request, Response } from "express";
import { RequestWithBody } from "../../types";
import IPlan from "./plan.inteface";
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
};
