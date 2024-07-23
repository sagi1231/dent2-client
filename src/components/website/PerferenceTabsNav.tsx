import { useParams } from "react-router";
import TabsNav from "../core/TabsNav";
import PerferenceMenuItems from "../websites/tabsNavbar/PerferenceMenuItems";

const PerferenceTabsNav: React.FC = () => {
  const { websiteId } = useParams();
  return (
    <TabsNav
      prefix={`/websites/${websiteId}/user-preferences`}
      items={PerferenceMenuItems}
      isSubMenu
    />
  );
};
export default PerferenceTabsNav;
