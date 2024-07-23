import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { websiteService } from "../core/services/website.service";
import { Website } from "../core/entities/website";

const websiteSelector = selector<Website[]>({
  key: "websiteSelector",
  get: () => websiteService.listWebsites(),
});

export const websitesStateSelector = atom<Website[]>({
  key: "websitesStateSelector",
  default: websiteSelector,
});

export const websiteState = atomFamily<Website | undefined, string | null>({
  key: "websiteState",
  default: selectorFamily({
    key: "websiteStateSelector",
    get:
      (websiteId: string | null) =>
      async ({ get }) => {
        if (websiteId) {
          const websites = get(websitesStateSelector);
          return (
            (websites.find((website) => website.id === websiteId) as Website) ||
            websiteService.getWebsiteById(websiteId)
          );
        }
      },
  }),
});
