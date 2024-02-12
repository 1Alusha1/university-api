import mongoose, { Schema } from "mongoose";

const PlanAnnex = new Schema({
  semestr: Number,
  facylty: String,
  specialty:String,
  group: String,
  planName: String,
  codeTIN: String,
  nameEducationalComponent: String,
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
