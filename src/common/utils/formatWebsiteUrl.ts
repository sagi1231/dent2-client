import { formatUserName } from "./formatUserName";

export const formatWebsiteUrl = (url: string) =>
  formatUserName(url.replace("https://", ""));
