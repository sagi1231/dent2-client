import { GoalType } from "../types/goalType";
import { Language } from "../types/language";
import { ToneType } from "../types/toneType";
import { WriterTemplate } from "../types/writerTemplates";
import { EntityBase } from "./entityBase";

export interface Writer extends EntityBase {
  goal: GoalType;
  tone: ToneType;
  language: Language;
  templates: WriterTemplate[];
  blacklinks: string[];
  promotionLinks: string[];
  companyId: string;
  websiteId: string;
}
