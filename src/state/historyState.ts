import { atomFamily, selectorFamily } from "recoil";
import { WorkerRun } from "../core/entities/workerRun";
import workerRunService from "../core/services/workerRun.service";
import { WorkerRunStatusType } from "../core/types/workerRunStatusType";

export const historyStateSelector = selectorFamily<
  WorkerRun[] | undefined,
  {
    websiteId?: string;
    status?: WorkerRunStatusType;
  }
>({
  key: "historyStateSelector",
  get: (params) => () => {
    if (params.websiteId)
      return workerRunService.getWorkerRuns(params.websiteId, params.status);
  },
});

export const historyState = atomFamily<
  WorkerRun[] | undefined,
  {
    websiteId?: string;
    status?: WorkerRunStatusType;
  }
>({
  key: "historyStateSelector",
  default: async (params) => {
    if (params.websiteId)
      return workerRunService.getWorkerRuns(params.websiteId, params.status);
  },
});
