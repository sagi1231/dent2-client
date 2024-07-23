import { JsxElement } from "typescript";
import { IntegrationType } from "../../../core/types/integrationType";
import { ReactElement } from "react";

export interface CmsIntegrationType {
  name: string;
  type: IntegrationType;
  logo: ReactElement;
  buttonText?: string;
}
