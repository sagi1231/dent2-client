import { AppIntegration } from "../entities/appIntegration";
import { ServiceBase } from "./service.base";

class AppIntegrationService extends ServiceBase {
  prefix = "/app-integration";

  getAppIntegrationsByWebsiteId(websiteId: string) {
    return this.get<AppIntegration[]>(`/${websiteId}`);
  }

  updateAppIntegrationByWebsiteId(id: string, data: Partial<AppIntegration>) {
    return this.patch<AppIntegration>(`/${id}`, data);
  }
}

const appIntegrationService = new AppIntegrationService();
export default appIntegrationService;
