import { GoalType } from "../../../types/goalType";
import { Language } from "../../../types/language";
import { ToneType } from "../../../types/toneType";
import { WriterTemplate } from "../../../types/writerTemplates";

export interface TriggerWorkerRequestData {
  keyword: string;
  template: WriterTemplate;
  goal: GoalType;
  tone: ToneType;
  language: Language;
  disablePublish: boolean;
  publishAsDraft: boolean;
  title: string;
}
