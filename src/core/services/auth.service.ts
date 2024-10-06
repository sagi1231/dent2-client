import { User } from "../entities/user";
import { LoginRequestData } from "./requests/login/loginRequestData";

import { ServiceBase } from "./service.base";

class AuthService extends ServiceBase {
  prefix = "/auth";

  login(data: LoginRequestData) {
    return this.post<any>("/login", data);
  }
  logout() {
    return this.post<void>("/logout");
  }
  async me() {
    console.log(await this.get<User>("/me"));

    return this.get<User>("/me");
  }
}
const authService = new AuthService();
export default authService;
