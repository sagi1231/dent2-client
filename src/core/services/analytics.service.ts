import { ArticleAnalyticsValue } from "../../components/website/analytics/types/articleAnalyticsValue";
import { WebsiteDashboardData } from "../entities/websiteDashboardData";
import { ServiceBase } from "./service.base";

class AnalyticsService extends ServiceBase {
  prefix = "/analytics";

  getWebsiteDashboardData(publishIntegrationId: string) {
    return this.get<WebsiteDashboardData>(`/${publishIntegrationId}/dashboard`);
  }

  getReportByPages(websiteId: string, daysAgo: string) {
    return this.post<ArticleAnalyticsValue[]>(`/${websiteId}/report`, {
      daysAgo,
    });
  }
}

const analyticsService = new AnalyticsService();
export default analyticsService;
