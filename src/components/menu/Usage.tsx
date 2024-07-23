import { useRecoilValue } from "recoil";
import { usageState } from "../../state/usageState";
import { UsageType } from "../../core/types/usageType";
import styled from "styled-components";
import { useMemo } from "react";
import React from "react";
import { userState } from "../../state/userState";
import { CircularProgress } from "@mui/material";
import { Tooltip } from "primereact/tooltip";
import { PackageType } from "../../core/types/packageType";

const ProgressWrapper = styled.div`
  span {
    font-weight: bold;
    font-size: 14px;
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

const Usage: React.FC = () => {
  const user = useRecoilValue(userState);
  const isLifeTimeSubscription = useMemo(
    () => user.company.Subscription.type === PackageType.TRIAL,
    [user.company.Subscription.type]
  );

  const usage = useRecoilValue(
    usageState(isLifeTimeSubscription ? UsageType.LIFETIME : UsageType.MONTHLY)
  );

  const maxArticles = user.company.Subscription.maxArticles;
  const ratio = (usage.articles / maxArticles) * 100;
  const articlesLeft = user.company.Subscription.maxArticles - usage.articles;
  const tooltipText = `נשארו לך ${articlesLeft} מאמרים ${
    isLifeTimeSubscription ? "בניסיון" : "לחודש הזה"
  }`;
  return (
    <>
      <ProgressWrapper className="usage" data-pr-tooltip={tooltipText}>
        <CircularProgress variant="determinate" value={ratio} />
        <div>
          <span>
            {usage.articles}/{maxArticles}
          </span>{" "}
          <small>מאמרים שנוצרו</small>
        </div>
      </ProgressWrapper>
      <Tooltip target=".usage" />
    </>
  );
};

export default Usage;
