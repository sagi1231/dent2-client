import { UserRole } from "../../../core/types/userRole";

export interface MenuItemProps {
  displayName: string;
  route: string;
  icon?: JSX.Element;
  bold?: boolean;
  role?: UserRole;
  isTitle?: boolean;
  parentRoute?: string;
}
