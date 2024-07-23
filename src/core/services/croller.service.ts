import { ServiceBase } from "./service.base";
import { Language } from "../types/language";
import { ScanWebsiteResponse } from "./requests/createWebsite/scanWebsiteResponse";

class CrollerService extends ServiceBase {
  prefix = "/croller";

  getLanguageByWebsiteUrl(websiteUrl: string) {
    return this.post<Language>(`/language`, { websiteUrl });
  }

  scanWebsite(websiteUrl: string) {
    return this.get<ScanWebsiteResponse>(`/scan?websiteUrl=${websiteUrl}`);
  }
}
const crollerService = new CrollerService();
export default crollerService;
