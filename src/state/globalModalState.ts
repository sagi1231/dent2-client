import { atom } from "recoil";

export const globalModalState = atom<null | string>({
  key: "globalModalState",
  default: null,
});
