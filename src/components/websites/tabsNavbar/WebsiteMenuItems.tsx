import { MenuItemProps } from "../../menu/types/MenuItemProps";
import { ReactComponent as DashboardIcon } from "../../../assets/Icons/WebsiteIcons/Dashboard.svg";
import { ReactComponent as ArticlesIcon } from "../../../assets/Icons/WebsiteIcons/Blog.svg";
import { ReactComponent as InsightsIcon } from "../../../assets/Icons/WebsiteIcons/Analytics.svg";
import { ReactComponent as KeywordsIcon } from "../../../assets/Icons/WebsiteIcons/Keyword.svg";
import { ReactComponent as WriterSettingsIcon } from "../../../assets/Icons/WebsiteIcons/Writer.svg";
import { ReactComponent as IntegrationIcon } from "../../../assets/Icons/WebsiteIcons/Integration.svg";
import { ReactComponent as ScheduleIcon } from "../../../assets/Icons/WebsiteIcons/Schedule.svg";
import { ReactComponent as TemplatesIcon } from "../../../assets/Icons/WebsiteIcons/Templates.svg";
import { ReactComponent as AutomaticIcon } from "../../../assets/Icons/WebsiteIcons/Automatic.svg";
import { ReactComponent as BusinessIcon } from "../../../assets/Icons/WebsiteIcons/BusinessInfo.svg";
import { ReactComponent as AddIcon } from "../../../assets/Icons/PlusBorder.svg";
import ConstructionIcon from "@mui/icons-material/Construction";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import { UserRole } from "../../../core/types/userRole";
import Templates from "../../../pages/websitePages/Templates";

const WebsiteMenuItems: MenuItemProps[] = [
  {
    displayName: "סקירה",
    route: "",
    icon: <DashboardIcon />,
  },

  {
    displayName: "פוסטים",
    route: "/articles",
    icon: <ArticlesIcon />,
  },

  {
    displayName: "ניתוח מידע",
    route: "/analytics",
    icon: <InsightsIcon />,
  },

  {
    displayName: "מילות מפתח",
    route: "/keywords",
    icon: <KeywordsIcon />,
  },

  {
    displayName: "פרטי העסק",
    route: "/business-info",
    icon: <BusinessIcon />,
  },

  {
    displayName: "כתיבה אוטומטית",
    route: "/autowriter/writer-settings",
    icon: <AutomaticIcon />,
    parentRoute: "/autowriter",
  },

  {
    displayName: "אינטגרציות",
    route: "/integrations",
    icon: <IntegrationIcon />,
  },

  {
    displayName: "היסטוריה",
    route: "/history",
    icon: <HistoryIcon />,
    role: UserRole.SUPER_ADMIN,
  },
];

export default WebsiteMenuItems;
