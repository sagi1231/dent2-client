import { Article } from "../entities/article";
import { ArticleBuilder } from "../entities/articleBuilder";
import { ArticleSummary } from "../entities/articleSummary";
import { WorkerRun } from "../entities/workerRun";
import { WorkerRunStatusType } from "../types/workerRunStatusType";
import { GetWorkerRunAndArticleResponse } from "./requests/getArticleByWorkerRun/getArticleByWorkerRunResponse";
import { UpdateArticlesAndWorkerRunsRequest } from "./requests/updateArticlesAndWorkerRuns/updateArticlesAndWorkerRunsResponse";
import { ServiceBase } from "./service.base";

class ArticleService extends ServiceBase {
  prefix = "/articles";
  getArticle(articleId: string) {
    return this.get<Article>(`/${articleId}`);
  }

  getArticleSummary(articleId: string) {
    return this.get<ArticleSummary>(`/summary/${articleId}`);
  }

  async getArticlesByPublishIntegrationId(website: string) {
    return await this.get<ArticleSummary[]>("/website/" + website);
  }
  async updateArticlesAndWorkerRunsByPublishIntegrationId(
    publishIntegrationId: string,
    status?: WorkerRunStatusType
  ) {
    return await this.post<UpdateArticlesAndWorkerRunsRequest>(
      `/${publishIntegrationId}/updateArticlesAndWorkerRuns`,
      { status }
    );
  }
  async getArticleBuilderByPublishIntegrationId(publishIntegrationId: string) {
    return await this.get<ArticleBuilder>(`/${publishIntegrationId}/builder`);
  }

  updateArticle(article: Partial<Article>, articleId: string) {
    return this.patch<Article>(`/${articleId}`, article);
  }

  deleteArticle(articleId: string) {
    return this.delete<void>(`/${articleId}`);
  }

  getArticleByWorkerRunId(workerRunId: string) {
    return this.get<GetWorkerRunAndArticleResponse>(
      `/workerRun/${workerRunId}`
    );
  }
}
const articleService = new ArticleService();
export default articleService;
