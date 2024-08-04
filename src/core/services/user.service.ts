import { User } from "../entities/user";
import { CreateUserRequestData } from "./requests/createUser/createUserRequestData copy";
import { LoginRequestData } from "./requests/login/loginRequestData";
import { LoginResponseData } from "./requests/login/loginResponseData";
import { ResetPasswordRequestData } from "./requests/resetPassword/resetPasswordRequestData";
import { CompleteSignupRequestData } from "./requests/signup/completeSignupRequestData";
import { InviteUserRequestData } from "./requests/signup/inviteUserRequestData";
import { ValidatePhoneCodeRequest } from "./requests/signup/validatePhoneCodeRequest";
import { UpdatePasswordRequestData } from "./requests/updatePassword/updatePasswordRequestData";
import { ServiceBase } from "./service.base";

class UserService extends ServiceBase {
  prefix = "/user";
  async whoAmI() {
    return await this.get<User>("/me");
  }

  login(data: LoginRequestData) {
    return this.post<LoginResponseData>("/login", data);
  }
  createUser(data: CreateUserRequestData) {
    return this.post<User>("/createUser", data);
  }
  inviteUser(data: InviteUserRequestData) {
    return this.post<User>("/invite", data);
  }

  getUsers() {
    return this.get<User[]>("/users");
  }

  resetPassword(data: ResetPasswordRequestData) {
    return this.post<void>("/resetPassword", data);
  }

  updatePassword(data: UpdatePasswordRequestData) {
    return this.post("/updatePassword", data);
  }

  completeSignUp(data: CompleteSignupRequestData) {
    return this.post<void>("/completeSignup", data);
  }

  resendEmailVerificationCode() {
    return this.post<void>("resendVerificationCode");
  }

  verifyCode(data: ValidatePhoneCodeRequest) {
    return this.post<void>("/validatePhone", data);
  }

  updateUser(data: Partial<User>) {
    return this.patch<User>("/", data);
  }

  logout() {
    return this.post<void>("/logout");
  }

  // !!SUPPER ADMIN REQUESTS!!
  getAllUsers(query: string) {
    return this.get<User[]>(`/admin/users?query=${query}`);
  }

  silentLoginLink(userId: string) {
    return this.get<string>(`/admin/silentlogin/${userId}`);
  }
}
const userService = new UserService();
export default userService;
