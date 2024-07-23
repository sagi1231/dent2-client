import { atomFamily } from "recoil";
import { DocumentEntity } from "neword-core";
import documentService from "../core/services/document.service";

export const documentState = atomFamily<DocumentEntity<any>, string>({
  key: `documentState`,
  default: (documentId: string) => documentService.getDocumentById(documentId),
});

export const documentsSummariesState = atomFamily<
  Omit<DocumentEntity<any>, "output" | "inputParams">[],
  string
>({
  key: `documentState`,
  default: (websiteId: string) =>
    documentService.getDocumentsByWebsiteId(websiteId),
});
