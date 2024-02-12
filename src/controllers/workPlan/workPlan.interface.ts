import { THalfSemestr } from "./types";

export interface IWorkPlan {
  semestr: Number;
  planName: String;
  specialty: String;
  facylty: String;
  group: String;
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
