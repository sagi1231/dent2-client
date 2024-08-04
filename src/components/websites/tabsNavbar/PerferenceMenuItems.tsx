import { MenuItemProps } from "../../menu/types/MenuItemProps";

import { UserRole } from "../../../core/types/userRole";
import { type } from "os";

const PreferenceMenuItems: MenuItemProps[] = [
  {
    displayName: "משתמש",
    isTitle: true,
    route: "",
  },
  {
    displayName: "הגדרות משתמש",
    route: "/user-settings",
  },

  {
    displayName: "משתמשים",
    route: "/admin/users",
    role: UserRole.SUPER_ADMIN,
  },
];

export default PreferenceMenuItems;
