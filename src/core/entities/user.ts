import { UserRole } from "../types/userRole";
import { Company } from "./company";
import { EntityBase } from "./entityBase";

export interface User extends EntityBase {
  firstname: string;
  lastname: string;
  hashedPassword: string;

  role: UserRole;

  pNumber: string;

  permissions: string;
  isActive: boolean;
}
