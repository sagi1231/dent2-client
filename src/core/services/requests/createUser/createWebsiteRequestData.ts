import { Audience } from "../../../entities/audience";
import { Website } from "../../../entities/website";
import { Writer } from "../../../entities/writer";

export interface CreateWebsiteRequestData {
  website: Omit<Website, "companyId" | "id" | "domain">;
  writer: Omit<Writer, "websiteId" | "id" | "companyId">;
  audience: Omit<Audience, "websiteId" | "id" | "companyId">;
}
