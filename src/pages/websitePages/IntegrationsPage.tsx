import Card from "../../components/common/Card";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { websiteState } from "../../state/websitesState";
import { PublishIntegration } from "../../core/entities/publishIntegration";
import { SubmitHandler, useForm } from "react-hook-form";
import { publisherService } from "../../core/services/publisher.service";
import Button from "../../components/common/form/Button";
import { throttle } from "lodash";
import GmailLogo from "../../assets/images/integrations/gmail-logo.png";
import AnalyticsLogo from "../../assets/images/integrations/googleAnalytics-logo.png";
import styled from "styled-components";
import { Divider } from "@mui/material";
import { ReactComponent as PlusIcon } from "../../assets/Icons/Plus.svg";
import { ReactComponent as SettingsIcon } from "../../assets/Icons/Settings.svg";
import CardTitle from "../../components/common/CardTitle";
import Link from "../../components/common/Link";
import { cmsIntegrations } from "../../integrations/cms/cmsIntegrations";
import { publishIntegrationState } from "../../state/publishIntegrationState";
import { appIntegrationState } from "../../state/appIntegrationState";
import { AppIntegrationApplicationType } from "../../core/types/appIntegrationApplicationType";
import StyledSwitch from "../../components/common/form/StyledSwitch";
import { AppIntegration } from "../../core/entities/appIntegration";
import appIntegrationService from "../../core/services/appIntegration.service";
import PageTitle from "../../components/common/PageTitle";
import CMSConfigurationModal from "../../components/modals/CMSConfigurationModal";
import Preloader from "../../components/common/Preloader";
import { Tooltip } from "primereact/tooltip";
import { InputSwitch } from "primereact/inputswitch";
import { IntegrationType } from "../../core/types/integrationType";
import useNavigator from "../../hooks/useNavigator";
import useGa4Auth from "../../hooks/analytics/useGa4Auth";

const CardStyle = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  cursor: pointer;

  & img {
    width: 75px;
  }

  &:hover {
    border-color: var(--title-color);
  }

  &.disabled-card {
    pointer-events: none;
    opacity: 0.6;
  }

  &:hover .HoverArrow__linePath {
    opacity: 1;
  }

  &:hover .HoverArrow__tipPath {
    opacity: 1;
    transition: transform 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateX(3px);
  }
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.029rem;
  margin-top: 30px;
  color: var(--title-color);
`;

const SectionSubTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.029rem;
  margin-bottom: 30px;
  color: var(--text-color);
`;

const ConnectedButton = styled(Button)`
  color: var(--success);
`;

const TitleWrapper = styled.div`
  .mr-2 div:first-child {
    margin-top: 10px;
  }
`;

