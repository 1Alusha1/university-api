import { Request, Response } from "express";
import { RequestWithBody } from "../../types";
import { planAnnexRepository } from "./planAnnex.repository";
import { opt } from "../../option";
import planAnnexModel from "../../models/planAnnex.model";
import { TrequestUpdateDTO, TupdateRecord } from "../workLoad/types";
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
};
