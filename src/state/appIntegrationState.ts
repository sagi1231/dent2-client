import { atomFamily } from "recoil";
import { AppIntegration } from "../core/entities/appIntegration";
import appIntegrationService from "../core/services/appIntegration.service";

export const appIntegrationState = atomFamily<AppIntegration[], string>({
  key: "appIntegrationState",
  default: (websiteId: string) =>
    appIntegrationService.getAppIntegrationsByWebsiteId(websiteId),
});
