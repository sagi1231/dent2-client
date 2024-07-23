import { AvatarConfig } from "react-nice-avatar";
import { GenderType } from "../types/genderType";
import { EntityBase } from "./entityBase";

export interface Audience extends EntityBase {
  name: string;
  gender: GenderType;
  minAge: number;
  maxAge: number;
  painPoints: string[];
  imageProps: AvatarConfig;
  websiteId: string;
  companyId: string;
}
