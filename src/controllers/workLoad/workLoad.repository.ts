import workloadModel from "../../models/workload.model";
import IWorkLoad from "./workLoad.interface";
import { TupdateRecord } from "./types";
export const workLoadRepository = {
  async getRecords(): Promise<IWorkLoad[]> {
    let result: IWorkLoad[] = await workloadModel.find();
    return result;
  },
  async createRecord(dto: IWorkLoad): Promise<IWorkLoad> {
    const wokrLoad: IWorkLoad = await new workloadModel({
      ...dto,
    }).save();

    return wokrLoad;
  },
  async updateRecords(id: string, field: TupdateRecord): Promise<IWorkLoad> {
    let { name, value } = field;

    let obj: any = {};
    obj[name] = value;

    let record: IWorkLoad = (await workloadModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: obj },
      { new: true }
    ))!;
    return record;
  },
};
