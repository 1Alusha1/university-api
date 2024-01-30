import mongoose, { Schema } from "mongoose";
const WorkLoad = new Schema({
  academicDisciplines: {
    type: String,
    required: true,
  },
  disciplinesStatus: {
    type: String,
    default: null,
  },
  faculty: {
    type: String,
    required: true,
  },
  course: {
    type: Number,
    required: true,
  },
  groupCode: {
    type: String,
    required: true,
  },
  studentsCount: {
    type: Number,
    required: true,
  },
  groupsCount: {
    type: Number,
    default: null,
  },
  subgroupsCount: {
    type: Number,
    default: null,
  },
  threadsCount: {
    type: Number,
    default: null,
  },
  totalHours: {
    type: Number,
    default: null,
  },
  lectures: {
    type: Number,
    required: true,
  },
  practicalSeminars: {
    type: Number,
    required: true,
  },
  laboratoryWork: {
    type: Number,
    default: null,
  },
  managementTermPapers: {
    type: Number,
    default: null,
  },
  practiceManagement: {
    type: Number,
    default: null,
  },
  ManagementDPh: {
    type: Number,
    default: null,
  },
  ManagementFMB_VKRFMB: {
    type: Number,
    default: null,
  },
  ManagementBachelorVKBR: {
    type: Number,
    default: null,
  },
  ManagementMasterVKMR: {
    type: Number,
    default: null,
  },
  credits: {
    type: Number,
    default: null,
  },
  exams: {
    type: Number,
    default: null,
  },
  EC: {
    type: Number,
    default: null,
  },
  otherTypes: {
    type: Number,
    default: null,
  },
  Total: {
    type: Number,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("WorkLoad", WorkLoad);
