import mongoose, { Schema } from "mongoose";
const Plan = new Schema({
  count: {
    type: Number,
    default: null,
  },
  codeTIN: {
    type: String,
    default: null,
  },
  nameEducationalComponent: {
    type: String,
    default: null,
  },
  exams: {
    type: Number,
    default: null,
  },
  credits: {
    type: Number,
    default: null,
  },
  courseWork: {
    type: Number,
    default: null,
  },
  graduateWork: {
    type: Number,
    default: null,
  },
  countCreditsECTS: {
    type: Number,
    default: null,
  },
  totalValue: {
    type: Number,
    default: null,
  },
  totla: {
    type: Number,
    default: null,
  },
  lectures: {
    type: Number,
    default: null,
  },
  practical: {
    type: Number,
    default: null,
  },
  laboratory: {
    type: Number,
    default: null,
  },
  independentWork: {
    type: Number,
    default: null,
  },
  /**
   * {
   *   weaks: 16 / 20 /8
   *   ects:number | null
   *   thHour: number | null
   * }
   */
  creditsFirstCourse: { type: Object, default: null },
  creditsSecondCourse: { type: Object, default: null },
  creditsThirdthCourse: { type: Object, default: null },
  creditsForthCourse: { type: Object, default: null },
  year: Number,
});

export default mongoose.model("Plan", Plan);
