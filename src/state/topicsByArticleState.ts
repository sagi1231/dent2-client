import { atomFamily } from "recoil";
import generatorService from "../core/services/generator.service";
import { WriterTemplate } from "../core/types/writerTemplates";
import { GoalType } from "../core/types/goalType";
import { ToneType } from "../core/types/toneType";
import { Language } from "../core/types/language";

export const topicsByArticleState = atomFamily<
  string[],
  {
    keyword: string;
    template: WriterTemplate;
    goal: GoalType;
    tone: ToneType;
    language: Language;
  }
>({
  key: "topicsByArticleState",
  default: async (data) => {
    try {
      return await generatorService.generateTopics(data);
    } catch (err) {
      return [];
    }
  },
});
