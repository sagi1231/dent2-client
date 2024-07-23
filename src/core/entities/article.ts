import { ArticleStatusType } from "../types/articleStatusType";
import { ArticleMetadata } from "./articleMetadata";

export interface Article {
  id: string;
  sourceUrl: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  status: ArticleStatusType;
  imageSrc: string;
  metadata: ArticleMetadata;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  websiteId: string;
  externalLink: string;
}
