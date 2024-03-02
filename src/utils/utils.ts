import IPlan from "../controllers/plan/plan.interface";
import { TupdateRecord } from "../controllers/workLoad/types";
import planModel from "../models/plan.model";

export function createUpdateObject(data: TupdateRecord[]) {
  let obj: any = {};
  data.forEach((item: TupdateRecord) => {
    let { name, value } = item;

    obj[name] = value;
  });
  return obj;
}

export async function getSemestrRecords(opt: any, planName: string) {
  let result = [];
  let first = "";
  let condition: any = {};

  for (let i = 1; i <= 8; i++) {
    first = opt[i];
    condition[first] = { $ne: "" };
    let obj = await planModel.find({
      ...condition,
      planName,
    });

    result.push({
      semestr: i,
      obj,
    });
    condition = {};
  }

  return result;
}

export function getCredits(semestr: number, data: any, opt: any) {
  let credits: any;
  let condition = semestr + 1 >= 8 ? 8 : semestr + 1;

  if (data[opt[semestr]] && data[opt[condition]]) {
    credits = Number(data[opt[semestr]]) + Number(data[opt[condition]]);
  } else {
    credits = data[opt[semestr]];
  }
  return { countCredits: Number(credits) };
}

export function getCourseCredits(semestr: number, data: any, opt: any) {
  return { countCredits: Number(data[opt[semestr]]) };
}

export function getCoefficient(semestr: number, data: any, opt: any) {
  if (data[opt[`c${semestr}`]] === "") {
    data[opt[`c${semestr}`]] = 1;
  }
  if (data[opt[`c${semestr}`]] === "**") {
    data[opt[`c${semestr}`]] = 1;
  }
  if (data[opt[`c${semestr}`]] === "-") {
    data[opt[`c${semestr}`]] = 1;
  }
  return { coefficient: Number(data[opt[`c${semestr}`]]) };
}

export function getWeek(semestr: number, data: any, opt: any) {
  return {
    week:
      typeof opt[opt[semestr]] === "string"
        ? opt[opt[semestr]]
        : opt[opt[semestr]],
  };
}

export function getControlForm(semestr: number, data: IPlan) {
  if (
    semestr === 1 ||
    (semestr >= 3 &&
      semestr <= 8 &&
      data.nameEducationalComponent === "Фахова іноземна мова")
  ) {
    return {
      controlForm: {
        exam: "",
        credit: "З",
      },
    };
  } else {
    return data.exams
      ? {
          controlForm: {
            exam: "Е",
            credit: "",
          },
        }
      : {
          controlForm: {
            exam: "",
            credit: "З",
          },
        };
  }
}
