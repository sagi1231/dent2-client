import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/Logo/ColoredLogo.svg";
import Link from "../common/Link";
import { Divider } from "primereact/divider";
import Button from "../common/form/Button";
import React, { useMemo, useState } from "react";
import { ReactComponent as PlusIcon } from "../../assets/Icons/Plus.svg";
import Usage from "./Usage";
import { ReactComponent as AddArticle } from "../../assets/Icons/AddArticle.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import { PackageType } from "../../core/types/packageType";
import WebsiteTabsNav from "../website/WebsiteTabsNav";
import { useParams } from "react-router";
import Preloader from "../common/Preloader";
import GenerateArticleModal from "../modals/generateArtical/GenerateArticleModal";
import useNavigator from "../../hooks/useNavigator";
import { activeRunsState } from "../../state/activeRunsState";

const Wrapper = styled.div`
  background: white;
  height: 100%;
  flex-direction: column;
  border-left: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
`;

const RocketImage = styled.img`
  width: 35%;
  bottom: 30px;
  left: 20px;
  position: absolute;
  transition-duration: 0.2s;
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 75px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  margin-top: 20px;
  align-items: flex-start;
  padding: 0 20px;
`;

const SideTitle = styled.div`
  color: var(--main-title-color, #0a2540);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 0.875rem */
  letter-spacing: -0.02625rem;
`;

const PlusIconStyle = styled(PlusIcon)`
  width: 12px;
  height: 12px;
  margin-right: 15px;
`;

const ProgressWrapper = styled.div`
  span {
    font-weight: bold;
    font-size: 12px;
  }
  display: flex;
  align-items: center;
  gap: 10px;
  .MuiCircularProgress-root {
    width: 15px !important;
    height: 15px !important;
  }

  circle {
    color: var(--primary-purple);
  }
`;

const PackageWrapper = styled.div`
  padding: 30px;
`;

const SideBar: React.FC = () => {
  const [showGenerateArticleModal, setShowGenerateArticleModal] =
    useState(false);
  const [activeRuns, setActiveRuns] = useRecoilState(activeRunsState);
  const navigate = useNavigator();

  return (
    <Wrapper>
      <div>
        <LogoWrapper>
          <Link path="/" className="flex align-items-center" global>
            <Logo width={130} />
          </Link>
        </LogoWrapper>
        <MenuWrapper>
          <Button
            icon={<AddArticle />}
            primary
            className="w-full"
            // bgColor="purple"
            onClick={() => setShowGenerateArticleModal(true)}
          >
            צור מאמר{" "}
          </Button>
          <Divider className="mt-0 mb-0" />

          <WebsiteTabsNav />
        </MenuWrapper>
      </div>
      <PackageWrapper>
        <React.Suspense>
          <Usage />
        </React.Suspense>
      </PackageWrapper>

      {showGenerateArticleModal && (
        <React.Suspense fallback={<Preloader />}>
          <GenerateArticleModal
            onHide={() => setShowGenerateArticleModal(false)}
            onSubmit={(workerRunId: string) => {
              setActiveRuns([...activeRuns, workerRunId]);
              setShowGenerateArticleModal(false);
              navigate(`/articles`);
            }}
          />
        </React.Suspense>
      )}
    </Wrapper>
  );
};

export default SideBar;
