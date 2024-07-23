import { Article } from "../entities/article";
import { PublishIntegration } from "../entities/publishIntegration";
import { CreateWebsiteRequestData } from "./requests/createWebsite/createWebsiteRequestData";
import { PublishArticleRequest } from "./requests/publish/publishArticleRequest";
import { ServiceBase } from "./service.base";

class PublisherService extends ServiceBase {
  prefix = "/publisher";

  async listPublishIntegrations() {
    return await this.get<PublishIntegration[]>();
  }

  async publishArticleById(data: PublishArticleRequest, websiteId: string) {
    return await this.post<Article>("/publish", {
      ...data,
      websiteId,
    });
  }

  updateArticleById(articleId: string, websiteId: string) {
    return this.patch("/update", {
      articleId,
      websiteId,
    });
  }

  createPublishIntegration(publishIntegration: Partial<PublishIntegration>) {
    return this.post<PublishIntegration>("/", publishIntegration);
  }

  async getPublishIntegrationByWebsiteId(websiteId: string) {
    return await this.get<PublishIntegration>(`/${websiteId}`);
  }

  async updatePublishIntegrationById(
    publishIntegrationId: string,
    data: Partial<PublishIntegration>
  ) {
    return await this.patch(`/${publishIntegrationId}`, data);
  }

  async deletePublishIntegrationById(publishIntegrationId: string) {
    return await this.delete<void>(`/${publishIntegrationId}`);
  }
}
export const publisherService = new PublisherService();
