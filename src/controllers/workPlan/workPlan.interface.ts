import { THalfSemestr } from "./types";

export interface IWorkPlan {
  semestr: Number;
  parentId: String;
  count: Number;
  nameEducationalComponent: String;
  countCredits: String;
  totalValue: Number;
  behindCurriculum: Number; // countCredits * 30
  readInPrevious: Number | null;
  forSchoolYear: Number;

  firstHalf: THalfSemestr | null;
  secondHalf: THalfSemestr | null;

  department: String | null;
  status: String;
}
