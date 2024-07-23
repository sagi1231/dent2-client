import { atomFamily } from "recoil";
import { Worker } from "../core/entities/worker";
import workerService from "../core/services/worker.service";

export const workerState = atomFamily<Worker, string>({
  key: "workerState",
  default: (publishIntegrationId: string) =>
    workerService.getWorkerByPublishIntegrationId(publishIntegrationId),
});
