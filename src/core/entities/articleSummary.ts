import { ArticleStatus } from "../types/articleStatus";
import { ArticleStatusType } from "../types/articleStatusType";
import { ArticleMetadata } from "./articleMetadata";
import { EntityBase } from "./entityBase";

export interface ArticleSummary extends EntityBase {
  sourceUrl: string;
  title: string;
  category: string;
  tags: string[];
  status: ArticleStatusType;
  imageSrc: string;
  companyId: string;
  createdAt: Date;
  metadata: ArticleMetadata;
  views: number;
  externalLink: string;
}
