export type THalfSemestr = {
  totalHours: Number;
  lectures: Number | null;
  practical: Number | null;
  laboratory: Number | null;
  independentWork: Number | null;
  graduateWork: Number | null;
  controlForm: Object;
};

export type TTuppleDto = {
  week: [number, number];
  coefficient: [number, number];
  credits: [number, number];
};
export type TGeneratedWorkPlanResult = {
  firstHalf: THalfSemestr | null;
  secondHalf: THalfSemestr | null;
};
