export default function extractDomainFromUrl(url: string): string {
  const domainRegex: RegExp =
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/;
  const match: RegExpMatchArray | null = url.match(domainRegex);
  return match?.[1] || "";
}
