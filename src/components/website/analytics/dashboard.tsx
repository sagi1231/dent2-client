import React from "react";
import ChartComponent from "./ChartComputed";
import useGa4Report from "../../../hooks/analytics/useGa4Report";
import { TimeAgo } from "./types/timeAgo";
import { Dropdown } from "primereact/dropdown";
import Card from "../../common/Card";
import CardTitle from "../../common/CardTitle";
import PageTitle from "../../common/PageTitle";
import styled from "styled-components";
import IconDataBox from "../overview/IconDataBox";
import { ReactComponent as ArticleIcon } from "../../../assets/Icons/WebsiteIcons/Blog.svg";
import { ReactComponent as ViewsIcon } from "../../../assets/Icons/Views.svg";
import { useRecoilValue } from "recoil";
import { websiteDashboardDataState } from "../../../state/websiteDashboardDataState";
import { useParams } from "react-router";

const TitleWrapper = styled.div`
  .ml-2 div:first-child {
    margin-top: 10px;
  }
`;

const FlexGrow = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Dashboard: React.FC = () => {
  const { dashboard, setDaysAgo, daysAgo } = useGa4Report();
  const { websiteId } = useParams();
  const [pageViews, userEngagementDuration, eventCount] = dashboard;
  const websiteDashboardData = useRecoilValue(
    websiteDashboardDataState(websiteId as string)
  );
  return (
    <>
      <TitleWrapper className="flex justify-content-between align-items-center">
        <PageTitle
          title="Content Performance Dashboard"
          subtitle="Track Your Content's Reach and Engagement with Clear, Easy-to-Understand Metrics"
        />
        <div className="flex justify-content-between mb-3">
          <div>
            <Dropdown
              value={daysAgo}
              onChange={(e) => {
                setDaysAgo(e.target.value);
              }}
              options={[
                { label: "Two months ago", value: TimeAgo.TWOMONTHAGO },
                { label: "One month ago", value: TimeAgo.MONTHAGO },
                { label: "Week ago", value: TimeAgo.WEEKAGO },
                { label: "3 days ago", value: TimeAgo.THREEDAYSAGO },
              ]}
              placeholder="Select Language"
            />
          </div>
        </div>
      </TitleWrapper>

      <div className="grid">
        <div className="col-6">
          <div className="grid ">
            <div className="col-6">
              <IconDataBox
                iconColor={"green"}
                icon={<ViewsIcon />}
                boxTitle={"כמות צפיות"}
                boxNumber={websiteDashboardData.totalViews}
                marginBottom={false}
              />
            </div>
            <div className="col-6">
              <IconDataBox
                iconColor={"purple"}
                icon={<ArticleIcon />}
                boxTitle={"פוסטים שפורסמו"}
                boxNumber={websiteDashboardData.publishedArticlesCount}
                marginBottom={false}
              />
            </div>
            <div className="col-12">
              <Card>
                <CardTitle title="Total Page Views" />
                <ChartComponent data={pageViews.data} />
              </Card>
            </div>

            {/* <div className="col-12">
              <ArticlsUsed />
            </div> */}
          </div>
        </div>
        <div className="col-6">
          <div className="grid">
            <div className="col-12">
              <Card>
                <CardTitle title="Engagment Duration" />
                <ChartComponent data={userEngagementDuration.data} />
              </Card>
            </div>
            <div className="col-12">
              <Card>
                <CardTitle title="Event Count" />
                <ChartComponent data={eventCount.data} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
