import { atomFamily } from "recoil";
import { publisherService } from "../core/services/publisher.service";
import { PublishIntegration } from "../core/entities/publishIntegration";

export const publishIntegrationState = atomFamily<
  PublishIntegration | undefined,
  string
>({
  key: "publishIntegration",
  default: (websiteId: string) =>
    publisherService.getPublishIntegrationByWebsiteId(websiteId),
});
