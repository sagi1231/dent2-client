import { EntityBase } from "./entityBase";
import { Subscription } from "./subscription";

export interface Company extends EntityBase {
  name: string;
  websiteUrl: string;
  description: string;
  Subscription: Subscription;
}
