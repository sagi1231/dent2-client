import { atom } from "recoil";

export const articleSavingTateState = atom<boolean>({
  key: "articleSavingTateState",
  default: false,
});
