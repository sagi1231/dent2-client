import { MenuItemProps } from "../../menu/types/MenuItemProps";
import { ReactComponent as DashboardIcon } from "../../../assets/Icons/WebsiteIcons/Dashboard.svg";
import { ReactComponent as ArticlesIcon } from "../../../assets/Icons/WebsiteIcons/Blog.svg";
import { ReactComponent as InsightsIcon } from "../../../assets/Icons/WebsiteIcons/Analytics.svg";
import { ReactComponent as KeywordsIcon } from "../../../assets/Icons/WebsiteIcons/Keyword.svg";
import { ReactComponent as WriterSettingsIcon } from "../../../assets/Icons/WebsiteIcons/Writer.svg";
import { ReactComponent as IntegrationIcon } from "../../../assets/Icons/WebsiteIcons/Integration.svg";
import { ReactComponent as AutomaticIcon } from "../../../assets/Icons/WebsiteIcons/Automatic.svg";
import { ReactComponent as BusinessIcon } from "../../../assets/Icons/WebsiteIcons/BusinessInfo.svg";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import { UserRole } from "../../../core/types/userRole";

const WebsiteMenuItems: MenuItemProps[] = [
  {
    displayName: "סקירה",
    route: "",
    icon: <DashboardIcon />,
  },

  {
    displayName: "ביטחון מידע",
    route: "/bam",
    icon: <InsightsIcon />,
  },

  {
    displayName: "שאלונים",
    route: "/questions",
    icon: <AutomaticIcon />,
  },

  {
    displayName: "מערבל שחקים",
    route: "/tornado",
    icon: <IntegrationIcon />,
  },

  {
    displayName: "היסטוריה",
    route: "/history",
    icon: <HistoryIcon />,
    role: UserRole.SUPER_ADMIN,
  },
  {
    displayName: "פרטי משתמש",
    route: "/user-settings",
    icon: <BusinessIcon />,
  },
];

export default WebsiteMenuItems;
