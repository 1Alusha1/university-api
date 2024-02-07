import { Request, Response } from "express";
import { opt } from "../../option";
import { workPlanRepository } from "./workPlan.repository";
export const workPlanController = {
  async generateWorkPlan(req: Request, res: Response) {
    let result = await workPlanRepository.generateWorkPlan(opt);

    res.status(200).json(result);
  },
};
