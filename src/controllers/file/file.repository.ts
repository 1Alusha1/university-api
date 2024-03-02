import fs from "fs";
import csv from "csvtojson";
import { PlanRepository } from "../plan/plan.repository";
import { planNameRepository } from "../planName/planName.repository";
import IPlan from "../plan/plan.interface";
interface CSVRow {
  [key: string]: string;
}
export const fileRepository = {
  async readCSVAndCreatePlan(file: any) {
    const filePath = `./uploads.csv`;
    const data = file.data.toString();

    fs.writeFileSync(filePath, data, "utf-8");
    let result: string = "";
    return csv()
      .fromFile(filePath)
      .then(async (jsonObj) => {
        let planName = jsonObj[0].planName;

        let pn = await planNameRepository.getPlanName(planName);
        if (!pn) {
          const modifiedObjectsArray = await jsonObj.map((item: any) =>
            replaceCommasWithDots(item)
          );

          await planNameRepository.createPlanName({ planName });
          await PlanRepository.planInserMany(modifiedObjectsArray as IPlan);
          fs.unlinkSync(filePath);
          result = "План успішно додано";
        } else {
          result = "План вже був доданий";
        }

        return { message: result };
      });
  },
};
function replaceCommasWithDots(obj: any): any {
  const fieldsToReplace = [
    "ff1__1",
    "ff2__1",
    "ss1__1",
    "ss2__1",
    "tt1__1",
    "tt2__1",
    "th1__1",
    "th2__1",
    "ff1",
    "ff2",
    "ss1",
    "ss2",
    "tt1",
    "tt2",
    "th1",
    "th2",
  ];
  const newObj = { ...obj }; // Создаем копию исходного объекта
  fieldsToReplace.forEach((field) => {
    if (newObj[field]) {
      newObj[field] = newObj[field].replace(/,/g, ".");
    }
  });
  return newObj;
}
