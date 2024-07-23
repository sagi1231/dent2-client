import { ArticleBuilderWidget } from "./articleBuilderWidget";

export interface ArticleBuilder {
  id: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
  articleBuilderWidget: ArticleBuilderWidget[];
}
