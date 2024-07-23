import { atomFamily } from "recoil";
import { WebsiteDashboardData } from "../core/entities/websiteDashboardData";
import analyticsService from "../core/services/analytics.service";

export const websiteDashboardDataState = atomFamily<
  WebsiteDashboardData,
  string
>({
  key: "websiteDashboardDataState",
  default: (publishIntegrationId: string) =>
    analyticsService.getWebsiteDashboardData(publishIntegrationId),
});
