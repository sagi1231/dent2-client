import styled from "styled-components";
import Card from "../components/common/Card";
import { ReactComponent as WordpressIcon } from "../assets/Icons/CMSIcons/Wordpress.svg";
import { ReactComponent as Wix } from "../assets/Icons/CMSIcons/Wix.svg";
import CardTitle from "../components/common/CardTitle";
import Button from "../components/common/form/Button";
import WordpressBG from "../assets/images/CMSIcons/WordpressBG.png";
import WixBG from "../assets/images/CMSIcons/WixBG.png";
import ShopiftBG from "../assets/images/CMSIcons/ShopifyBG.png";
import WebflowBG from "../assets/images/CMSIcons/WebflowBG.png";
import AppConfig from "../config/appConfig";
import { useEffect } from "react";
import Shepherd from "shepherd.js";
import Link from "../components/common/Link";
import { useParams } from "react-router";

const Title = styled.h1`
  font-size: 48px;

  color: #0a2540;
  font-weight: 700;
  line-height: 100%; /* 3rem */
  letter-spacing: -0.1rem;
`;

const Subtitle = styled.h2`
  color: #9aa8b6;
  margin-top: 10px;
  margin-bottom: 60px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const CardStyle = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  & img {
    width: 75px;
  }
`;

const PluginDownloads: React.FC = () => {
  const onDownloadWordpressPlugin = () => {
    document.location.href = `${AppConfig.serverUrl}/integration/download/wordpress`;
  };

  const { websiteId } = useParams();

  return (
    <>
      <Title>פלאגינים</Title>
      <Subtitle>הורד את הפלאגין הרלוונטי ל-CMS שלך</Subtitle>

      <div className="grid">
        <div className="col-4">
          <CardStyle>
            <img src={WordpressBG} />
            <CardTitle title="WordPress" className="mt-3" />
            <Link path={`/plugins/wordpress`}>
              <Button className="step2" primary arrowPlacement="right">
                חבר את Wordpress
              </Button>
            </Link>
          </CardStyle>
        </div>
        <div className="col-4">
          <CardStyle>
            <img src={WixBG} />
            <CardTitle title="Wix" className="mt-3" />
            <Link
              global
              differentTab
              path={`https://www.wix.com/app-market/ghostwrite-ai?appIndex=0`}
            >
              <Button primary arrowPlacement="right">
                חבר את Wix
              </Button>
            </Link>
          </CardStyle>
        </div>
        <div className="col-4">
          <CardStyle>
            <img src={WebflowBG} />
            <CardTitle title="Webflow" className="mt-3" />
            <Button disabled arrowPlacement="right">
              בקרוב{" "}
            </Button>
          </CardStyle>
        </div>
        <div className="col-4">
          <CardStyle>
            <img src={ShopiftBG} />
            <CardTitle title="Shopify" className="mt-3" />
            <Button disabled arrowPlacement="right">
              Comming Soon
            </Button>
          </CardStyle>
        </div>
      </div>
    </>
  );
};

export default PluginDownloads;
