import { UserRole } from "../types/userRole";
import { Company } from "./company";
import { EntityBase } from "./entityBase";

export interface User extends EntityBase {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone: string;
  companyId: string;
  isActive: boolean;
  company: Company;
}
