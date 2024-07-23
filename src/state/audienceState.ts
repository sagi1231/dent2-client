import { atomFamily } from "recoil";
import { Audience } from "../core/entities/audience";
import writerService from "../core/services/writer.service";

export const audienceState = atomFamily<Audience[], string>({
  key: "audienceState",
  default: (websiteId: string) =>
    writerService.getAudiencesByWebsiteId(websiteId),
});
