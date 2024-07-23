import { KeyValueType } from "../../common/types/keyValueType";
import { ArticleBuilderWidgetType } from "../types/articleBuilderWidgetType";

export interface ArticleBuilderWidget {
  id: string;
  displayName: string;
  index: number;
  type: ArticleBuilderWidgetType;
  configuration: KeyValueType<any>;
  articleBuilderId: string;
}
