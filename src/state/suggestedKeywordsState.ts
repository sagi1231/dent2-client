import { atomFamily } from "recoil";
import generatorService from "../core/services/generator.service";

export const suggestedKeywordsState = atomFamily<
  string[] | undefined,
  string | null
>({
  key: "suggestedKeywordsState",
  default: (workerId: string | null) => {
    if (workerId) {
      return generatorService.generateSuggestedKeywords(workerId);
    }
  },
});
