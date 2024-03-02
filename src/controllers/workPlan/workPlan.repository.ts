import workPlanModel from "../../models/workPlan.model";
import { TupdateRecord } from "../workLoad/types";
import IPlan from "../plan/plan.interface";
import { planNameRepository } from "../planName/planName.repository";

import {
  getCredits,
  getSemestrRecords,
  getControlForm,
} from "../../utils/utils";
import { TGeneratedWorkPlanResult, THalfSemestr, TTuppleDto } from "./types";
import { createUpdateObject } from "../../utils/utils";

export const workPlanRepository = {
  async generateWorkPlan(opt: any, planName: string) {
    let records = await getSemestrRecords(opt, planName);

    let workPlan: any = [];
    records.forEach(({ semestr, obj }) => {
      obj.forEach((item) => {
        workPlan.push({
          semestr: semestr,
          planName: `робочий план ${item.planName}`,
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
      });
    });
    let pn = await planNameRepository.getPlanName(planName);

    if (pn?.workPlanName == `робочий план ${planName}`) {
      return { message: "Робочий навчальний план вже був згенерований" };
    }
    if (!pn?.workPlanName) {
      planNameRepository.updatePlanName(planName, {
        name: "workPlanName",
        value: `робочий план ${planName}`,
      });
      await workPlanModel.insertMany(workPlan);
    }
    return {
      message: "Робочий навчальний план згенерованно",
      data: workPlan,
    };
  },
  async getWorkPlan() {
    let result = await workPlanModel.find();
    return result;
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
  async getWorkPlanByName(planName: string) {
    let plan = await workPlanModel.find({ planName: planName });
    if (!plan.length) {
      return { message: "Плану з такою назвою немає" };
    }
    return { data: plan, message: "план успішно отримано" };
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
  let result: any = {};

  if (data[opt[`s${semestr}`][0]] && data[opt[`s${semestr}`][0]]) {
    result = {
      firstHalf: setHalfValue("f", dto, data, semestr),
      secondHalf: setHalfValue("s", dto, data, semestr),
    };
  }
  if (data[opt[`s${semestr}`][0]] && !data[opt[`s${semestr}`][1]]) {
    result = {
      firstHalf: setHalfValue("f", dto, data, semestr),
      secondHalf: null,
    };
  }
  if (!data[opt[`s${semestr}`][0]] && data[opt[`s${semestr}`][1]]) {
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
        tuples.coefficient[0] * tuples.week[0] -
        (tuples.coefficient[0] * tuples.week[0]) / 4,
      practical: (tuples.coefficient[0] * tuples.week[0]) / 4,
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
        lectures: (tuples.coefficient[0] * tuples.week[0]) / 2,
        practical: (tuples.coefficient[0] * tuples.week[0]) / 2,
      };
  result = {
    totalHours: tuples.coefficient[0] * tuples.week[0],
    ...condition,
    laboratory: 0,
    independentWork:
      tuples.credits[0] * 30 - tuples.coefficient[0] * tuples.week[0],
    graduateWork: 0,
    ...getControlForm(semestr, data),
  };

  return result;
}
