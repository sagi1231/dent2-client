import { useParams } from "react-router";
import TabsNav from "../core/TabsNav";
import WebsiteMenuItems from "../websites/tabsNavbar/WebsiteMenuItems";

const WebsiteTabsNav: React.FC = () => {
  const { websiteId } = useParams();
  return (
    <>
      <TabsNav prefix={`overview`} items={WebsiteMenuItems} isSubMenu={false} />
    </>
  );
};
export default WebsiteTabsNav;
