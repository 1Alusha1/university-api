import workPlanModel from "../../models/workPlan.model";
import IPlan from "../plan/plan.interface";
import {
  getCredits,
  getSemestrRecords,
  getControlForm,
} from "../planAnnex/planAnnex.repository";
import { TGeneratedWorkPlanResult, THalfSemestr, TTuppleDto } from "./types";

export const workPlanRepository = {
  async generateWorkPlan(opt: any) {
    let records = await getSemestrRecords(opt);

    let workPlan: any = [];
    records.forEach(({ semestr, obj }) => {
      obj.forEach((item) => {
        workPlan.push({
          semestr: semestr,
          count: item.count,
          parentId: `${item._id}`,
          nameEducationalComponent: item.nameEducationalComponent,
          ...getCredits(semestr, item, opt),
          totalValue: getCredits(semestr, item, opt).countCredits * 30,
          behindCurriculum: getCredits(semestr, item, opt).countCredits * 30,
          readInPrevious: null,
          forSchoolYear: getCredits(semestr, item, opt).countCredits * 30,
          ...calculatePartSemestr(semestr, item, opt),
        });
      });
    });

    // await workPlanModel.insertMany(workPlan);
    return workPlan;
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
