import { Request, Response } from "express";
import { RequestWithBody } from "../../types";
import { planAnnexRepository } from "./planAnnex.repository";
import { opt } from "../../option";
import planAnnexModel from "../../models/planAnnex.model";
import { TrequestUpdateDTO, TupdateRecord } from "../workLoad/types";
import { workLoadRepository } from "../workLoad/workLoad.repository";
export const planAnnexController = {
  async generatePlanAnnexTable(
    req: RequestWithBody<{ planName: string }>,
    res: Response
  ) {
    let { planName } = req.body;

    if (!planName) {
      return res.status(400).json({ message: "Потрібно вказати назву плану" });
    }

    let result = await planAnnexRepository.generatePlanAnnexTable(
      opt,
      planName
    );
    res.status(200).json(result);
  },

  async updatePlanAnnexRecordById(
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

    const result = await planAnnexRepository.updatePlanAnnexRecordById(id, dto);

    res.status(201).json({ data: result, message: `Поле успішно оновлено` });
  },
  async getPlanAnnexTable(req: Request, res: Response) {
    let result = await planAnnexRepository.getPlanAnnexTable();
    res.status(200).json({ data: result });
  },
  async getPlanAnnexByName(
    req: RequestWithBody<{ planName: string }>,
    res: Response
  ) {
    const { planName } = req.body;
    if (!planName) {
      return res.status(400).json({ message: "Потриібно вказати назву плану" });
    }
    let result = await planAnnexRepository.getPlanAnnexByName(planName);

    return res.status(200).json(result);
  },
};
