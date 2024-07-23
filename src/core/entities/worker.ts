import { EntityBase } from "./entityBase";

export interface Worker extends EntityBase {
  name: string;
  keywords: string[];
  companyId: string;
  isDisabled: boolean;
  cronExpression: string;
  nextRun: Date;
  userValidationBeforePublish: boolean;
  shouldUseDefaultArticleBuilder?: boolean;
  websiteId: string;
}
