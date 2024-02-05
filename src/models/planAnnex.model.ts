import mongoose, { Schema } from "mongoose";

type controlForm = {
  exam: string;
  credit: string;
};

const PlanAnnex = new Schema({
  semestr: Number,
  parentId: { type: Schema.Types.ObjectId, ref: "Plan" },
  codeTIN: String,
  nameComponent: String,
  countCredits: String,
  totalValue: Number,
  classroom: Number,
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
  controlForm: Object,
  totalHours: Number,
  readInPrevious: {
    type: Number,
    default: null,
  },
  competencies: {
    type: String,
    default: null,
  },
  programResults: {
    type: String,
    default: null,
  },
});

export default mongoose.model("PlanAnnex", PlanAnnex);
