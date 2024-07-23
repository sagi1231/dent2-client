export interface ArticleAnalyticsValue {
  articleId: string;
  label: string;
  data: {
    screenPageViews: number;
    userEngagementDuration: number;
    eventCount: number;
  };
}
