import { Subscription } from "../../../entities/subscription";

export interface BuySubscriptionResponse {
  redirectUrl?: string;
  isDone: boolean;
  subscription?: Subscription;
}
