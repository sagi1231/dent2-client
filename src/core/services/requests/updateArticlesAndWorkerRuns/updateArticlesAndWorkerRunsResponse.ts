import { ArticleSummary } from "../../../entities/articleSummary";
import { WorkerRun } from "../../../entities/workerRun";

export interface UpdateArticlesAndWorkerRunsRequest {
    articlesSummary: ArticleSummary[],
    workerRuns: WorkerRun[]
}