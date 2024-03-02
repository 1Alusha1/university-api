import { Request, Response } from "express";
import { fileRepository } from "./file.repository";
export const fileController = {
  async readCSVAndCreatePlan(req: Request, res: Response) {
    if (!req.files) {
      return res.status(400).json({ message: "Потрібно обрати файл" });
    }
    const { planFile }: any = req.files;
    const result = await fileRepository.readCSVAndCreatePlan(planFile);
    res.status(200).json(result);
  },
};
