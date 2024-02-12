import IPlanName from "./planName.interface";
import { RequestWithBody, RequestWithQuery } from "../../types";
import { Request, Response } from "express";
import { planNameRepository } from "./planName.repository";
import { TupdateRecord } from "../workLoad/types";
export const planNameController = {
  async createPlanName(req: Request, res: Response) {
    console.log(req.body);
    let result = await planNameRepository.createPlanName(req.body);
    res.json(result);
  },
  async updatePlanName(
    req: RequestWithBody<{
      planName: string;
      field: TupdateRecord;
    }>,
    res: Response
  ) {
    let { planName, field } = req.body;
    let result = await planNameRepository.updatePlanName(planName, field);
    res.status(201).json(result);
  },
  async getPlanName(req: RequestWithQuery<{ name: string }>, res: Response) {
    let { name } = req.query;
    let result = await planNameRepository.getPlanName(name);
    res.status(200).json(result);
  },
};
