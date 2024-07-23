import { atomFamily, selectorFamily } from "recoil";
import { ArticleSummary } from "../core/entities/articleSummary";
import articleService from "../core/services/article.service";

export const articlesAtom = atomFamily<ArticleSummary[] | undefined, string>({
  key: "articlesAtom",
  default: async (websiteId: string) => {
    if (websiteId) {
      return await articleService.getArticlesByPublishIntegrationId(websiteId);
    }
  },
});

export const ArticlesSummarySelector = selectorFamily<
  ArticleSummary[] | undefined,
  string
>({
  key: "articlesSummarySelector",
  get: (websiteId: string) => () => {
    if (websiteId) {
      return articleService.getArticlesByPublishIntegrationId(websiteId);
    }
  },
});
