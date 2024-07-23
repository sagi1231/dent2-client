import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { publishIntegrationState } from "../../state/publishIntegrationState";
import { useParams } from "react-router";
import PublishSettings from "../../components/publish/PublishSettings";
import Link from "../../components/common/Link";

const PublishSettingsPage: React.FC = () => {
  const { websiteId } = useParams();
  const publishIntegration = useRecoilValue(
    publishIntegrationState(websiteId as string)
  );

  const isCmsConnected = useMemo(
    () => !!publishIntegration,
    [publishIntegration]
  );
  return (
    <>
      {isCmsConnected ? (
        <PublishSettings />
      ) : (
        <Link path={`/integrations`}>
          לחץ כאן לחיבור מערכת ניהול תוכן (CMS)
        </Link>
      )}
    </>
  );
};

export default PublishSettingsPage;
