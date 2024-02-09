import { Request, Response } from "express";
import { opt } from "../../option";
import { RequestWithBody } from "../../types";
import { workPlanRepository } from "./workPlan.repository";
import { TrequestUpdateDTO, TupdateRecord } from "../workLoad/types";
export const workPlanController = {
  async generateWorkPlan(req: Request, res: Response) {
    let result = await workPlanRepository.generateWorkPlan(opt);
    res.status(200).json(result);
  },

  async updateWorkPlanRecordById(
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
    const result = await workPlanRepository.updateWorkPlanRecordById(id, dto);

    res.status(201).json({ data: result, message: `Поле успішно оновлено` });
  },
};
