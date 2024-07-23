import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { Article } from "../core/entities/article";
import articleService from "../core/services/article.service";
import { ArticleSummary } from "../core/entities/articleSummary";
import { ArticlesSummarySelector } from "./articlesState";

export const articleState = atomFamily<Article | undefined, string | null>({
  key: "articleState",
  default: (articleId: string | null) => {
    if (articleId) {
      return articleService.getArticle(articleId);
    }
  },
});

export const articleSummaryState = atomFamily<ArticleSummary, string>({
  key: "articleSummaryState",
  default: (articleId: string) => {
    return articleService.getArticleSummary(articleId);
  },
});
