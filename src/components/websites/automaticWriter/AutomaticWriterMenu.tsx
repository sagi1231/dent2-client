import { MenuItemProps } from "../../menu/types/MenuItemProps";
import { ReactComponent as DashboardIcon } from "../../../assets/Icons/WebsiteIcons/Dashboard.svg";
import { ReactComponent as ArticlesIcon } from "../../../assets/Icons/WebsiteIcons/Blog.svg";
import { ReactComponent as InsightsIcon } from "../../../assets/Icons/WebsiteIcons/Analytics.svg";
import { ReactComponent as KeywordsIcon } from "../../../assets/Icons/WebsiteIcons/Keyword.svg";
import { ReactComponent as WriterSettingsIcon } from "../../../assets/Icons/WebsiteIcons/Writer.svg";
import ConfigurationIcon from "@mui/icons-material/TuneOutlined";
import ConstructionIcon from "@mui/icons-material/Construction";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import { UserRole } from "../../../core/types/userRole";
import { type } from "os";

const AutomaticWriterMenu: MenuItemProps[] = [
  {
    displayName: "כותב",
    route: "/writer-settings",
  },
  {
    displayName: "תבניות",
    route: "/templates",
  },
  {
    displayName: "פרסום",
    route: "/publish-settings",
  },
  {
    displayName: "תזמון ",
    route: "/scheduler",
  },
];

export default AutomaticWriterMenu;
