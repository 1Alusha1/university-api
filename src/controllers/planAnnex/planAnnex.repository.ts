import planModel from "../../models/plan.model";
import planAnnexModel from "../../models/planAnnex.model";
import IPlan from "../plan/plan.interface";
import IPlanAnnex from "./planAnnex.interface";
import {  TupdateRecord } from "../workLoad/types";
import { createUpdateObject } from "../../utils/utils";
import { planNameRepository } from "../planName/planName.repository";

export const planAnnexRepository = {
  async generatePlanAnnexTable(opt: any) {
    try {
      let result = await getSemestrRecords(opt);

      // new table planAnnex
      let planAnnex: IPlanAnnex[] = [];
      let planName: string = "";
      result.forEach((item) => {
        item.obj.forEach((elems) => {
          let exceptions: any = {};
          let coefficient = getCoefficient(
            item.semestr,
            elems,
            opt
          ).coefficient;
          let week = getWeek(item.semestr, elems, opt).week;
          if (elems.nameEducationalComponent === "Вступ до фаху") {
            exceptions = {
              lectures: coefficient * week - (coefficient * week) / 4,
              practical: (coefficient * week) / 4,
            };
          } else {
            exceptions = null;
          }
          if (elems.nameEducationalComponent === "Фахова іноземна мова") {
            exceptions = {
              lectures: null,
              practical: coefficient * week,
            };
          } else {
            exceptions = null;
          }
          let condition = exceptions
            ? exceptions
            : {
                lectures: (coefficient * week) / 2,
                practical: (coefficient * week) / 2,
              };
          planAnnex.push({
            semestr: item.semestr,
            parentId: `${elems._id}`,
            codeTIN: elems.codeTIN,
            nameEducationalComponent: elems.nameEducationalComponent,
            planName: elems.planName,
            ...getCourseCredits(item.semestr, elems, opt),
            totalValue:
              getCourseCredits(item.semestr, elems, opt).countCredits * 30,
            classroom:
              getWeek(item.semestr, elems, opt).week *
              getCoefficient(item.semestr, elems, opt).coefficient,
            ...condition,
            laboratory: elems.laboratory,
            ...getControlForm(item.semestr, elems),
            totalHours: elems.totalValue,
            readInPrevious: 0,
            competencies: "",
            programResults: "",
            faculty: `${elems.faculty}`,
            group: `${elems.group}`,
          });
          planName = elems.planName as string;
        });
      });

      let pn = await planNameRepository.getPlanName(planName);

      if (pn?.planAnnexName == `annex ${planName}`) {
        return { message: "Додаток до плану вже був згенерований" };
      }
      if (!pn?.planAnnexName) {
        planNameRepository.updatePlanName(planName, {
          name: "planAnnexName",
          value: `annex ${planName}`,
        });
        await planAnnexModel.insertMany(planAnnex);
      }
      return { message: "Додаток згенерований до плану", data: planAnnex };
    } catch (err) {
      if (err) console.log(err);
    }
  },
  async updatePlanAnnexRecordById(id: string, field: TupdateRecord[]) {
    let obj = createUpdateObject(field);

    let record: IPlan = (await planAnnexModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: { ...obj } },
      { new: true }
    ))!;
    return record;
  },
};

export async function getSemestrRecords(opt: any) {
  let result = [];
  let first = "";
  let condition: any = {};

  for (let i = 1; i <= 8; i++) {
    first = opt[i];
    condition[first] = { $ne: "" };
    let obj = await planModel.find({
      ...condition,
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
    credits = data[opt[semestr]] + data[opt[condition]];
  } else {
    credits = data[opt[semestr]];
  }

  return { countCredits: credits };
}

export function getCourseCredits(semestr: number, data: any, opt: any) {
  return { countCredits: data[opt[semestr]] };
}

export function getCoefficient(semestr: number, data: any, opt: any) {
  if (data[opt[`c${semestr}`]] === "") {
    data[opt[`c${semestr}`]] = 1;
  }
  if (data[opt[`c${semestr}`]] === "**") {
    data[opt[`c${semestr}`]] = 1;
  }

  return { coefficient: Number(data[opt[`c${semestr}`]]) };
}

export function getWeek(semestr: number, data: any, opt: any) {
  return { week: opt[opt[semestr]] };
}

export function setLectureAndPractical() {}

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
