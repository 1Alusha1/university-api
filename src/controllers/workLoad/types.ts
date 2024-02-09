import IWorkLoad from "./workLoad.interface";

export type TupdateRecord = {
  name: string;
  value: string | number | null;
};

export type TrequestUpdateDTO = {
  id: string;
  field: TupdateRecord[];
};

export type TresponseArray = {
  message: string;
  data?: IWorkLoad[];
};
export type TresponseOneRecord = {
  message: string;
  data?: IWorkLoad;
};
