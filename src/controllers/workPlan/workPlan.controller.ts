import { Request, Response } from "express";
import { opt } from "../../option";
import { RequestWithBody } from "../../types";
import { workPlanRepository } from "./workPlan.repository";
import { TrequestUpdateDTO, TupdateRecord } from "../workLoad/types";
export const workPlanController = {
  async generateWorkPlan(
    req: RequestWithBody<{ planName: string }>,
    res: Response
  ) {
    const { planName } = req.body;
    if (!planName) {
      return res.status(400).json({ message: "Потрібно вказати назву плану" });
      // { planName: planName }
    }
    let result = await workPlanRepository.generateWorkPlan(opt, planName);
    res.status(200).json(result);
  },
  async getWorkPlan(req: Request, res: Response) {
    let result = await workPlanRepository.getWorkPlan();
    res.status(200).json({ data: result });
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
  async getWorkPlanByName(
    req: RequestWithBody<{ planName: string }>,
    res: Response
  ) {
    const { planName } = req.body;
    if (!planName) {
      return res.status(400).json({ message: "Потриібно вказати назву плану" });
    }
    let result = await workPlanRepository.getWorkPlanByName(planName);

    return res.status(200).json(result);
  },
};
