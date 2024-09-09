export interface MalshabBam {
  id: string;
  malshabId: string;
  malshabBase: {
    id: string;
    pnumber: string;
    idnumber: string;
    firstname: string;
    lastname: string;
    gender: Gender;
  };
  population: string;
  status: STATUS;
  path: string;
  horash: number;
  giusDate?: Date;
  trsDate?: Date;
  iturReference?: ITUR_REFERENCE;
  bamReference?: BAM_REFERENCE;
  officer: string;
  gotPapers?: boolean;
  comment: string;
  bamComment: string;
  isArchived: boolean;
  interviewer: INTERVIEWER;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum STATUS {
  REALI = "REALI",
  RESERVE = "RESERVE",
}

export enum INTERVIEWER {
  DASKAI_1 = "DASKAI_1",
  DASKAI_2 = "DASKAI_2",
  DASKAI_3 = "DASKAI_3",
  DASKAI_4 = "DASKAI_4",
  SATACH_1 = "SATACH_1",
  SATACH_2 = "SATACH_2",
}

export enum BAM_REFERENCE {
  GOT_PAPERS = "GOT_PAPERS",
  GOT_SQUAD_REFERENCE = "GOT_SQUAD_REFERENCE",
  REFRENCE_FORWARDED_SOON = "REFRENCE_FORWARDED_SOON",
  WARNINIG_FOR_LENTHY_PROCEDURE = "WARNINIG_FOR_LENTHY_PROCEDURE",
  APPROVED_FOR_POSITION = "APPROVED_FOR_POSITION",
  SPECIAL_APPROVAL = "SPECIAL_APPROVAL",
  KOSHER = "KOSHER",
  PROCESS_EXPIRED = "PROCESS_EXPIRED",
}

export enum ITUR_REFERENCE {
  SUMMONED_INVESTIGATION = "SUMMONED_INVESTIGATION",
  SUMMONED_SIGN_DOCUMENTS = "SUMMONED_SIGN_DOCUMENTS",
  ARRIVED = "ARRIVED",
  ARRIVED_SIGN_DOCUMENTS = "ARRIVED_SIGN_DOCUMENTS",
  NOT_ARRIVED = "NOT_ARRIVED",
  CANCELED = "CANCELED",
}
