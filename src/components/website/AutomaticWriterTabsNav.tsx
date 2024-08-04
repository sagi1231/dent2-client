import { useParams } from "react-router";
import TabsNav from "../core/TabsNav";
import AutomaticWriterMenu from "../websites/automaticWriter/AutomaticWriterMenu";

const AutomaticWriterTabsNav: React.FC = () => {
  const { websiteId } = useParams();
  return (
    <TabsNav prefix={`/overview/bam`} items={AutomaticWriterMenu} isSubMenu />
  );
};
export default AutomaticWriterTabsNav;
