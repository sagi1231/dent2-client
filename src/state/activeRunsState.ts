import { atom } from "recoil";

export const activeRunsState = atom<string[]>({
  key: "activeRunsState",
  default: [],
});
