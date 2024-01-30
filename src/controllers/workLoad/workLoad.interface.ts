export default interface IWorkLoad {
  academicDisciplines: string;
  disciplinesStatus?: string | null;
  faculty: string;
  course: number;
  groupCode: string;
  studentsCount: number;
  groupsCount?: number | null;
  subgroupsCount?: number | null;
  threadsCount?: number | null;
  totalHours?: number | null;
  lectures: number;
  practicalSeminars: number;
  laboratoryWork?: number | null;
  managementTermPapers?: number | null;
  practiceManagement?: number | null;
  ManagementDPH?: number | null;
  ManagementFMB_VKRFMB?: number | null;
  ManagementBachelorVKBR?: number | null;
  ManagementMasterVKMR?: number | null;
  credits?: number | null;
  exams?: number | null;
  EC?: number | null;
  otherTypes?: number | null;
  Total: number;
  teacher: string;
  year: number;
  semester: number;
}
