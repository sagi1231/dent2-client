import { UserRole } from "../types/userRole";
import { Company } from "./company";
import { EntityBase } from "./entityBase";

export interface User extends EntityBase {
  id: string;
  createdAt: Date;
  firstname: string;
  lastname: string;
  role: UserRole;
  pNumber: string;
  permission: string[];
  isActive: boolean;
}
