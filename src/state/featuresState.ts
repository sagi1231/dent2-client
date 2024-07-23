import { selector } from "recoil";
import { subscriptionService } from "../core/services/subscription.service";

export const featuresState = selector({
  key: "featuresState",
  get: () => subscriptionService.getAllowedFeatures(),
});
