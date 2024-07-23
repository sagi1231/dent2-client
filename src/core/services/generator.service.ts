import Stream from "stream";
import { ServiceBase } from "./service.base";
import axios from "axios";
import { Language } from "../types/language";
import { TriggerWorkerRequestData } from "./requests/worker/triggerWorkerRequestData";

class GeneratorService extends ServiceBase {
  prefix = "/generator";

  generateSuggestedKeywords(workerId: string) {
    return this.get<string[]>(`/${workerId}/keywords`);
  }

  generateKeywordsByWebsiteUrl(description: string, language: Language) {
    return this.get<string[]>(
      `/keywords?description=${description}&language=${language}`
    );
  }

  generateTopics(
    data: Omit<
      TriggerWorkerRequestData,
      "title" | "publishAsDraft" | "disablePublish"
    >
  ) {
    return this.post<string[]>("/topics", data);
  }

  async regenerateArticleWidget(content: string, articleId: string) {
    //const stream = await this.post<Stream>(`/regenerate`, {}, true);
    const res = await this.fetch(`/regenerate/${articleId}`, {
      method: "POST",
      body: JSON.stringify({
        content,
      }),
    });

    const decoder = new TextDecoder();
    const reader = res?.body?.getReader() as any;

    while (true) {
      const { value, done } = await reader.read();
      const decodedChunk = decoder.decode(value, { stream: true });

      const event = new CustomEvent("stream", {
        detail: decodedChunk,
      });

      document.dispatchEvent(event);

      if (done) {
        const event = new CustomEvent("end-stream");
        document.dispatchEvent(event);
        break;
      }
    }
  }
}
const generatorService = new GeneratorService();
export default generatorService;
