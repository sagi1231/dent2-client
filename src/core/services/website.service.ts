import { Website } from "../entities/website";
import { CreateWebsiteRequestData } from "./requests/createWebsite/createWebsiteRequestData";
import { ServiceBase } from "./service.base";

class WebsiteService extends ServiceBase {
  prefix = "/website";

  listWebsites() {
    return this.get<Website[]>("/");
  }

  getWebsiteById(websiteId: string) {
    return this.get<Website>(`/${websiteId}`);
  }

  createWebsiteWithWorker(data: CreateWebsiteRequestData) {
    return this.post<Website>("/", data);
  }

  deleteWebsiteById(websiteId: string) {
    return this.delete(`/${websiteId}`);
  }

  updateWebsiteById(websiteId: string, data: Partial<Website>) {
    return this.patch<Website>(`/${websiteId}`, data);
  }

  uploadAttachment(websiteId: string, fileName: string, fileBuffer: string) {
    return this.post<string>("/attachment", {
      fileName,
      fileBuffer,
      websiteId,
    });
  }

  getAttachments(websiteId?: string) {
    return this.post<string[]>(`/getattachment`, {
      websiteId,
    });
  }
}

export const websiteService = new WebsiteService();
