import planNameModel from "../../models/planName.model";
import IPlanName from "./planName.interface";
import { TupdateRecord } from "../workLoad/types";
import { createUpdateObject } from "../../utils/utils";
export const planNameRepository = {
  async createPlanName(dto: IPlanName) {
    const planName = await planNameModel.findOne({ planName: dto.planName });
    if (planName?.planName) {
      return { message: "Такий план вже є" };
    }
    await new planNameModel({
      ...dto,
    }).save();

    return { message: "План успішно створено" };
  },
  async updatePlanName(planName: string, field: TupdateRecord) {
    let obj: any = {};
    let { name, value } = field;
    obj[name] = value;

    await planNameModel.findOneAndUpdate(
      { planName: planName },
      { ...obj },
      { new: true }
    );

    return { message: "Запис успішно оновлено" };
  },
  async getPlanName(name: string) {
    const planName = await planNameModel.findOne({
      planName: name,
    });

    return planName;
  },
};
