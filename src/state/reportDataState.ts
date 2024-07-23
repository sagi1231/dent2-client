import { atomFamily } from "recoil";
import { ArticleAnalyticsValue } from "../components/website/analytics/types/articleAnalyticsValue";
import analyticsService from "../core/services/analytics.service";

export const reportDataState = atomFamily<
  ArticleAnalyticsValue[],
  {
    websiteId: string;
    daysAgo: string;
  }
>({
  key: "reportDataState",
  default: async (params) => {
    try {
      return await analyticsService.getReportByPages(
        params.websiteId,
        params.daysAgo
      );
    } catch {
      return [];
    }
  },
});
