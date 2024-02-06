import planModel from "../../models/plan.model";
import planAnnexModel from "../../models/planAnnex.model";
import IPlan from "../plan/plan.interface";
import IPlanAnnex from "./planAnnex.interface";

export const planAnnexRepository = {
  async generatePlanAnnexTable(opt: any) {
    try {
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

      // new table planAnnex
      let planAnnex: IPlanAnnex[] = [];
      result.forEach((item) => {
        item.obj.forEach((elems) => {
          planAnnex.push({
            semestr: item.semestr,
            parentId: `${elems._id}`,
            codeTIN: elems.codeTIN,
            nameComponent: elems.nameEducationalComponent,
            ...getCredits(item.semestr, elems, opt),
            totalValue: elems.totalValue,
            classroom: elems.totla,
            lectures: elems.lectures,
            practical: elems.practical,
            laboratory: elems.laboratory,
            ...getControlForm(item.semestr, elems),
            totalHours: elems.totalValue,
            readInPrevious: 0,
            competencies: "",
            programResults: "",
          });
        });
      });

      const annex = await planAnnexModel.find();
      if (annex.length) {
        return { message: "Додаток вже створенний" };
      }
      await planAnnexModel.insertMany(planAnnex);

      return planAnnex;
    } catch (err) {
      if (err) console.log(err);
    }
  },
};

function getCredits(semestr: number, data: any, opt: any) {
  return { countCredits: data[opt[semestr]] };
}

function getControlForm(semestr: number, data: IPlan) {
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
