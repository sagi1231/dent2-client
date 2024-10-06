import { IntegrationType } from "../../core/types/integrationType";
import { CmsIntegrationType } from "./types/cmsIntegrationType";
import CustomBG from "../../assets/images/CMSIcons/CustomBG.png";
import WordpressBG from "../../assets/images/CMSIcons/WordpressBG.png";
import WixBg from "../../assets/images/CMSIcons/WixBG.png";

export const cmsIntegrations: CmsIntegrationType[] = [
  {
    name: "Wordpress",
    type: IntegrationType.WORDPRESS,
    logo: <img src={WordpressBG} />,
  },
  {
    name: "Wix",
    type: IntegrationType.WIX,
    logo: <img src={WixBg} />,
    buttonText: "Comming Soon",
  },

  {
    name: "Custom",
    type: IntegrationType.CUSTOM,
    logo: <img src={CustomBG} />,
    buttonText: "Configure",
  },
];
