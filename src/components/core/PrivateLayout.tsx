import TopMenu from "./topMenu";
import { useLocation } from "react-router";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import SlideIn from "../common/SlideIn";
import SideBar from "../menu/SideBar";
import UpgradePackage from "../modals/UpgradePackage";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import Preloader from "../common/Preloader";
import WebsiteTabsNav from "../website/WebsiteTabsNav";
import Announcement from "../common/Announcement";
import Button from "../common/form/Button";
import SubMenuLayout from "../common/SubMenuLayout";

interface Props {
  children: React.ReactElement;
  subMenu?: React.ReactElement;
  hideSideBar?: boolean;
}

const ContentWrapper = styled.div<{ hideSideBar?: boolean }>`
  width: ${({ hideSideBar }) => (hideSideBar ? "100%" : "calc(100% - 13rem)")};
`;

const PageWrapperOverflow = styled.div`
  /* padding-right: 30px;
  padding-left: 30px;
  padding-top: 30px; */
  height: calc(100vh - 75px);
  overflow: scroll;
`;

const SidebarWrapper = styled.div`
  width: 13rem;
  height: 100vh;
`;

const InsideLayout = styled.div<{ paddingRight?: Boolean }>`
  width: 100%;
  padding: 20px;
`;

const AnnouncementText = styled.div`
  color: white;
`;

const SubMenuWrapper = styled.div`
  width: 10rem;
  height: calc(100vh - 115px);
  padding-right: 20px;
  border-right: solid 1px var(--border-color);
  margin-right: 20px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

const Content = styled.div`
  width: calc(100% - 12rem);
  height: calc(100vh - 115px);
  overflow: scroll;
`;

const PrivateLayout: React.FC<Props> = ({ children, subMenu, hideSideBar }) => {
  const [showPackagesModal, setShowPackagesModal] = useState(false);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (
      user?.company &&
      (!user.company.Subscription || !user.company.Subscription.isActive)
    ) {
      setShowPackagesModal(true);
    }
  }, [user?.company, user?.company?.Subscription?.isActive]);

  return (
    <div className="flex">
      {!hideSideBar && (
        <SidebarWrapper>
          <SideBar />
        </SidebarWrapper>
      )}
      <ContentWrapper hideSideBar={hideSideBar}>
        <TopMenu />
        <React.Suspense fallback={<Preloader disableFullPage />}>
          <PageWrapperOverflow>
            <InsideLayout>
              {subMenu ? (
                <Wrapper>
                  <SubMenuWrapper>{subMenu}</SubMenuWrapper>
                  <Content>{children}</Content>
                </Wrapper>
              ) : (
                children
              )}
            </InsideLayout>
          </PageWrapperOverflow>
        </React.Suspense>
      </ContentWrapper>
    </div>
  );
};

export default PrivateLayout;
