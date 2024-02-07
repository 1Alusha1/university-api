import mongoose, { Schema } from "mongoose";

const WorkPlan = new Schema({
  semestr: Number,
  count: Number,
  parentId: { type: Schema.Types.ObjectId, ref: "Plan" },
  nameEducationalComponent: String,
  countCredits: String,
  totalValue: Number,
  behindCurriculum: Number, // countCredits * 30
  forSchoolYear: Number,

  firstHalf: Object,
    /**classroom: Number,

    totalHours: Number,
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
    graduateWork: {
        type: Number,
        default: null,
    },
    readInPrevious: {
        type: Number,
        default: null,
    },
    controlForm: Object, */
  secondHalf: Object,

  department: {
    type: String,
    default: null,
  },
  status: String,
});

export default mongoose.model("WorkPlan", WorkPlan);
