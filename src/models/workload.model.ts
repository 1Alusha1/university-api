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
    default: null,
  },
  course: {
    type: Number,
    default: null,
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
    default: null,
  },
  practicalSeminars: {
    type: Number,
    default: null,
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
  type: {
    type: String,
    required: true,
  },
});

export default mongoose.model("WorkLoad", WorkLoad);
