import planModel from "../../models/plan.model";
import planAnnexModel from "../../models/planAnnex.model";
import IPlan from "../plan/plan.interface";
import IPlanAnnex from "./planAnnex.interface";
import { TupdateRecord } from "../workLoad/types";
import { createUpdateObject } from "../../utils/utils";
import { planNameRepository } from "../planName/planName.repository";
import {
  getCourseCredits,
  getSemestrRecords,
  getCoefficient,
  getWeek,
  getControlForm,
} from "../../utils/utils";
export const planAnnexRepository = {
  async generatePlanAnnexTable(opt: any, planName: string) {
    try {
      let result = await getSemestrRecords(opt, planName);

      // new table planAnnex
      let planAnnex: IPlanAnnex[] = [];
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
            planName: `додаток до плану ${elems.planName}`,
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

      if (pn?.planAnnexName == `додаток до плану ${planName}`) {
        return { message: "Додаток до плану вже був згенерований" };
      }
      if (!pn?.planAnnexName) {
        planNameRepository.updatePlanName(planName, {
          name: "planAnnexName",
          value: `додаток до плану ${planName}`,
        });
        await planAnnexModel.insertMany(planAnnex);
      }
      return { message: "Додаток згенерований до плану", data: planAnnex };
    } catch (err) {
      if (err) console.log(err);
    }
  },
  async getPlanAnnexTable() {
    let result = await planAnnexModel.find();
    return result;
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
  async getPlanAnnexByName(planName: string) {
    let plan = await planAnnexModel.find({ planName: planName });
    if (!plan.length) {
      return { message: "Плану з такою назвою немає" };
    }
    return { data: plan, message: "план успішно отримано" };
  },
};
