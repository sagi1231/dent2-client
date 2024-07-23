import { WorkerRun } from "../entities/workerRun";
import { WorkerRunStatusType } from "../types/workerRunStatusType";
import { ServiceBase } from "./service.base";

class WorkerRunService extends ServiceBase {
  prefix = "/workerRun";
  getWorkerRuns(websiteId: string, status?: WorkerRunStatusType) {
    return this.post<WorkerRun[]>(`/website/${websiteId}`, {
      status,
    });
  }
}
const workerRunService = new WorkerRunService();
export default workerRunService;
