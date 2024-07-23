import { KeywordsAnalytics } from "./keywordsAnalytics";

export interface WebsiteDashboardData {
  publishedArticlesCount: number;
  totalViews: number;
  keywordsAnalytics: KeywordsAnalytics[];
}
