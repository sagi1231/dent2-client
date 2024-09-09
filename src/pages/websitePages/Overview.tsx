import React, { useCallback, useEffect, useState } from "react";

import { ReactComponent as PopularIcon } from "../../assets/Icons/overviewFilterIcons/popular_icon.svg";
import { ReactComponent as BlogIcon } from "../../assets/Icons/overviewFilterIcons/blog_icon.svg";
import { ReactComponent as AdsIcon } from "../../assets/Icons/overviewFilterIcons/ads_icon.svg";
import { ReactComponent as WebsiteIcon } from "../../assets/Icons/overviewFilterIcons/website_icon.svg";
import { ReactComponent as MarketingIcon } from "../../assets/Icons/overviewFilterIcons/marketing_icon.svg";
import { ReactComponent as SocialIcon } from "../../assets/Icons/overviewFilterIcons/social_icon.svg";
import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams } from "react-router-dom";

import Card from "../../components/common/Card";
import styled from "styled-components";

import {
  DocumentCategory,
  DocumentEntityType,
  DocumentTypeFactory,
} from "neword-core";
import CardFilterItem from "../../components/website/overview/cardsFilter/CardFilterItem";
import WelcomeBackCard from "../../components/website/overview/WelcomeBackCard";
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

const TypeTitle = styled.div`
  color: var(--Main-TitleColor, #0a2540);
  leading-trim: both;
  text-edge: cap;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1.5rem */
  letter-spacing: -0.045rem;
  margin: 10px 0;
`;
const Overview: React.FC = () => {
  const { websiteId } = useParams();
  const navigate = useNavigator();
  const [selectedCategory, setSelectedCategory] = useState<
    DocumentCategory | "all"
  >();

  const [showConnectCmsModal, setShowConnectCmsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchParams] = useSearchParams();

  const docBoxesFiltered = [{}];

  useEffect(() => {
    const connectCms = searchParams.get("connectCms");
    if (connectCms) {
      setShowConnectCmsModal(true);
    }
  }, [searchParams]);

  return (
    <>
      <>
        <div className="grid">
          <div className="col-12">
            <WelcomeBackCard
              setSearchTerm={(term: string) => {
                setSearchTerm(term);
                if (selectedCategory) {
                  setSelectedCategory(undefined);
                }
              }}
              isCmsConnected={!!true}
            ></WelcomeBackCard>
          </div>

          <div className="col-2">
            <CardFilterItem
              onClick={() => setSelectedCategory("all")}
              title={"הכל"}
              icon={<PopularIcon />}
              selected={selectedCategory === "all"}
            />
          </div>
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
              onClick={() => setSelectedCategory(DocumentCategory.SOCIAL_MEDIA)}
              title={"סושיאל"}
              icon={<SocialIcon />}
              selected={selectedCategory === DocumentCategory.SOCIAL_MEDIA}
            />
          </div>
          <div className="col-4"></div>

          <div className="grid w-full">
            {/* {docBoxesFiltered.map((doc, index) => (
                <>
                  {doc.platformType !==
                    docBoxesFiltered[index - 1]?.platformType && (
                    <div className="col-12">
                      <TypeTitle>
                        {platformTypeText[doc.platformType]}
                      </TypeTitle>
                    </div>
                  )}
                  <div
                    onClick={() => createDoc(doc.type)}
                    key={index}
                    className="col-2"
                  >
                    <ContentCard
                      title={doc.title}
                      description={doc.description}
                      image={doc.image}
                      type={doc.platformType}
                      highlightTitleTerm={searchTerm}
                    />
                  </div>
                </>
              ))} */}
          </div>
        </div>
      </>
    </>
  );
};

export default Overview;
