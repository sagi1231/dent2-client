import { Dictionary } from "lodash";
import InstagramCaptionBlock from "./blocks/InstagramCaptionBlock";
import FacebookPostCaptionBlock from "./blocks/FacebookPostCaptionBlock";
import { DocumentEntityType, DocumentTypeFactory } from "neword-core";
import InstegramCaptionForm from "./forms/InstegramCaptionForm";
import { BlockProps } from "./blocks/types/dictionaryProps";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { RefProps } from "./blocks/types/refProps";
import LinkedInCaptionBlock from "./blocks/LinkedinCaptionBlock";
import LinkedinCaptionForm from "./forms/FacebookCaptionForm";
import FacebookCaptionForm from "./forms/FacebookCaptionForm";
import InstagramReelIdeaBlock from "./blocks/InstagramReelIdeaBlock";
import InstagramStoryIdeaBlock from "./blocks/InstagramStoryIdeaBlock";
import InstagramPostIdeaBlock from "./blocks/InstagramPostIdeaBlock";
import LinkedinPostIdeaBlock from "./blocks/LinkedinPostIdeaBlock";
import FacebookPostIdeaBlock from "./blocks/FacebookPostIdeaBlock";
import ThreadsTwitBlock from "./blocks/ThreadsTwitBlock";
import EmailContentBlock from "./blocks/EmailContentBlock";
import SmsContentBlock from "./blocks/SmsContentBlock";

interface DocumentsDictionaryProps {
  block: ForwardRefExoticComponent<
    Omit<BlockProps, "ref"> & RefAttributes<RefProps>
  >;
  form: React.FC;
  columns?: number;
}
const documentsDictionary: Dictionary<DocumentsDictionaryProps> = {
  INSTAGRAM_CAPTION: {
    block: InstagramCaptionBlock,
    form: InstegramCaptionForm,
  },
  INSTAGRAM_REEL_IDEA: {
    block: InstagramReelIdeaBlock,
    form: FacebookCaptionForm,
  },
  INSTAGRAM_STORY_IDEA: {
    block: InstagramStoryIdeaBlock,
    form: FacebookCaptionForm,
  },
  INSTAGRAM_POST_IDEA: {
    block: InstagramPostIdeaBlock,
    form: FacebookCaptionForm,
  },
  LINKEDIN_POST_CAPTION: {
    block: LinkedInCaptionBlock,
    form: LinkedinCaptionForm,
  },
  LINKEDIN_POST_IDEA: {
    block: LinkedinPostIdeaBlock,
    form: FacebookCaptionForm,
  },
  FACEBOOK_POST_CAPTION: {
    block: FacebookPostCaptionBlock,
    form: FacebookCaptionForm,
  },
  FACEBOOK_POST_IDEA: {
    block: FacebookPostIdeaBlock,
    form: FacebookCaptionForm,
  },
  THREADS_TWIT: {
    block: ThreadsTwitBlock,
    form: FacebookCaptionForm,
    columns: 2,
  },
  EMAIL_CONTENT: {
    block: EmailContentBlock,
    form: FacebookCaptionForm,
    columns: 2,
  },
  SMS_CONTENT: {
    block: SmsContentBlock,
    form: FacebookCaptionForm,
  },
};

export default documentsDictionary;
