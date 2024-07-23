import { atom, selector } from "recoil";
import { subscriptionService } from "../core/services/subscription.service";

const subscriptionDetailsSelector = selector({
  key: "subscriptionDetailsSelector",
  get: () => subscriptionService.getActiveSubscription(),
});

export const subscriptionDetailsState = atom({
  key: "subscriptionDetailsState",
  default: subscriptionDetailsSelector,
});
