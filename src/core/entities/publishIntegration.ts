import { IntegrationAuthType } from "../types/integrationAuthType";
import { IntegrationType } from "../types/integrationType";
import { EntityBase } from "./entityBase";

export interface PublishIntegration extends EntityBase {
  type: IntegrationType;
  authType: IntegrationAuthType;
  websiteUrl: string;
  websiteId: string;
  username?: string;
  password?: string;
  token?: string;
  externalId?: string;
  publishAsDraft: boolean;
  disablePublish: boolean;
  apiUrl?: string;
}
