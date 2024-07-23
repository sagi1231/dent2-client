import { MenuItemProps } from "../../menu/types/MenuItemProps";
import EditIcon from "@mui/icons-material/Edit";

const ArticlePageMenuItems: MenuItemProps[] = [
  {
    displayName: "Edit",
    route: "/edit",
    icon: <EditIcon />,
  },
];

export default ArticlePageMenuItems;
