import { atom } from "recoil";

export const workerRunIdState = atom<string | null>({
  key: "workerRunIdState",
  default: null,
});
