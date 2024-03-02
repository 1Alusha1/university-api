import { Request, Response } from "express";
import { RequestWithBody } from "../../types";
import ISubject from "./subject.interface";
import { SubjectRepositiry } from "./subject.repository";
import subjectModel from "../../models/subject.model";
export const subjectController = {
  async createSubject(req: RequestWithBody<ISubject>, res: Response) {
    let { codeTIN, subject } = req.body;
    if (!codeTIN) {
      return res
        .status(400)
        .json({ message: "Код предмету не може бути пустим" });
    }
    if (!subject) {
      return res
        .status(400)
        .json({ message: "Назва предмету не може бути пустої" });
    }

    let dto: ISubject = req.body;

    const result = await SubjectRepositiry.createSubject(dto);

    res.status(200).json({ message: "Предмет додано", data: result });
  },
  async getSubjects(req: Request, res: Response) {
    const result = await SubjectRepositiry.getSubject();
    res.status(200).json({ data: result });
  },
};
