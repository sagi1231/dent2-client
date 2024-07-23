import { ServiceBase } from "./service.base";
import { DocumentEntity, DocumentEntityType } from "neword-core";

class DocumentService extends ServiceBase {
  prefix = "/document";

  getDocumentById<T extends DocumentEntityType>(documentId: string) {
    return this.get<DocumentEntity<T>>(`/${documentId}`);
  }

  getDocumentsByWebsiteId<T extends DocumentEntityType>(websiteId: string) {
    return this.get<DocumentEntity<T>[]>(`/website/${websiteId}`);
  }

  createDocument(docType: DocumentEntityType, websiteId: string) {
    return this.post<string>(`/`, { docType, websiteId });
  }

  updateDocument<T extends DocumentEntityType>(document: DocumentEntity<T>) {
    return this.post<DocumentEntity<T>>(`/update/${document.id}`, document);
  }

  generateDocument<T extends DocumentEntityType>(
    documentId: string,
    params: DocumentEntity<T>["inputParams"]
  ) {
    return this.post<DocumentEntity<T>>(`/generate/${documentId}`, params);
  }
}
const documentService = new DocumentService();
export default documentService;
