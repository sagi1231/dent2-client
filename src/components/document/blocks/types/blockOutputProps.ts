import {
  DocumentEntity,
  DocumentEntityType,
  DocumentTypeFactory,
} from "neword-core";
import { z } from "zod";

export type BlockOutputProps<T extends DocumentEntityType> = z.infer<
  (typeof DocumentTypeFactory)[T]["output"]
>;
