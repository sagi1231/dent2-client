import { DocumentEntityType } from "neword-core";
import InstagramCaptionImg from "../../../assets/images/contentCardsImages/instagram_caption_card_img.png";
import InstagramBio from "../../../assets/images/contentCardsImages/Frame 209-1.png";
import StoryIdea from "../../../assets/images/contentCardsImages/Frame 209-2.png";
import ReelIdea from "../../../assets/images/contentCardsImages/Frame 209-3.png";
import FacebookCaption from "../../../assets/images/contentCardsImages/Frame 209-4.png";
import FacebookPosts from "../../../assets/images/contentCardsImages/Frame 209-5.png";
import FacebookBio from "../../../assets/images/contentCardsImages/Frame 209-6.png";
import LinkedinPost from "../../../assets/images/contentCardsImages/Frame 209-7.png";
import LinkedinPostIdeas from "../../../assets/images/contentCardsImages/Frame 209-8.png";
import LinkedinBio from "../../../assets/images/contentCardsImages/Frame 209-10.png";
import Email from "../../../assets/images/contentCardsImages/Frame 209-11.png";
import Threads from "../../../assets/images/contentCardsImages/Frame 209-20.png";
import SMS from "../../../assets/images/contentCardsImages/Frame 209-30.png";
import Twitter from "../../../assets/images/contentCardsImages/Frame 209-40.png";

const DocBoxes = [
  {
    type: DocumentEntityType.INSTAGRAM_CAPTION,
    title: "תיאור לפוסט באינסטגרם",
    image: InstagramCaptionImg,
    description: "צור כיתובים קליטים לפוסטים שלך באינסטגרם.",
  },
  {
    type: DocumentEntityType.EMAIL_CONTENT,
    title: "תוכן למייל",
    image: Email,
    description: "צור תוכן מרתק ואפקטיבי למיילים שלך.",
  },
  {
    type: DocumentEntityType.FACEBOOK_PAGE_ABOUT,
    title: "אודות עמוד פייסבוק",
    image: FacebookBio,
    description: "צור תיאור אודות לעמוד הפייסבוק שלך.",
  },
  {
    type: DocumentEntityType.FACEBOOK_POST_CAPTION,
    title: "כיתוב לפוסט בפייסבוק",
    image: FacebookCaption,
    description: "צור כיתובים קליטים לפוסטים שלך בפייסבוק.",
  },
  {
    type: DocumentEntityType.FACEBOOK_POST_IDEA,
    title: "רעיון לפוסט בפייסבוק",
    image: FacebookPosts,
    description: "קבל רעיונות יצירתיים לפוסטים שלך בפייסבוק.",
  },
  {
    type: DocumentEntityType.GOOGLE_ADS_IDEA,
    title: "רעיון למודעות גוגל",
    image: InstagramCaptionImg,
    description: "קבל רעיונות לפרסום במודעות גוגל.",
  },
  {
    type: DocumentEntityType.GOOGLE_ADS_KEYWORDS,
    title: "מילות מפתח למודעות גוגל",
    image: InstagramCaptionImg,
    description: "מצא מילות מפתח אפקטיביות למודעות גוגל שלך.",
  },
  {
    type: DocumentEntityType.INSTAGRAM_BIO_DESCRIPTION,
    title: "תיאור לביוגרפיה באינסטגרם",
    image: InstagramBio,
    description: "צור תיאור ביוגרפי מעניין לפרופיל האינסטגרם שלך.",
  },
  {
    type: DocumentEntityType.INSTAGRAM_POST_IDEA,
    title: "רעיון לפוסט באינסטגרם",
    image: InstagramCaptionImg,
    description: "קבל רעיונות יצירתיים לפוסטים שלך באינסטגרם.",
  },
  {
    type: DocumentEntityType.INSTAGRAM_REEL_IDEA,
    title: "רעיון לריל באינסטגרם",
    image: ReelIdea,
    description: "מצא רעיונות לריל יצירתי ומרתק באינסטגרם.",
  },
  {
    type: DocumentEntityType.INSTAGRAM_STORY_IDEA,
    title: "רעיון לסטורי באינסטגרם",
    image: StoryIdea,
    description: "קבל רעיונות לסטוריז מרתקים באינסטגרם.",
  },
  {
    type: DocumentEntityType.LINKEDIN_PAGE_ABOUT,
    title: "אודות עמוד לינקדאין",
    image: LinkedinBio,
    description: "צור תיאור אודות לעמוד הלינקדאין שלך.",
  },
  {
    type: DocumentEntityType.LINKEDIN_POST_CAPTION,
    title: "כיתוב לפוסט בלינקדאין",
    image: LinkedinPost,
    description: "צור כיתובים קליטים לפוסטים שלך בלינקדאין.",
  },
  {
    type: DocumentEntityType.LINKEDIN_POST_IDEA,
    title: "רעיון לפוסט בלינקדאין",
    image: LinkedinPostIdeas,
    description: "קבל רעיונות יצירתיים לפוסטים שלך בלינקדאין.",
  },
  {
    type: DocumentEntityType.PHONE_CALL_SCRIPT,
    title: "תסריט לשיחת טלפון",
    image: InstagramCaptionImg,
    description: "כתוב תסריט לשיחות טלפון מקצועיות.",
  },
  {
    type: DocumentEntityType.SMS_CONTENT,
    title: "תוכן לסמס שיווקי",
    image: SMS,
    description: "צור סמס שיווקי קליט ומותאם לקהל היעד שלך.",
  },
  {
    type: DocumentEntityType.SMS_IDEA,
    title: "רעיון לסמס שיווקי",
    image: InstagramCaptionImg,
    description: "מצא רעיונות לסמסים שיווקיים.",
  },
  {
    type: DocumentEntityType.THREADS_TWIT,
    title: "תיאור לפוסט בת'רדס",
    image: Threads,
    description: "צור כיתובים קליטים לפוסטים שלך בת'רדס.",
  },
  {
    type: DocumentEntityType.WEBSITE_ABOUT,
    title: "אודות לאתר",
    image: InstagramCaptionImg,
    description: "צור דף אודות מרתק לאתר שלך.",
  },
  {
    type: DocumentEntityType.WEBSITE_FAQ,
    title: "שאלות נפוצות לאתר",
    image: InstagramCaptionImg,
    description: "כתוב דף שאלות ותשובות אפקטיבי לאתר שלך.",
  },
  {
    type: DocumentEntityType.WEBSITE_PRODUCT_DESCRIPTION,
    title: "תיאור מוצר לאתר",
    image: InstagramCaptionImg,
    description: "צור תיאורי מוצרים אטרקטיביים לאתר שלך.",
  },
  {
    type: DocumentEntityType.WEBSITE_TESTEMONIAL,
    title: "המלצה לאתר",
    image: InstagramCaptionImg,
    description: "כתוב המלצות משכנעות לאתר שלך.",
  },
  {
    type: DocumentEntityType.TWITTER_TWIT,
    title: "תיאור לפוסט בטוויטר",
    image: Twitter,
    description: "צור כיתובים קליטים לפוסטים שלך בטוויטר.",
  },
];

export default DocBoxes;
