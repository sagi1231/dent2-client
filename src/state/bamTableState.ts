import { atom } from "recoil";
import { User } from "../core/entities/user";
import bamService from "../core/services/bam.service";
import { MalshabBam } from "../core/entities/MalshabBam";

export const bamTableState = atom<MalshabBam[]>({
  key: "bamTableState",
  default: bamService.getTable(),
});
