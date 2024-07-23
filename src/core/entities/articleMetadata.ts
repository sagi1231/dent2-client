import { KeyValueType } from "../../common/types/keyValueType";

export interface ArticleMetadata {
  metatags: KeyValueType<string>;
  readingTime: number;
}
