import { Package } from "../entities/package";
import { PayproSubscriptionDetails } from "../entities/payproSubscriptionDetails";
import { Subscription } from "../entities/subscription";
import { AllowedFeatures, FeatureType } from "../types/featureType";
import { PackageType } from "../types/packageType";
import { UsageType } from "../types/usageType";
import { BuySubscriptionResponse } from "./requests/buySubscription/buySubscriptionResponse";
import { UsageResponseData } from "./requests/usage/usageResponseData";
import { ServiceBase } from "./service.base";

class SubscriptionService extends ServiceBase {
  prefix = "/subscription";

  listSubscriptions() {
    return this.get<Package[]>("/");
  }

  getActiveSubscription() {
    return this.get<PayproSubscriptionDetails | undefined>("/paypro");
  }

  getUsage(usageType: UsageType) {
    return this.get<UsageResponseData>(`/usage/${usageType}`);
  }

  cancelSubscription() {
    return this.post<void>("/cancel");
  }

  buySubscription(type: PackageType) {
    return this.post<BuySubscriptionResponse>(`/buy/${type}`);
  }

  getAllowedFeatures() {
    return this.get<AllowedFeatures>("/features");
  }
}

export const subscriptionService = new SubscriptionService();
