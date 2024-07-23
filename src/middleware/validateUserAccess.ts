import { UserRole } from "../core/types/userRole";

export const validateUserAccess = (
  userRole: UserRole,
  neededRole?: UserRole
) => {
  if (!neededRole) return true;
  const neededRoleIndex = Object.keys(UserRole).indexOf(neededRole);
  const userRoleIndex = Object.keys(UserRole).indexOf(userRole);

  if (userRoleIndex > neededRoleIndex) return false;
  return true;
};
