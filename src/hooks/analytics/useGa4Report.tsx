import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { DashboardDataEntry } from "../../components/website/analytics/types/dashboardData";
import { ArticleAnalyticsValue } from "../../components/website/analytics/types/articleAnalyticsValue";
import { TimeAgo } from "../../components/website/analytics/types/timeAgo";
import { useRecoilValue } from "recoil";
import { reportDataState } from "../../state/reportDataState";
import { Theme } from "../../core/theme/theme";

function useGa4Report() {
  const { websiteId } = useParams();
  const [daysAgo, setDaysAgo] = useState<TimeAgo>(TimeAgo.MONTHAGO);
  const reportData = useRecoilValue(
    reportDataState({ websiteId: websiteId as string, daysAgo: daysAgo })
  );

  const convertToDashboardData = (entries: ArticleAnalyticsValue[]): any[] => {
    const metrics: (keyof ArticleAnalyticsValue["data"])[] = [
      "screenPageViews",
      "userEngagementDuration",
      "eventCount",
    ];
    return metrics.map((metric, index) => ({
      metric,
      label: metric,
      data: {
        labels: entries.map((entry) => entry.label.slice(0, 15) + "..."),
        datasets: [
          {
            label: metric,
            data: entries.map((entry) => ({
              x: entry.label.slice(0, 15) + "...",
              y: entry.data[metric],
              id: entry.articleId,
            })),
            backgroundColor: [
              Theme.colors.purpleOpacity,
              Theme.colors.yellowOpacity,
              Theme.colors.lightBlueOpacity,
            ][index],
            borderColor: [
              Theme.colors.purple,
              Theme.colors.yellow,
              Theme.colors.lightBlue,
            ][index],
            borderWidth: 1,
          },
        ],
      },
    }));
  };

  const dashboard = useMemo(
    () => convertToDashboardData(reportData),
    [reportData]
  );

  return { dashboard, setDaysAgo, daysAgo };
}
export default useGa4Report;
