export interface SignupRequestData {
  email: string;
  password: string;
  signedForNewsletter: boolean;
  firstName: string;
  lastName: string;
  captchaToken: string;
}
