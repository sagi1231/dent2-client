import { atomFamily } from "recoil";
import generatorService from "../core/services/generator.service";
import { Language } from "../core/types/language";

export const generateKeywordsByWebsiteState = atomFamily<
  string[] | undefined,
  { websiteDescription: string; language: Language } | null
>({
  key: "suggestedKeywordsState",
  default: async (data) => {
    if (data?.websiteDescription) {
      try {
        return await generatorService.generateKeywordsByWebsiteUrl(
          data.websiteDescription,
          data.language
        );
      } catch (err) {
        return [];
      }
    }
  },
});
