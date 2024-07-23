import React, { useMemo } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router";
import Dashboard from "../../components/website/analytics/dashboard";
import { appIntegrationState } from "../../state/appIntegrationState";
import { AppIntegrationApplicationType } from "../../core/types/appIntegrationApplicationType";
import Preloader from "../../components/common/Preloader";
import Link from "../../components/common/Link";
import { Theme } from "../../core/theme/theme";

const ComingSoon: React.FC = () => {
  const { websiteId } = useParams();
  const [appIntegrations, setAppIntegrations] = useRecoilState(
    appIntegrationState(websiteId as string)
  );
  const googleAnalyticsIntegration = useMemo(
    () =>
      appIntegrations.find(
        (i) =>
          i.appIntegrationApplicationType ===
          AppIntegrationApplicationType.GOOGLEANALYTICS
      ),
    [appIntegrations]
  );
  return (
    <>
      {googleAnalyticsIntegration?.isEnabled ? (
        <Dashboard />
      ) : (
        <Link path="/integrations">
          אנא לחץ כאן כדי לאפשר אינטגרציה של Google Analytics{" "}
        </Link>
      )}
    </>
  );
};

export default ComingSoon;
