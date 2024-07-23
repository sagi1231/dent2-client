import { AppIntegrationApplicationType } from "../types/appIntegrationApplicationType";
import { AppIntegrationType } from "../types/appIntegrationType";
import { EntityBase } from "./entityBase";

export interface AppIntegration extends EntityBase {
  websiteId: string;
  recipients?: string[];
  subject?: String;
  appIntegrationType: AppIntegrationType;
  appIntegrationApplicationType: AppIntegrationApplicationType;
  isEnabled: Boolean;
}
