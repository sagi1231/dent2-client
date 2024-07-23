import { ServiceBase } from "./service.base";

class UsageService extends ServiceBase {
  prefix = "/usage";

  getMonthlyUsage() {
    this.get("/monthly");
  }

  getUsage() {
    this.get("/");
  }
}

const usageService = new UsageService();
export default usageService;
