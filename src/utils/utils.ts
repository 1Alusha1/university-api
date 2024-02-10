import { TupdateRecord } from "../controllers/workLoad/types";

export function createUpdateObject(data: TupdateRecord[]) {
  let obj: any = {};
  data.forEach((item: TupdateRecord) => {
    let { name, value } = item;

    obj[name] = value;
  });
  return obj;
}
