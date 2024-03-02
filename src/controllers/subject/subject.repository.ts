import subjectModel from "../../models/subject.model";
import ISubject from "./subject.interface";
export const SubjectRepositiry = {
  async createSubject(dto: ISubject): Promise<ISubject> {
    const subject: ISubject = await new subjectModel({
      ...dto,
    }).save();

    return subject;
  },
  async getSubject() {
    const subject = await subjectModel.find();
    return subject;
  },
};
