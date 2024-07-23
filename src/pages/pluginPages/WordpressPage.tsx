import styled from "styled-components";
import Card from "../../components/common/Card";
import { ReactComponent as WordpressIcon } from "../assets/Icons/CMSIcons/Wordpress.svg";
import { ReactComponent as Wix } from "../assets/Icons/CMSIcons/Wix.svg";
import CardTitle from "../../components/common/CardTitle";
import Button from "../../components/common/form/Button";
import WordpressBG from "../../assets/images/CMSIcons/WordpressBG.png";
import WixBG from "../../assets/images/CMSIcons/WixBG.png";
import ShopiftBG from "../../assets/images/CMSIcons/ShopifyBG.png";
import WebflowBG from "../../assets/images/CMSIcons/WebflowBG.png";
import AppConfig from "../../config/appConfig";
import PageTitle from "../../components/common/PageTitle";

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
    width: 150px;
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.3px;
  line-height: 22px;
`;
const ListWrapper = styled.ol`
  list-style: none;
  counter-reset: my-counter;
`;
const ListItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.3px;
  line-height: 22px;
  margin-bottom: 10px;

  & span {
    font-weight: bold;
  }

  &::before {
    counter-increment: my-counter;
    content: counter(my-counter) ". ";
    font-weight: bold; /* Bold the numbers */
    margin-right: -1em;
    margin-left: 5px;
  }
`;

const Wrapper = styled.div`
  a {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.3px;
    color: var(--primary-purple);
  }
`;

const WordpressPage: React.FC = () => {
  const onDownloadWordpressPlugin = () => {
    document.location.href = `${AppConfig.serverUrl}/integration/download/wordpress`;
  };
  return (
    <>
      <Title>Wordpress</Title>
      <Subtitle>סנכרן את המאמרים שלך עם וורדפרס</Subtitle>

      <Wrapper className="grid">
        <div className="col-4 mr-6">
          <CardStyle>
            <img src={WordpressBG} />
            <CardTitle title="WordPress" className="mt-3" />
            <Button
              className="step2"
              onClick={onDownloadWordpressPlugin}
              primary
              arrowPlacement="right"
            >
              הורד תוסף{" "}
            </Button>
          </CardStyle>
        </div>
        <div className="col-6">
          <div className="flex flex-column justify-content-center h-full">
            <CardTitle title="Wordpress Connection setup" />
            <ListWrapper className="ml-3">
              <ListItem>
                הורד את הפלאגין Ghostwrite על ידי לחיצה על הכפתור הימני.
              </ListItem>
              <ListItem>
                <a href="https://blog.hubspot.com/website/how-to-add-wordpress-plugins">
                  העלה והתקן את הפלאגין{" "}
                </a>{" "}
                on your WordPress website.
              </ListItem>
              <ListItem>
                לחץ על <span>"Neword"</span>
                בסרגל השמאלי שלך ב- WordPress dashboard.
              </ListItem>
              <ListItem>
                לחץ על הכפתור <span>"Activate"</span>
              </ListItem>
              <ListItem>לאחר מכן, תופנה אל Neword כדי להקים את חיבור.</ListItem>
            </ListWrapper>
            <Paragraph>
              צריך עזרה?{" "}
              <a href="mailto=admin@ghostwrites.ai">admin@ghostwrites.ai</a>
            </Paragraph>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default WordpressPage;
