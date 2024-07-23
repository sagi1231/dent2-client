import { Skeleton } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { websitesStateSelector } from "../../state/websitesState";
import AddWebsite from "./AddWebsite";
import WebsiteCard from "./WebsiteCard";
import { useNavigate } from "react-router";
import Shepherd from "shepherd.js";
import { userState } from "../../state/userState";
import Button from "../common/form/Button";
import GhostImg from "../../assets/images/ghost.png";
import { ReactComponent as PlusIcon } from "../../assets/Icons/Plus.svg";

import styled from "styled-components";

const NotFoundWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  span {
    font-size: 18px;
    color: var(--text-color);
    letter-spacing: -0.5px;
  }
`;

const WebsitesList: React.FC = () => {
  const websitesSelector = useRecoilValue(websitesStateSelector);
  const navigate = useNavigate();

  return (
    <div className="grid p-0">
      {!websitesSelector.length && (
        <NotFoundWrapper>
          <img src={GhostImg} alt="" width={300} />
          <span>
            עדיין לא נוספו אתרים. לחץ על הכפתור למטה כדי להוסיף אתר חדש
          </span>
          <Button
            onClick={() => navigate("/websites/new")}
            icon={<PlusIcon />}
            primary
          >
            הוסף אתר חדש
          </Button>
        </NotFoundWrapper>
      )}
      {websitesSelector?.map((website) => (
        <WebsiteCard
          key={website.id}
          websiteId={website.id}
          websiteDomain={website.domain}
        />
      ))}
    </div>
  );
};

export default WebsitesList;
