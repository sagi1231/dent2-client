import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import { MenuItemProps } from "../menu/types/MenuItemProps";

const HomepageMenuItems: MenuItemProps[] = [
  {
    displayName: "Websites",
    route: "/websites",
    icon: <DashboardIcon />,
  },
  {
    displayName: "Article Builder",
    route: "/articleBuilder",
    icon: <DashboardIcon />,
  },
];

export default HomepageMenuItems;
