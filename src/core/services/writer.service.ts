import { Audience } from "../entities/audience";
import { Writer } from "../entities/writer";
import { ServiceBase } from "./service.base";

class WrtierService extends ServiceBase {
  prefix = "/writer";

  getWriterByWebsiteId(websiteId: string) {
    return this.get<Writer>(`/${websiteId}`);
  }

  updateWriter(writerId: string, data: Partial<Writer>) {
    return this.patch<Writer>(`/${writerId}`, data);
  }

  getAudiencesByWebsiteId(websiteId: string) {
    return this.get<Audience[]>(`/${websiteId}/audiences`);
  }
}
const writerService = new WrtierService();
export default writerService;
