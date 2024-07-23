import { User } from "../entities/user";
import { SignupRequestData } from "./requests/signup/signupRequestData";
import { ServiceBase } from "./service.base";

class CompanyService extends ServiceBase {
  prefix = "/company";

  signup(data: SignupRequestData) {
    return this.post<User>("/", data);
  }
}

const companyService = new CompanyService();
export default companyService;
