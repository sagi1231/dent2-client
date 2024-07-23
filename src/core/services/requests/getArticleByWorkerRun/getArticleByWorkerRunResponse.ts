import { ArticleSummary } from "../../../entities/articleSummary";
import { WorkerRun } from "../../../entities/workerRun";

export interface GetWorkerRunAndArticleResponse {
  workerRun: WorkerRun;
  articleSummary?: ArticleSummary;
}
