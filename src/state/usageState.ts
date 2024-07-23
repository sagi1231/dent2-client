import { atom, atomFamily, selector } from "recoil";
import { subscriptionService } from "../core/services/subscription.service";
import { UsageType } from "../core/types/usageType";
import { UsageResponseData } from "../core/services/requests/usage/usageResponseData";

const usageSelector = selector({
  key: "usageSelector",
  get: () => subscriptionService.getUsage(UsageType.LIFETIME),
});

export const usageState = atomFamily<UsageResponseData, UsageType>({
  key: "usageState",
  default: (usageType: UsageType) => {
    return subscriptionService.getUsage(usageType);
  },
});
