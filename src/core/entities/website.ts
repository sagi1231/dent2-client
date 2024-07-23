import { EntityBase } from "./entityBase";
import { PublishIntegration } from "./publishIntegration";

export interface Website extends EntityBase {
  url: string;
  domain: string;
  companyId: string;
  name: string;
  description: string;
  category: string;
  logoSrc?: string;
  PublishIntegration?: PublishIntegration;
}
