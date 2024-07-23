import React, { useCallback, useEffect, useState } from "react";
import WelcomeBackCard from "../../components/website/overview/WelcomeBackCard";
import IconDataBox from "../../components/website/overview/IconDataBox";
import { ReactComponent as PopularIcon } from "../../assets/Icons/overviewFilterIcons/popular_icon.svg";
import { ReactComponent as BlogIcon } from "../../assets/Icons/overviewFilterIcons/blog_icon.svg";
import { ReactComponent as AdsIcon } from "../../assets/Icons/overviewFilterIcons/ads_icon.svg";
import { ReactComponent as WebsiteIcon } from "../../assets/Icons/overviewFilterIcons/website_icon.svg";
import { ReactComponent as MarketingIcon } from "../../assets/Icons/overviewFilterIcons/marketing_icon.svg";
import { ReactComponent as SocialIcon } from "../../assets/Icons/overviewFilterIcons/social_icon.svg";
import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { websiteState } from "../../state/websitesState";
import KeywordsTable from "../../components/website/overview/KeywordsTable";
import LastGeneratedArticles from "../../components/website/overview/LastGeneratedArticles";
import { websiteDashboardDataState } from "../../state/websiteDashboardDataState";
import WebsiteTabsNav from "../../components/website/WebsiteTabsNav";
import ConnectCmsModal from "../../components/modals/ConnectCmsModal";
import { useSearchParams } from "react-router-dom";
import { publishIntegrationState } from "../../state/publishIntegrationState";
import Card from "../../components/common/Card";
import styled from "styled-components";
import { featuresState } from "../../state/featuresState";
import CardFilterItem from "../../components/website/overview/cardsFilter/CardFilterItem";
import ContentCard from "../../components/website/overview/contentCards/ContentCard";
import InstagramCaptionImg from "../../assets/images/contentCardsImages/instagram_caption_card_img.png";
import { ContentCardType } from "../../components/website/overview/contentCards/cardTypes";
import {
  DocumentCategory,
  DocumentEntityType,
  DocumentTypeFactory,
} from "neword-core";
import DocBoxes from "../../components/document/components/DocBoxes";
import documentService from "../../core/services/document.service";
import useNavigator from "../../hooks/useNavigator";

const CardStyle = styled(Card)`
  cursor: pointer;

  background: white;
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--primary-purple);
  font-weight: bold;
  box-shadow: -10px 10px 20px -5px rgba(0, 0, 0, 0.1);

  svg {
    fill: var(--primary-purple);
    width: 25px;
    height: 25px;
  }
`;

const Title = styled.div`
  color: var(--Main-TitleColor, #0a2540);
  leading-trim: both;
  text-edge: cap;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1.5rem */
  letter-spacing: -0.045rem;
  margin: 10px 0;
`;

const SingleWebsite: React.FC = () => {
  const { websiteId } = useParams();
  const navigate = useNavigator();
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>();
  const website = useRecoilValue(websiteState(websiteId as string));
  const publishIntegration = useRecoilValue(
    publishIntegrationState(websiteId as string)
  );
  const [showConnectCmsModal, setShowConnectCmsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const connectCms = searchParams.get("connectCms");
    if (connectCms) {
      setShowConnectCmsModal(true);
    }
  }, [searchParams]);

  const createDoc = useCallback(
    async (type: DocumentEntityType) => {
      const docId = await documentService.createDocument(
        type,
        websiteId as string
      );
      navigate(`/document/${docId}`);
    },
    [websiteId]
  );

  return (
    <>
      {website && (
        <>
          <div className="grid">
            <div className="col-12">
              <WelcomeBackCard
                setSearchTerm={(term) => {
                  setSearchTerm(term);
                  if (selectedCategory) {
                    setSelectedCategory(undefined);
                  }
                }}
                isCmsConnected={!!publishIntegration}
              ></WelcomeBackCard>
            </div>

            {/* <div className="col-2">
              <CardFilterItem onClick={()=> setSelectedCategory(DocumentCategory.BLOG)} title={"מומלץ בשבילך"} icon={<PopularIcon />} />
            </div> */}
            <div className="col-2">
              <CardFilterItem
                onClick={() => setSelectedCategory(DocumentCategory.BLOG)}
                title={"בלוג"}
                icon={<BlogIcon />}
                selected={selectedCategory === DocumentCategory.BLOG}
              />
            </div>
            <div className="col-2">
              <CardFilterItem
                onClick={() => setSelectedCategory(DocumentCategory.PAID)}
                title={"פרסום ממומן"}
                icon={<AdsIcon />}
                selected={selectedCategory === DocumentCategory.PAID}
              />
            </div>
            <div className="col-2">
              <CardFilterItem
                onClick={() => setSelectedCategory(DocumentCategory.WEB)}
                title={"אתרים"}
                icon={<WebsiteIcon />}
                selected={selectedCategory === DocumentCategory.WEB}
              />
            </div>
            <div className="col-2">
              <CardFilterItem
                onClick={() => setSelectedCategory(DocumentCategory.MAILING)}
                title={"דיוור"}
                icon={<MarketingIcon />}
                selected={selectedCategory === DocumentCategory.MAILING}
              />
            </div>
            <div className="col-2">
              <CardFilterItem
                onClick={() =>
                  setSelectedCategory(DocumentCategory.SOCIAL_MEDIA)
                }
                title={"סושיאל"}
                icon={<SocialIcon />}
                selected={selectedCategory === DocumentCategory.SOCIAL_MEDIA}
              />
            </div>
            <div className="col-4"></div>

            <div className="col-12">
              <Title>במיוחד בשבילך</Title>
            </div>
            <div className="grid w-full">
              {DocBoxes.filter((doc) => {
                if (searchTerm) {
                  return doc.title.includes(searchTerm);
                }

                if (selectedCategory) {
                  return (
                    DocumentTypeFactory[doc.type].category === selectedCategory
                  );
                }
                return true;
              }).map((doc, index) => (
                <div
                  onClick={() => createDoc(doc.type)}
                  key={index}
                  className="col-3"
                >
                  <ContentCard
                    title={doc.title}
                    description={doc.description}
                    image={doc.image}
                    type={ContentCardType.INSTAGRAM}
                    highlightTitleTerm={searchTerm}
                  />
                </div>
              ))}
            </div>

            <div className="col-12">
              <KeywordsTable />
            </div>

            <div className="col-12">
              <LastGeneratedArticles />
            </div>
          </div>
        </>
      )}
      {showConnectCmsModal && (
        <ConnectCmsModal onClose={() => setShowConnectCmsModal(false)} />
      )}
    </>
  );
};

export default SingleWebsite;
