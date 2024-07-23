import { Worker } from "../entities/worker";
import { TriggerWorkerRequestData } from "./requests/worker/triggerWorkerRequestData";
import { ServiceBase } from "./service.base";

class WorkerService extends ServiceBase {
  prefix = "/worker";
  triggerWorker(workerId: string, data: TriggerWorkerRequestData) {
    return this.post<{
      workerRunId: string;
    }>(`/${workerId}/trigger`, data);
  }

  updateWorker(workerId: string, data: Partial<Worker>) {
    return this.patch<Worker>(`/${workerId}`, data);
  }

  getWorkerByPublishIntegrationId(websiteId: string) {
    return this.get<Worker>("/website/" + websiteId);
  }
}
const workerService = new WorkerService();
export default workerService;
