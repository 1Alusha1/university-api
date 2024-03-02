import mongoose, { Schema } from "mongoose";
const Plan = new Schema({
  type: String,
  subType: {
    type: String,
    default: null,
  },
  planName: String,
  specialty: { type: String, default: null },
  faculty: { type: String, default: null },
  studyType: { type: String, default: null },
  studyForm: { type: String, default: null },
  group: String,
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
    type: String,
    default: null,
  },
  credits: {
    type: String,
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
  countCredits: {
    type: Number,
    default: null,
  },
  totalValue: {
    type: Number,
    default: null,
  },
  total: {
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
  ff1: {
    type: String,
    default: null,
  },
  ff1__1: {
    type: String,
    default: null,
  },
  ff2: {
    type: String,
    default: null,
  },
  ff2__1: {
    type: String,
    default: null,
  },
  ss1: {
    type: String,
    default: null,
  },
  ss1__1: {
    type: String,
    default: null,
  },
  ss2: {
    type: String,
    default: null,
  },
  ss2__1: {
    type: String,
    default: null,
  },
  tt1: {
    type: String,
    default: null,
  },
  tt1__1: {
    type: String,
    default: null,
  },
  tt2: {
    type: String,
    default: null,
  },
  tt2__1: {
    type: String,
    default: null,
  },
  th1: {
    type: String,
    default: null,
  },
  th1__1: {
    type: String,
    default: null,
  },
  th2: {
    type: String,
    default: null,
  },
  th2__1: {
    type: String,
    default: null,
  },
  year: String,
  week: String,
});

export default mongoose.model("Plan", Plan);
