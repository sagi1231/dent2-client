import { atomFamily } from "recoil";
import { websiteService } from "../core/services/website.service";

export const attachmentsState = atomFamily<string[], string>({
  key: `attachmentsState`,
  default: (websiteId: string) => websiteService.getAttachments(websiteId),
});
