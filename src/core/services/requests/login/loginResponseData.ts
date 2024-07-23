import { User } from "../../../entities/user";

export interface LoginResponseData {
  token: string;
  user: User;
}
