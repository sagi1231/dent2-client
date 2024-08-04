import { User } from "../entities/user";
import { LoginRequestData } from "./requests/login/loginRequestData";
import { LoginResponseData } from "./requests/login/loginResponseData";
import { ResetPasswordRequestData } from "./requests/resetPassword/resetPasswordRequestData";
import { CompleteSignupRequestData } from "./requests/signup/completeSignupRequestData";
import { InviteUserRequestData } from "./requests/signup/inviteUserRequestData";
import { SignupRequestData } from "./requests/signup/signupRequestData";
import { ValidatePhoneCodeRequest } from "./requests/signup/validatePhoneCodeRequest";
import { UpdatePasswordRequestData } from "./requests/updatePassword/updatePasswordRequestData";
import { ServiceBase } from "./service.base";

class AuthService extends ServiceBase {
  prefix = "/auth";

  login(data: LoginRequestData) {
    return this.post<LoginResponseData>("/login", data);
  }
  me() {
    return this.get<User>("/me");
  }
}
const authService = new AuthService();
export default authService;
