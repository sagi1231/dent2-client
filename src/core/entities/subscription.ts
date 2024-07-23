import { PackageType } from "../types/packageType";
import { EntityBase } from "./entityBase";

export interface Subscription extends EntityBase {
  isActive: Boolean;
  companyId: string;
  type: PackageType;
  maxArticles: number;
}
