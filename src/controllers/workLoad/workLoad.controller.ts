import { Request, Response } from "express";
import { workLoadRepository } from "./workLoad.repository";
import IWorkLoad from "./workLoad.interface";
import { RequestWithBody } from "../../types";
import { TrequestUpdateDTO, TresponseArray, TresponseOneRecord } from "./types";
export const workLoadController = {
  async getRecords(req: Request, res: Response<TresponseArray>) {
    let result: IWorkLoad[] = await workLoadRepository.getRecords();
    if (!result.length) {
      return res.status(404).json({ message: "Записи відсутні" });
    }
    return res
      .status(200)
      .json({ data: result, message: "Список успішно отримано" });
  },

  async createRecord(
    req: RequestWithBody<IWorkLoad>,
    res: Response<TresponseOneRecord>
  ) {
    const dto = req.body;

    const result: IWorkLoad = await workLoadRepository.createRecord(dto);

    res.status(201).json({ data: result, message: "Нагрузку додано" });
  },

  async updateRecord(
    req: RequestWithBody<TrequestUpdateDTO>,
    res: Response<TresponseOneRecord>
  ) {
    let { id, field } = req.body;

    if (!field.value) {
      field.value = null;
    }

    if (typeof field.value === "string") {
      field.value.trim();
    }

    const result = await workLoadRepository.updateRecords(id, field);

    res.status(201).json({ data: result, message: `Поле успішно оновлено` });
  },
};
