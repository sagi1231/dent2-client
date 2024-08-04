// src/components/contentCard/iconMappings.ts
import { ReactComponent as IgIcon } from "../../../../assets/Icons/InstagramIcon.svg";
import { ReactComponent as Facebook } from "../../../../assets/Icons/facebook/FacebookLogo.svg";
import { ReactComponent as Linkedin } from "../../../../assets/Icons/linkedin/LinkedInLogo.svg";
import { ReactComponent as Twitter } from "../../../../assets/Icons/XLogo.svg";
import { ReactComponent as Threads } from "../../../../assets/Icons/ThreadsLogo.svg";
import { ReactComponent as Email } from "../../../../assets/Icons/EmailLogo.svg";
import { ReactComponent as Sms } from "../../../../assets/Icons/SmsIcon.svg";
import { ContentCardType } from "./cardTypes";

// Map the types to their corresponding icon components
export const ContentCardIcons = {
  [ContentCardType.INSTAGRAM]: IgIcon,
  [ContentCardType.FACEBOOK]: Facebook,
  [ContentCardType.TWITTER]: Twitter,
  [ContentCardType.LINKEDIN]: Linkedin,
  [ContentCardType.THREADS]: Threads,
  [ContentCardType.EMAIL]: Email,
  [ContentCardType.SMS]: Sms,
} as const;
