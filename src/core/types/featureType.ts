export enum FeatureType {
  MANUAL_ARTICLE_GENERATION,
  PUBLISH_ARTICLE_TO_CMS,
  EDIT_KEYWORDS,
  VIEW_ANALYTICS,
  WRITER_SCHEDULER,
}

export type AllowedFeatures = {
  [key in FeatureType]: boolean;
};
