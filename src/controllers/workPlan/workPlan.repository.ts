import workPlanModel from "../../models/workPlan.model";
import { TupdateRecord } from "../workLoad/types";
import IPlan from "../plan/plan.interface";
import { planNameRepository } from "../planName/planName.repository";

import {
  getCredits,
  getSemestrRecords,
  getControlForm,
} from "../planAnnex/planAnnex.repository";
import { TGeneratedWorkPlanResult, THalfSemestr, TTuppleDto } from "./types";
import { createUpdateObject } from "../../utils/utils";

export const workPlanRepository = {
  async generateWorkPlan(opt: any) {
    let records = await getSemestrRecords(opt);

    let workPlan: any = [];
    let planName: string = "";
    records.forEach(({ semestr, obj }) => {
      obj.forEach((item) => {
        workPlan.push({
          semestr: semestr,
          planName: item.planName,
          count: item.count,
          parentId: `${item._id}`,
          nameEducationalComponent: item.nameEducationalComponent,
          ...getCredits(semestr, item, opt),
          totalValue: getCredits(semestr, item, opt).countCredits * 30,
          behindCurriculum: item.countCredits * 30,
          readInPrevious: null,
          forSchoolYear: getCredits(semestr, item, opt).countCredits * 30,
          ...calculatePartSemestr(semestr, item, opt),
        });
        planName = item.planName as string;
      });
    });
    let pn = await planNameRepository.getPlanName(planName);

    if (pn?.workPlanName == `work plan ${planName}`) {
      return { message: "Робочий навчальний план вже був згенерований" };
    }
    if (!pn?.workPlanName) {
      planNameRepository.updatePlanName(planName, {
        name: "workPlanName",
        value: `work plan ${planName}`,
      });
      await workPlanModel.insertMany(workPlan);
    }
    return { message: "Робочий навчальний план згенерований до плану", data: workPlan };
  },

  async updateWorkPlanRecordById(id: string, field: TupdateRecord[]) {
    let obj = createUpdateObject(field);
    let record: IPlan = (await workPlanModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: { ...obj } },
      { new: true }
    ))!;
    return record;
  },
};

function calculatePartSemestr(semestr: number, data: any, opt: any) {
  let condition = semestr + 1 >= 8 ? 8 : semestr + 1;
  let week: [number, number] = [opt[opt[semestr]], opt[opt[condition]]];
  let coefficient: [number, number] = [
    data[opt[`c${semestr}`]],
    data[opt[`c${semestr + 1}`]],
  ];
  let credits: [number, number] = [data[opt[semestr]], data[opt[condition]]];
  let dto: TTuppleDto = {
    week,
    coefficient,
    credits,
  };
  let result: TGeneratedWorkPlanResult;
  if (data[opt[semestr]] && data[opt[semestr + 1]]) {
    result = {
      firstHalf: setHalfValue("f", dto, data, semestr),
      secondHalf: setHalfValue("s", dto, data, semestr),
    };
  } else if (data[opt[semestr]] && !data[opt[semestr + 1]]) {
    result = {
      firstHalf: setHalfValue("f", dto, data, semestr),
      secondHalf: null,
    };
  } else {
    result = {
      firstHalf: null,
      secondHalf: setHalfValue("s", dto, data, semestr),
    };
  }
  return result;
}

function setHalfValue(
  flag: "f" | "s",
  tuples: TTuppleDto,
  data: IPlan,
  semestr: number
): THalfSemestr {
  let result: THalfSemestr;
  const isNagative = (number: number): number =>
    number < 0 ? number * -1 : number;

  let exceptions: any = {};

  let count = flag === "f" ? 0 : 1;
  if (data.nameEducationalComponent === "Вступ до фаху") {
    exceptions = {
      lectures:
        tuples.coefficient[count] * tuples.week[count] -
        (tuples.coefficient[count] * tuples.week[count]) / 4,
      practical: (tuples.coefficient[count] * tuples.week[count]) / 4,
    };
  } else {
    exceptions = null;
  }

  if (data.nameEducationalComponent === "Фахова іноземна мова") {
    exceptions = {
      lectures: null,
      practical: tuples.coefficient[count] * tuples.week[count],
    };
  } else {
    exceptions = null;
  }

  let condition = exceptions
    ? exceptions
    : {
        lectures: (tuples.coefficient[count] * tuples.week[count]) / 2,
        practical: (tuples.coefficient[count] * tuples.week[count]) / 2,
      };
  result = {
    totalHours: tuples.coefficient[count] * tuples.week[count],
    ...condition,
    laboratory: 0,
    independentWork:
      tuples.credits[count] * 30 -
      tuples.coefficient[count] * tuples.week[count],
    graduateWork: 0,
    ...getControlForm(semestr, data),
  };

  return result;
}
