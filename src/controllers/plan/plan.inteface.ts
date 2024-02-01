import { creditsCourse } from "./types";

export default interface IPlan {
  count?: Number | null;
  codeTIN?: String | null;
  nameEducationalComponent?: String | null;
  exams?: Number | null;
  credits?: Number | null;
  courseWork?: Number | null;
  graduateWork?: Number | null;
  countCreditsECTS?: Number | null;
  totalValue?: Number | null;
  total?: Number | null;
  lectures?: Number | null;
  practical?: Number | null;
  laboratory?: Number | null;
  independentWork?: Number | null;
  creditsFirstCourse?: creditsCourse;
  creditsSecondCourse?: creditsCourse;
  creditsThirdthCourse?: creditsCourse;
  creditsForthCourse?: creditsCourse;
  year?: Number | null;
}