const ConfigurationPage: React.FC = () => {
  const { websiteId } = useParams();
  const [appIntegrations, setAppIntegrations] = useRecoilState(
    appIntegrationState(websiteId as string)
  );
  const { onGoogleAnalyticsLogin } = useGa4Auth(websiteId as string);
  const navigate = useNavigator();

  const publishIntegration = useRecoilValue(
    publishIntegrationState(websiteId as string)
  );

  const onToggleAppIntegration = async (
    value: boolean,
    appIntegrationId: string
  ) => {
    const updatedAppIntegration = appIntegrations.find(
      (a) => a.id === appIntegrationId
    ) as AppIntegration;
    const filteredAppIntegrations = appIntegrations.filter(
      (a) => a.id !== appIntegrationId
    );

    setAppIntegrations([
      ...filteredAppIntegrations,
      {
        ...updatedAppIntegration,
        isEnabled: value,
      },
    ]);

    try {
      await appIntegrationService.updateAppIntegrationByWebsiteId(
        appIntegrationId,
        {
          isEnabled: value,
        }
      );
    } catch (err) {}
  };
  const analyticsToggle = async (value: boolean, appIntegrationId: string) => {
    const updatedAppIntegration = appIntegrations.find(
      (a) => a.id === appIntegrationId
    ) as AppIntegration;
    const filteredAppIntegrations = appIntegrations.filter(
      (a) => a.id !== appIntegrationId
    );

    setAppIntegrations([
      ...filteredAppIntegrations,
      {
        ...updatedAppIntegration,
        isEnabled: value,
      },
    ]);

    try {
      if (value) {
        onGoogleAnalyticsLogin();
      } else {
        await appIntegrationService.updateAppIntegrationByWebsiteId(
          appIntegrationId,
          {
            isEnabled: value,
          }
        );
      }
    } catch (err) {}
  };

  const isCmsConnected = useMemo(
    () => !!publishIntegration,
    [publishIntegration]
  );

  const emailIntegration = useMemo(
    () =>
      appIntegrations.find(
        (i) =>
          i.appIntegrationApplicationType ===
          AppIntegrationApplicationType.EMAIL
      ),
    [appIntegrations]
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
  const [showCMSConfigurationModal, setShowCMSConfigurationModal] =
    useState(false);

  const navigateToCms = useCallback(
    (type: IntegrationType) => {
      switch (type) {
        case IntegrationType.WORDPRESS:
          return navigate(`/plugins/wordpress`);
        case IntegrationType.CUSTOM:
          return navigate(`/cms/custom`);
        case IntegrationType.WIX:
          return (document.location.href = `https://www.wix.com/app-market/ghostwrite-ai?appIndex=0`);
      }
    },
    [navigate, publishIntegration?.type, websiteId]
  );

  const sortedCmsIntegrations = useMemo(() => {
    if (publishIntegration) {
      const filtered = cmsIntegrations.filter(
        (i) => i.type !== publishIntegration.type
      );
      const selected = cmsIntegrations.find(
        (i) => i.type === publishIntegration.type
      );
      return [selected!, ...filtered];
    }
    return cmsIntegrations;
  }, [publishIntegration]);

  return (
    <>
      <TitleWrapper className="flex justify-content-between align-items-center">
        <PageTitle
          title="אינטגרציות CMS "
          subtitle="שלב את ה-CMS המועדף עליך בקלות"
        />
      </TitleWrapper>

      <div className="grid">
        {sortedCmsIntegrations.map((integration) => {
          return (
            <div
              className="col-4"
              onClick={() => navigateToCms(integration.type)}
            >
              <CardStyle>
                <div className="flex align-items-center">
                  {integration.logo}
                  <CardTitle title={integration.name} className="mr-3 mb-0" />
                </div>
                {integration.type === publishIntegration?.type ? (
                  <ConnectedButton disabled>התחבר</ConnectedButton>
                ) : (
                  <>
                    {isCmsConnected && (
                      <Tooltip target={".add-integration-button"} />
                    )}
                    <div
                      className="add-integration-button"
                      data-pr-tooltip="ניתן לחבר רק CMS אחד"
                      data-pr-position="left"
                    >
                      <Button arrowPlacement="right" disabled={isCmsConnected}>
                        התחבר
                      </Button>
                    </div>
                  </>
                )}
              </CardStyle>
            </div>
          );
        })}
        <div
          className="col-4
        "
        ></div>
      </div>

      <Divider className="mt-5" />

      <div className="mr-2 flex justify-content-between align-items-center">
        <div>
          <SectionTitle>חיבור לאפלקציות</SectionTitle>
          <SectionSubTitle>
            הגדל את האסטרטגיה השיווקית שלך וחבר את הכלים שבהם אתה משתמש כל יום
          </SectionSubTitle>
        </div>
        <a
          href="https://ghostwrites.ai/contact-us/"
          target="_blank"
          rel="noreferrer"
        >
          <Button icon={<PlusIcon />}>בקש אינטגרציה</Button>
        </a>
      </div>
      <div className="grid">
        <div className="col-3">
          {emailIntegration && (
            <Card>
              <div className="flex justify-content-between mb-3">
                <div className="flex align-items-center">
                  <img src={GmailLogo} width={50} />
                  <CardTitle title="Email" className="mr-3 mb-0" />
                </div>
                <div>
                  <InputSwitch
                    onChange={(value) =>
                      onToggleAppIntegration(
                        !!value.value,
                        emailIntegration?.id
                      )
                    }
                    checked={!!emailIntegration?.isEnabled}
                  />
                </div>
              </div>
              <small className="">קבל התראות בכל פעם שנוצר מאמר. </small>
              {/* <Divider className="mt-3 mb-3" /> */}
              {/* <Link href="#">Configure</Link> */}
            </Card>
          )}
        </div>
        <div className="col-3">
          {googleAnalyticsIntegration && (
            <Card>
              <div className="flex justify-content-between mb-3">
                <div className="flex align-items-center">
                  <img src={AnalyticsLogo} width={50} />
                  <CardTitle
                    title="Google Analytics (4)"
                    className="mr-3 mb-0"
                  />
                </div>
                <div>
                  <InputSwitch
                    onChange={(value) =>
                      analyticsToggle(
                        !!value.value,
                        googleAnalyticsIntegration?.id
                      )
                    }
                    checked={!!googleAnalyticsIntegration?.isEnabled}
                  />
                </div>
              </div>
              <small className="">קבל מידע עסקי על המאמרים שפורסמו </small>
              {/* <Divider className="mt-3 mb-3" /> */}
              {/* <Link href="#">Configure</Link> */}
            </Card>
          )}
          {showCMSConfigurationModal && (
            <React.Suspense fallback={<Preloader />}>
              <CMSConfigurationModal
                onHide={() => setShowCMSConfigurationModal(false)}
              />
            </React.Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfigurationPage;
