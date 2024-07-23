import { atomFamily } from "recoil";
import { Writer } from "../core/entities/writer";
import writerService from "../core/services/writer.service";

export const writerState = atomFamily<Writer, string>({
  key: "writerState",
  default: (websiteId: string) => writerService.getWriterByWebsiteId(websiteId),
});
