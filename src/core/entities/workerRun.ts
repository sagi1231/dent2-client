import { WorkerRunStatusType } from "../types/workerRunStatusType";
import { EntityBase } from "./entityBase";

export interface WorkerRun extends EntityBase {
  generatedArticles: number;
  publishedArticles: number;
  status: WorkerRunStatusType;
  failureDescription: string;
  companyId: string;
  workerId: string;
}
