import { Request, Response } from "express";
import { RequestWithBody } from "../../types";
import IPlan from "./plan.interface";
import { PlanRepository } from "./plan.repository";
import { TrequestUpdateDTO, TupdateRecord } from "../workLoad/types";

export const planController = {
  async getSubjectPlan(req: RequestWithBody<{ name: string }>, res: Response) {
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
    let dto: any = [];
    field.forEach((item: TupdateRecord) => {
      if (!item.value) {
        item.value = null;
      }

      if (typeof item.value === "string") {
        item.value.trim();
      }
      dto.push(item);
    });

    const result = await PlanRepository.updateSubjectPlanById(id, dto);

    res.status(201).json({ data: result, message: `Поле успішно оновлено` });
  },
  async getSubjectPlanByName(
    req: RequestWithBody<{ planName: string }>,
    res: Response
  ) {
    const { planName } = req.body;
    if (!planName) {
      return res.status(400).json({ message: "Потриібно вказати назву плану" });
    }
    let result = await PlanRepository.getSubjectPlanByName(planName);

    return res.status(200).json(result);
  },
};
