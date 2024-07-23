import { selector } from "recoil";
import { subscriptionService } from "../core/services/subscription.service";

export const packagesState = selector({
  key: "packagesState",
  get: () => subscriptionService.listSubscriptions(),
});
