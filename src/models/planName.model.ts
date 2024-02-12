import mongoose, { Schema } from "mongoose";

const PlanName = new Schema({
  planName: {
    type: String,
    default: null,
  },
  workPlanName: {
    type: String,
    default: null,
  },
  planAnnexName: {
    type: String,
    default: null,
  },
});

export default mongoose.model("PlanName", PlanName);
