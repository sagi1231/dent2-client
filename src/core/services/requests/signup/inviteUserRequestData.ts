import { UserRole } from "../../../types/userRole";

export interface InviteUserRequestData {
  email: string;
  role: UserRole;
}
