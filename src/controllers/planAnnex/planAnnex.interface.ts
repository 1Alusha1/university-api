export default interface IPlanAnnex {
  semestr: Number;
  parentId: String;
  codeTIN: String;
  nameComponent: String;
  countCredits: String;
  totalValue: Number;
  classroom: Number;
  lectures: Number | null;
  practical: Number | null;
  laboratory: Number | null;
  controlForm: Object;
  totalHours: Number;
  readInPrevious: Number | null;
  competencies: String | null;
  programResults: String | null;
}
