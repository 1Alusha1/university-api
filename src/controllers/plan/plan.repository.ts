import planModel from "../../models/plan.model";
import IPlan from "./plan.interface";
import { TupdateRecord } from "../workLoad/types";
import { createUpdateObject } from "../../utils/utils";

export const PlanRepository = {
  async getSubjectPlan(): Promise<IPlan[]> {
    const plan: IPlan[] = await planModel.find();
    return plan;
  },
  async createSubjectPlan(dto: IPlan) {
    const plan = await new planModel({ ...dto }).save();
    return plan;
  },

  async updateSubjectPlanById(id: string, field: TupdateRecord[]) {
    let obj = createUpdateObject(field);

    let record: IPlan = (await planModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: { ...obj } },
      { new: true }
    ))!;
    return record;
  },
};
