import React, { useEffect, useState } from "react";

import styled from "styled-components";

import FadeIn from "../components/common/FadeIn";
import WebsitesList from "../components/websites/WebsitesList";
import CardSkeleton from "../components/common/skeletons/CardSkeleton";
import { useLocation, useSearchParams } from "react-router-dom";
import ConnectCmsModal from "../components/modals/ConnectCmsModal";
import Button from "../components/common/form/Button";
import Announcement from "../components/common/Announcement";
import MinimalTopMenu from "../components/website/createWebsite/MinimalTopMenu";

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
const ContentWrapper = styled.div`
  padding: 30px;
`;

const Homepage: React.FC = () => {
  return (
    <>
      <MinimalTopMenu showWebsitesDropdown />
      <ContentWrapper>
        <div className="flex justify-content-between align-items-center">
          <div>
            {/* <Subtitle>Overview your websites</Subtitle> */}
            <Title>העסקים שלי</Title>
            <Subtitle>העסקים הפעילים שלך</Subtitle>
          </div>
          {/* <Link path="/websites/new">
          <ButtonStyle primary arrowPlacement="right">
            Add new website
          </ButtonStyle>
        </Link> */}
        </div>

        <FadeIn>
          <React.Suspense fallback={<CardSkeleton />}>
            <WebsitesList />
          </React.Suspense>
        </FadeIn>
      </ContentWrapper>
    </>
  );
};

export default Homepage;
