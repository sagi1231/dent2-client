import { ReactElement } from "react";
import { atom } from "recoil";

export const announcementState = atom<string | undefined | ReactElement>({
  default: undefined,
  key: "announcementState",
});
