import planModel from "../../models/plan.model";
import IPlan from "./plan.inteface";
import { TupdateRecord } from "../workLoad/types";

export const PlanRepository = {
  async getSubjectPlan(): Promise<IPlan[]> {
    const plan: IPlan[] = await planModel.find();
    return plan;
  },
  async createSubjectPlan(dto: IPlan): Promise<IPlan> {
    const plan = await new planModel({ ...dto }).save();
    return plan;
  },

  async updateSubjectPlanById(
    id: string,
    field: TupdateRecord
  ): Promise<IPlan> {
    let { name, value } = field;

    let obj: any = {};
    obj[name] = value;

    let record: IPlan = (await planModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: obj },
      { new: true }
    ))!;
    return record;
  },
};
