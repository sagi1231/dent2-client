import { UserRole } from "../../../types/userRole";

export interface CreateUserRequestData {
  firstname: string;
  lastname: string;
  username: string;

  password: string;

  role: UserRole;

  pNumber: string;

  permission: [string];
}
