import { atomFamily } from "recoil";
import { ArticleBuilder } from "../core/entities/articleBuilder";
import articleService from "../core/services/article.service";

export const articleBuilderState = atomFamily<ArticleBuilder | null, string>({
  key: "articleBuilderState",
  default: (publishIntegrationId: string) =>
    articleService.getArticleBuilderByPublishIntegrationId(
      publishIntegrationId
    ),
});
