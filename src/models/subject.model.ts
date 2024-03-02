import mongoose, { Schema } from "mongoose";

const Subject = new Schema({
  codeTIN: { type: String, default: null },
  subject: { type: String, required: true },
});

export default mongoose.model("Subject", Subject);
